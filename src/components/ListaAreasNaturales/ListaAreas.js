import React from 'react';
import './ListaAreas.css';
import AreaNatural from '../AreaNatural/AreaNatural';


const ListaAreas = ({arrayAreasNaturales}) => {    

    return (
        <div className='areas-especies-container container mb-5'>
            <h1 className='text-center mt-5'>Lista Areas Naturales</h1>
            {                
                arrayAreasNaturales.map(area => <AreaNatural key={area.id} area={area}/>)
            }
        </div>
    )
}

export default ListaAreas;