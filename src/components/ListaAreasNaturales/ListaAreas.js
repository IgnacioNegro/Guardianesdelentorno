import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import './ListaAreas.css';
import AreaNatural from '../AreaNatural/AreaNatural';


const ListaAreas = () => {
    const [arrayAreasNaturales, setArrayAreasNaturales] = useState([]);

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
            //console.log(data.items[0].imageUrl);         
            setArrayAreasNaturales(data.items); 
        };

        // Llamamos a la función dentro del useEffect,
        // para que se ejecute SOLO una vez al montar el componente
        cargarAreas();
    }, []); // Dependencia vacía => se ejecuta al montar, luego usaremos dependencia para que cargue cada vez que se agregue un item a la bd

    return (
        <div className='areas-especies-container container'>
            <h1 className='text-center mt-5'>Lista Areas Naturales</h1>
            {                
                arrayAreasNaturales.map(area => <AreaNatural key={area.id} area={area}/>)
            }
        </div>
    )
}

export default ListaAreas;