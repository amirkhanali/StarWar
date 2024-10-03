import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

interface Vehicles {
   [key:string] : string;
}


interface VehiclesResponse {
   results: Vehicles[];
   next: string | null;
   previous: string | null;
}

const fetchVehicles = async (page: number): Promise<VehiclesResponse> => {
   const {data} = await axios.get(`https://swapi.dev/api/vehicles/?page=${page}`)
   return data
} 


const Vehicles: React.FC = () => {

   const [page, setPage] = useState<number>(1);

   const {data , isLoading, isError, error} = useQuery<VehiclesResponse> ({
      queryKey: ['vehicles', page],
      queryFn: () => fetchVehicles(page),
      placeholderData: keepPreviousData,
   })

   if (isLoading) return <div className="">Loading...</div>

   if(isError) return <div className="">{error.message}</div>

   const prevPage = () => {
      if (data?.previous && page > 1) {
          setPage(prev => prev - 1);
      }
   }
 
   const nextPage = () => {
      if (data?.next) {
          setPage(prev => prev + 1);
      }
   }



    return (
         <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3">
               {data?.results.map((vehicle:Vehicles) => (
                  <div key={vehicle.name} className="m-4 p-2 space-y-1 text-black rounded-md font-serif bg-slate-400">
                     <h1 className="text-xl">{vehicle.name}</h1>
                     <h2>Model : {vehicle.model}</h2>
                     <h2>Manufacturer : {vehicle.manufacturer}</h2>
                     <h2>Cost In Credits : {vehicle.cost_in_credits}</h2>
                     <h2>Length : {vehicle.length}</h2>
                     <h2>Max Atmosphering Speed : {vehicle.max_atmosphering_speed}</h2>
                     <h2>Crew : {vehicle.crew}</h2>
                     <h2>Passengers : {vehicle.passengers}</h2>
                     <h2>Cargo Capacity : {vehicle.cargo_capacity}</h2>
                     <h2>Consumables : {vehicle.consumables}</h2>
                     <h2>Vehicle Class : {vehicle.vehicle_class}</h2>
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
 
export default Vehicles;