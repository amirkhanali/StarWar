import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

interface People {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
}

interface PeopleResponse {
    next: string | null;
    previous: string | null;
    results: People[];
}


const fetchPeople = async (page:number): Promise<PeopleResponse> =>  {
    const {data} = await axios.get(`https://swapi.dev/api/people/?page=${page}`)
    return data;

}

const People: React.FC = () => {

    const [page,setPage] = useState<number>(1)

    const {data,isError,isLoading,error} = useQuery<PeopleResponse>({
        queryKey: ["people", page],
        queryFn: () => fetchPeople(page),
        placeholderData: keepPreviousData        
    })

    if (isError) return <div className="">{error.message}</div>

    if (isLoading) return <div className="">Loading...</div>

    const nextPage = () => {
        if (data?.next) {
            setPage((prev) => prev + 1)
        }
    }

    const prevPage = () => {
        if (data?.previous && page > 1) {
            setPage((prev) => prev - 1)
        }
    }


    return ( 
    <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3">
            {data?.results.map((people: People) => (
                <div key={people.name} className="m-4 text-black rounded-md font-serif bg-slate-400">
                    <div className="m-4 p-1">                    
                        <h1 className="text-xl">{people.name}</h1>
                        <h2>Height : {people.height}</h2>
                        <h2>Birth : {people.birth_year}</h2>
                        <h2>Gender : {people.gender}</h2>
                        <h2>Mass : {people.mass}</h2>
                        <h2>Hair Color : {people.hair_color}</h2>
                        <h2>Skin Color : {people.skin_color}</h2>
                        <h2>Eye Color : {people.eye_color}</h2>                   
                    </div>

                </div>
            
            ))}           
        </div>
        <div className="flex justify-between text-black  m-4 mb-12">
            <button className="bg-amber-300 rounded p-2 disabled:bg-gray-400 disabled:cursor-not-allowed" disabled={!data?.previous} onClick={prevPage}>Previous</button>
            <button className="bg-amber-300 rounded p-2 disabled:bg-gray-400 disabled:cursor-not-allowed" disabled={!data?.next} onClick={nextPage}>Next</button>
        </div>
    </div>
    );
}
 
export default People;