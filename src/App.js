
import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar'
import { useSelector } from "react-redux";
import ListaAreas from './components/ListaAreasNaturales/ListaAreas';
import ListaEspecies from './components/ListaEspecies/ListaEspecies';

function App() {
  const user = useSelector((state) => state.user);
  //console.log(user)

  // Centralizamos los Fetch aca para solucionar el tema de que Especie necesita recibir tambien Are

  const [arrayAreasNaturales, setArrayAreasNaturales] = useState([]);
  const [arrayEspecies, setArrayEspecies] = useState([]);

  useEffect(() => {

    const cargarAreas = async () => {

      const response = await fetch('https://mammal-excited-tarpon.ngrok-free.app/api/natural-area/list?secret=TallerReact2025!&Keyword=&AreaType=&Region=&ConservationStatus=&Page=1&PageSize=10',
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        }
      );

      const data = await response.json();
      //console.log(data.items[0]);
      setArrayAreasNaturales(data.items);
    }

    const cargarEspecies = async () => {

      const response = await fetch('https://mammal-excited-tarpon.ngrok-free.app/api/species/list?page=1&pageSize=50',
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        }
      );

      const data = await response.json();      
      setArrayEspecies(data.items);
    };

    cargarAreas();
    cargarEspecies();

  }, []);


  return (
    <>
      <Navbar />
      <ListaAreas arrayAreasNaturales={arrayAreasNaturales}/>
      <ListaEspecies arrayEspecies={arrayEspecies} arrayAreasNaturales={arrayAreasNaturales}/>
    </>

  );
}

export default App;

