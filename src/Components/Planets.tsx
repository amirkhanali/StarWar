import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

interface Planet {
    name: string;
    rotation_period: string;
    orbital_period: string;
    diameter: string;
    climate: string;
    gravity: string;
    terrain: string;
    surface_water: string;
    population: string;
}

interface PlanetsResponse {
    results: Planet[];
    next: string | null;
    previous: string | null;
}

const fetchPlanets = async (page: number): Promise<PlanetsResponse> => {
    const { data } = await axios.get(`https://swapi.dev/api/planets/?page=${page}`);
    return data;
}

const Planets: React.FC = () => {

    const [page, setPage] = useState<number>(1);

    const { data, isError, isLoading, error } = useQuery<PlanetsResponse>({
        queryKey: ['planets', page],
        queryFn: () => fetchPlanets(page),
        placeholderData:keepPreviousData
    });

    if (isError) {
        return <div className="">{error instanceof Error ? error.message : "An error occurred"}</div>;
    }
    if (isLoading) {
        return <div className="">Loading... </div>;
    }

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
                {data?.results.map((planet: Planet) =>
                    <div key={planet.name} className="m-4 text-black rounded-md font-serif bg-slate-400">
                        <div className="m-4 p-1">
                            <h1 className="text-xl">{planet.name}</h1>
                            <h2>Rotation Period: {planet.rotation_period}</h2>
                            <h2>Orbital Period: {planet.orbital_period}</h2>
                            <h2>Diameter: {planet.diameter}</h2>
                            <h2>Climate: {planet.climate}</h2>
                            <h2>Gravity: {planet.gravity}</h2>
                            <h2>Terrain: {planet.terrain}</h2>
                            <h2>Surface Water: {planet.surface_water}</h2>
                            <h2>Population: {planet.population}</h2>
                        </div>
                    </div>
                )}
            </div>
            <div className="flex justify-between text-black m-4 mb-12">
                <button
                    className="bg-amber-300 rounded p-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    disabled={!data?.previous}
                    onClick={prevPage}
                >
                    Previous
                </button>
                <button
                    className="bg-amber-300 rounded p-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    disabled={!data?.next}
                    onClick={nextPage}
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default Planets;