import React from 'react';
import './ListaEspecies.css';
import Especie from '../Especie/Especie';

const ListaEspecies = ({arrayEspecies, arrayAreasNaturales}) => {    

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