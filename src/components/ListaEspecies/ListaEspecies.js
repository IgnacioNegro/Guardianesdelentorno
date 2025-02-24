import React from 'react';
import './ListaEspecies.css';
import Especie from '../Especie/Especie';

const ListaEspecies = ({arrayEspecies, arrayAreasNaturales}) => {    
    //console.log("Lista Especies: ", arrayAreasNaturales)

    return (
        <div className='areas-especies-container container mb-5' id='listado-especies'>
            <h1 className='text-center mt-5'>Lista Especies</h1>
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