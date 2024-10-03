import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider,  } from "react-router-dom";
import Home from "./Components/Home";
import People from "./Components/People";
import Films from "./Components/Films";
import Planets from "./Components/Planets";
import Species from "./Components/Species";
import Starships from "./Components/Starships";
import Vehicles from "./Components/Vehicles";




const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Home/>}>
      <Route path="films" element={<Films/>}/>
      <Route path="people" element={<People/>}/>
      <Route path="planets" element={<Planets/>}/>
      <Route path="species" element={<Species/>}/>
      <Route path="starships" element={<Starships/>}/>
      <Route path="vehicles" element={<Vehicles/>}/>
    </Route>

))

function App() {
  

  return (
    <div className="text-white">
      
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
