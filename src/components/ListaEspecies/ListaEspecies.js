import React, { useState } from 'react';
import './ListaEspecies.css';
import Especie from '../Especie/Especie';
import BotonCrearEspecie from '../Crear Especie/BotonCrearEspecie';
import { useSelector } from 'react-redux';

const ListaEspecies = ({arrayEspecies, arrayAreasNaturales}) => {    
    const user = useSelector((state) => state.user);
    console.log( "lista especie: ", Array.isArray(arrayAreasNaturales));

        const [BarraDeBusqueda, setBarraDeBusqueda] = useState("");
        
    const especiesFiltradas = arrayEspecies.filter(especie =>
        especie.commonName?.toLowerCase().includes(BarraDeBusqueda.toLowerCase()) || 
        especie.scientificName?.toLowerCase().includes(BarraDeBusqueda.toLowerCase()) || 
        especie.category?.toLowerCase().includes(BarraDeBusqueda.toLowerCase()) || 
        especie.conservationStatus?.toLowerCase().includes(BarraDeBusqueda.toLowerCase())  ||
        especie.conservationStatus?.toLowerCase().includes(BarraDeBusqueda.toLowerCase())  
    );
    return (
        <div className='areas-especies-container container mb-5' id='listado-especies'>
            <h1 className='text-center mt-5'>Lista Especies</h1>
            {user ? <BotonCrearEspecie arrayAreasNaturales={arrayAreasNaturales}  /> : <></>}

            <input
                type="text"
                placeholder="Buscar especie"
                className="form-control my-3"
                value={BarraDeBusqueda}
                onChange={(e) => setBarraDeBusqueda(e.target.value)}
            />

        {especiesFiltradas.length > 0 ? (
                especiesFiltradas.map(area => {
                    let especiesAvistadas = arrayEspecies.filter(especie => especie.naturalAreaId === area.id);
                    return <Especie key={Especie.id} especie={Especie} especiesAvistadas={especiesAvistadas} />;
                })
            ) : (
                <p className="text-center">No se encontraron áreas que coincidan con la búsqueda.</p>
            )}
        
            {  
   
                
                arrayEspecies.map(especie => {
                    const areaEncontrada = arrayAreasNaturales.find(area => area.id == especie.naturalAreaId)
                    //console.log("Lista Especies: area encontrada ", areaEncontrada)

                    return (
                        <Especie key={especie.id} especie={especie} area={areaEncontrada}/>
                    )
                })               
            }
        </div>
    )
}

export default ListaEspecies;