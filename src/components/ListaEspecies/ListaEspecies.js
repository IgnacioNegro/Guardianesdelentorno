import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import './ListaEspecies.css';
import Especie from '../Especie/Especie';


const ListaEspecies = () => {
    const [arrayEspecies, setArrayEspecies] = useState([]);

    useEffect(() => {
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
            console.log("Especes")
            console.log(data.items[0]);         
            setArrayEspecies(data.items); 
        };

        // Llamamos a la función dentro del useEffect,
        // para que se ejecute SOLO una vez al montar el componente
        cargarEspecies();
    }, []); // Dependencia vacía => se ejecuta al montar, luego usaremos dependencia para que cargue cada vez que se agregue un item a la bd

    return (
        <div className='areas-especies-container container mb-5'>
            <h1 className='text-center mt-5'>Lista Especies</h1>
            {                
                arrayEspecies.map(especie => <Especie key={especie.id} especie={especie}/>)
            }
        </div>
    )
}

export default ListaEspecies;