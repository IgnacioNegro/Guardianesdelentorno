import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { useSelector } from "react-redux";
import ListaAreas from './components/ListaAreasNaturales/ListaAreas';
import ListaEspecies from './components/ListaEspecies/ListaEspecies';
import ListaActividades from './components/ListaActividades/ListaActividades';

function App() {
  
  const user = useSelector((state) => state.user);

  const [arrayAreasNaturales, setArrayAreasNaturales] = useState([]);
  const [arrayEspecies, setArrayEspecies] = useState([]);
  const [arrayActividades, setArrayActividades] = useState([]);

  const eliminarArea = async (id) => {
    const response = await fetch(`https://mammal-excited-tarpon.ngrok-free.app/api/natural-area/delete?secret=TallerReact2025!&id=${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      setArrayAreasNaturales(areasViejas => areasViejas.filter(area => area.id !== id));
    } else {
      console.error("Error al eliminar el área");
    }
  };

  const eliminarEspecie = async (id) => {
    const response = await fetch(`https://mammal-excited-tarpon.ngrok-free.app/api/species/delete?secret=TallerReact2025!&id=${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      setArrayEspecies(especiesViejas => especiesViejas.filter(especie => especie.id !== id));
    } else {
      console.error("Error al eliminar la especie");
    }
  };

  const eliminarActividad = async (id) => {
    const response = await fetch(`https://mammal-excited-tarpon.ngrok-free.app/api/conservation-activity/delete?secret=TallerReact2025!&id=${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      setArrayActividades(actividadesViejas => actividadesViejas.filter(actividad => actividad.id !== id));
    } else {
      console.error("Error al eliminar la actividad");
    }
  };

  // Función para modificar el área natural
  const modificarArea = async (id, updatedArea) => {
    const response = await fetch(`https://mammal-excited-tarpon.ngrok-free.app/api/natural-area/update?secret=TallerReact2025!`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: user.id,
        naturalArea: updatedArea,
      }),
    });

    if (response.ok) {
      setArrayAreasNaturales(areasViejas => areasViejas.map(area => (area.id === id ? updatedArea : area)));
    } else {
      console.error("Error al modificar el área");
    }
  };

  // Función para modificar la especie
  const modificarEspecie = async (id, updatedEspecie) => {
    const response = await fetch(`https://mammal-excited-tarpon.ngrok-free.app/api/species/update?secret=TallerReact2025!`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: user.id,
        species: updatedEspecie,
      }),
    });

    if (response.ok) {
      setArrayEspecies(especiesViejas => especiesViejas.map(especie => (especie.id === id ? updatedEspecie : especie)));
    } else {
      console.error("Error al modificar la especie");
    }
  };

  // Función para modificar la actividad
  const modificarActividad = async (id, updatedActividad) => {
    const response = await fetch(`https://mammal-excited-tarpon.ngrok-free.app/api/conservation-activity/update?secret=TallerReact2025!`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        conservationActivity: updatedActividad,
      }),
    });

    if (response.ok) {
      setArrayActividades(actividadesViejas => actividadesViejas.map(actividad => (actividad.id === id ? updatedActividad : actividad)));
    } else {
      console.error("Error al modificar la actividad");
    }
  };

  useEffect(() => {
    const cargarAreas = async () => {
      const response = await fetch(
        'https://mammal-excited-tarpon.ngrok-free.app/api/natural-area/list?secret=TallerReact2025!&Keyword=&AreaType=&Region=&ConservationStatus=&Page=1&PageSize=1000',
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      const data = await response.json();
      setArrayAreasNaturales(data.items);
    };

    const cargarEspecies = async () => {
      const response = await fetch(
        'https://mammal-excited-tarpon.ngrok-free.app/api/species/list?page=1&pageSize=50',
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

    const cargarActividades = async () => {
      if (!user || !user.id) return; 

      const response = await fetch(
        `https://mammal-excited-tarpon.ngrok-free.app/api/conservation-activity/byUser?secret=TallerReact2025!&userId=${user.id}&page=1&pageSize=10`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        }
      );

      const data = await response.json();
      setArrayActividades(data.items || []); // Evita errores si `items` es undefined
    };

    cargarActividades();
    cargarAreas();
    cargarEspecies();
  }, [user?.id]); // Se ejecuta cuando cambia el usuario

  return (
    <>
      <Navbar />
      <ListaAreas 
        arrayAreasNaturales={arrayAreasNaturales} 
        arrayEspecies={arrayEspecies} 
        eliminarArea={eliminarArea} 
        modificarArea={modificarArea} // Pasamos la función para modificar
      />
      <ListaEspecies 
        arrayEspecies={arrayEspecies} 
        arrayAreasNaturales={arrayAreasNaturales} 
        eliminarEspecie={eliminarEspecie} 
        modificarEspecie={modificarEspecie} // Pasamos la función para modificar
      />
      <ListaActividades 
        arrayActividades={arrayActividades} 
        arrayAreasNaturales={arrayAreasNaturales} 
        eliminarActividad={eliminarActividad} 
        modificarActividad={modificarActividad} // Pasamos la función para modificar
      />
    </>
  );
}

export default App;
