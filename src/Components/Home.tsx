import { NavLink, Outlet, } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';



const Home = () => {

    const [open, setOpen] = useState<boolean>(false);

    const toggleButton = () => {
        setOpen(!open);
    }
    

    return ( 
        <div className="relative min-h-screen">
            <header className="hidden h-auto pl-4 pt-8 sm:flex">
                <nav className="space-x-2 font-bold  ">
                    <NavLink className="bg-amber-800 rounded-md p-2 hover:bg-orange-950" to="/">Home</NavLink>
                    <NavLink className="bg-amber-800 rounded-md p-2 hover:bg-orange-950" to="/films">Films</NavLink>
                    <NavLink className="bg-amber-800 rounded-md p-2 hover:bg-orange-950" to="/people">People</NavLink>
                    <NavLink className="bg-amber-800 rounded-md p-2 hover:bg-orange-950" to="/planets">Planets</NavLink>
                    <NavLink className="bg-amber-800 rounded-md p-2 hover:bg-orange-950" to="/species">Species</NavLink>
                    <NavLink className="bg-amber-800 rounded-md p-2 hover:bg-orange-950" to="/starships">Starships</NavLink>
                    <NavLink className="bg-amber-800 rounded-md p-2 hover:bg-orange-950" to="/vehicles">Vehicles</NavLink>
                </nav>
            </header>
            <div className="absolute top-0 left-0 m-4 sm:hidden">
                <button onClick={toggleButton}>
                    <FontAwesomeIcon icon={open ? faTimes : faBars} />
                </button>
            </div>
            {open && 
                <div className="fixed bg-black h-full p-4 top-0 left-0 w-1/2 sm:hidden">
                    <FontAwesomeIcon icon={faTimes} className="cursor-pointer" onClick={toggleButton}/>
                    <nav className="flex flex-col space-y-2 font-bold w-20 text-center">
                        <NavLink className="bg-amber-800 rounded-md p-2 hover:bg-orange-950" to="/">Home</NavLink>
                        <NavLink className="bg-amber-800 rounded-md p-2 hover:bg-orange-950" to="/films">Films</NavLink>
                        <NavLink className="bg-amber-800 rounded-md p-2 hover:bg-orange-950" to="/people">People</NavLink>
                        <NavLink className="bg-amber-800 rounded-md p-2 hover:bg-orange-950" to="/planets">Planets</NavLink>
                        <NavLink className="bg-amber-800 rounded-md p-2 hover:bg-orange-950" to="/species">Species</NavLink>
                        <NavLink className="bg-amber-800 rounded-md p-2 hover:bg-orange-950" to="/starships">Starships</NavLink>
                        <NavLink className="bg-amber-800 rounded-md p-2 hover:bg-orange-950" to="/vehicles">Vehicles</NavLink>
                    </nav>                   
                </div>
            }

            <p className=" text-2xl font-mono flex items-center pt-12 text-amber-300 justify-center">Welcome to Star Wars Explorer!</p>
            <div className="">
                <Outlet/>
            </div>
        </div>
     );
}
 
export default Home;