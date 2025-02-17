import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import './ListaAreas.css';
import AreaNatural from '../AreaNatural/AreaNatural';


const ListaAreas = () => {
    const [arrayAreasNaturales, setArrayAreasNaturales] = useState([]);

    useEffect(() => {
        const cargarAreas = async () => {
            console.log("entra al cargar areas funcion");

            const response = await fetch('https://mammal-excited-tarpon.ngrok-free.app/api/natural-area/list?secret=TallerReact2025!&Keyword=&AreaType=&Region=&ConservationStatus=&Page=1&PageSize=10');
            console.log('Response objecto:', response); 

            const data = await response.json();
            console.log(data);    
            
            setArrayAreasNaturales(data.items); 
        };

        // Llamamos a la función dentro del useEffect,
        // para que se ejecute SOLO una vez al montar el componente
        cargarAreas();
    }, []); // Dependencia vacía => se ejecuta al montar

     /* const cargarAreas = async () => {
        console.log("entra al cargar areas funcion")
        const response = await fetch('https://mammal-excited-tarpon.ngrok-free.app/api/natural-area/list?userId=123&page=1&pageSize=10');
        console.log(response);
        const data = await response.json();
        setArrayAreasNaturales(data.items);
        
    }

    cargarAreas(); */
    //console.log(arrayAreasNaturales); 

    return (
        <div className='areas-naturales-container'>
            <h1>Lista Areas Naturales</h1>
            {
                arrayAreasNaturales.map(area => <AreaNatural id={area.id} nombre={area.name} tipo={area.areaType} region={area.location} estado={area.conservationStatus}/>)
            }
        </div>
    )
}

export default ListaAreas;