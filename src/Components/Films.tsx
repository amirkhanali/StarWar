import {keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";



interface Film {
    title: string;
    episode_id: number;
    opening_crawl: string;
    director: string;
    producer: string;
    release_date: string;
}

interface FilmsResponse {
    results: Film[];

}

const fetchFilms = async (): Promise<FilmsResponse> => {
    const {data} = await axios.get("https://swapi.dev/api/films/");
    return data;

}

const Films: React.FC = () => {
    
    const {data,error,isError, isLoading } = useQuery<FilmsResponse>({
        queryKey: ['films'],
        queryFn: fetchFilms,
        placeholderData: keepPreviousData    
    })





    if (isLoading) return <div>Loading...</div>;
     
    if (isError) return <div>Error: {error.message}</div>;

    return(
        <div className="p-4 ">
            <ul className="p-4 m-4">
                {data?.results.map((film: Film) => (
                    <div key={film.episode_id} className="flex flex-col items-center space-y-2">
                        <h1 className="text-4xl font-mono text-green-300 m-2 p-3">{film.title}</h1>
                        
                        <div className="flex flex-col justify-between text-red-400 font-serif">
                            <h1 className="">Producer: {film.producer}</h1>
                            <h1>Director: {film.director}</h1>
                            <h1>Release Data: {film.release_date}</h1>                                
                        </div>
                        <p className="font-thin text-cyan-200">{film.opening_crawl}</p>
                            
                        
                    </div>
                
                ))}
            </ul>

        </div>
    )
     



}
 
export default Films;