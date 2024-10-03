import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";


interface Starship {
    [key:string] : string;
}

interface StarshipsResponse {
    results: Starship[];
    next: string | null;
    previous: string | null;
}


const fetchStarships = async (page:number): Promise<StarshipsResponse> => {
    const {data} = await axios.get(`https://swapi.dev/api/starships/?page=${page}`);
    return data;
}


const Starships: React.FC = () => {

    const [page,setPage] = useState<number>(1);

    const {data, isError, isLoading, error} = useQuery<StarshipsResponse>({
        queryKey: ['starships', page],
        queryFn: () => fetchStarships(page),
        placeholderData: keepPreviousData
        

    })



    if(isError) return <div className="">{error.message}</div>
    if (isLoading) return <div className="">Loading...</div>

    const nextPage = () => {
        if (data?.next) {
            setPage(prev => prev + 1)
        }
    }

    const prevPage = () => {
        if (data?.previous && page > 1) {
            setPage(prev => prev - 1 )
        }
    } 

    const naValue = (value: string) => value === "n/a" ? "unknown" : value;



    return ( 
    <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3">
            {data?.results.map((starship: Starship) => (
                <div key={starship.name} className="m-4 p-2 space-y-1 text-black rounded-md font-serif bg-slate-400">
                    <h1 className="text-xl">{starship.name}</h1>
                    <h2>Model : {naValue(starship.model)}</h2>
                    <h2>Manufacturer : {naValue(starship.manufacturer)}</h2>
                    <h2>Cost In Credits : {naValue(starship.cost_in_credits)}</h2>
                    <h2>Length : {naValue(starship.length)}</h2>
                    <h2>Max Atmosphering Speed : {naValue(starship.max_atmosphering_speed)}</h2>
                    <h2>Crew : {naValue(starship.crew)}</h2>
                    <h2>Passengers : {naValue(starship.passengers)}</h2>
                    <h2>Cargo Capacity : {naValue(starship.cargo_capacity)}</h2>
                    <h2>Consumables : {naValue(starship.consumables)}</h2>
                    <h2>Hyperdrive Rating : {naValue(starship.hyperdrive_rating)}</h2>
                    <h2>MGLT : {naValue(starship.MGLT)}</h2>
                    <h2>Starship Class : {naValue(starship.starship_class)}</h2>
                </div>
            ))}
        </div>
        <div className="flex justify-between text-black  m-4 mb-12 ">
            <button className="bg-amber-300 rounded p-2 disabled:bg-gray-400 disabled:cursor-not-allowed" disabled={!data?.previous} onClick={prevPage}>Previous</button>
            <button className="bg-amber-300 rounded p-2 disabled:bg-gray-400 disabled:cursor-not-allowed" disabled={!data?.next} onClick={nextPage}>Next</button>
        </div>
        
    </div>
     );
}
 
export default Starships;