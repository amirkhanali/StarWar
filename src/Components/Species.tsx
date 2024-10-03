import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

interface Species {
    [key: string]: string;
}

interface SpeciesResponse {
    results: Species[];
    next: string | null;
    previous: string | null;
}

const fetchSpecies = async (page:number): Promise<SpeciesResponse> => {
    const {data } = await axios.get(`https://swapi.dev/api/species/?page=${page}`);
    return data;
   

}

const Species: React.FC = () => {

    const [page,setPage] = useState<number>(1);

    const {data, isError,isLoading, error} = useQuery<SpeciesResponse>({
        queryKey: ["species", page],
        queryFn: () => fetchSpecies(page),
        placeholderData: keepPreviousData
    })

    if (isError) return <div className="">{error.message}</div>
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
            {data?.results.map((specie:Species) => 
                <div key={specie.name} className="m-4 text-black rounded-md font-serif bg-slate-400">
                    <div className="m-4 p-1">
                        <h1 className="text-xl">{naValue(specie.name)}</h1>
                        <h2>Classification : {naValue(specie.classification)}</h2>
                        <h2>Designation : {naValue(specie.designation)}</h2>
                        <h2>Average Height : {naValue(specie.average_height)}</h2>
                        <h2>Skin Colors : {naValue(specie.skin_colors)}</h2>
                        <h2>Hair Colors : {naValue(specie.hair_colors)}</h2>
                        <h2>Eye Colors : {naValue(specie.eye_colors)}</h2>
                        <h2>Average Lifespan : {naValue(specie.average_lifespan)}</h2>
                        <h2>Language : {naValue(specie.language)}</h2>
                    </div>
            
                </div>
            )}
            
        </div>
        <div className="flex justify-between text-black  m-4 mb-12 ">
            <button className="bg-amber-300 rounded p-2 disabled:bg-gray-400 disabled:cursor-not-allowed" disabled={!data?.previous} onClick={prevPage}>Previous</button>
            <button className="bg-amber-300 rounded p-2 disabled:bg-gray-400 disabled:cursor-not-allowed" disabled={!data?.next} onClick={nextPage}>Next</button>
        </div>
    </div>
);
}
 
export default Species;