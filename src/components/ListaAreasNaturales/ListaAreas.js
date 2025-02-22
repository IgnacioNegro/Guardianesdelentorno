import React from 'react';
import './ListaAreas.css';
import AreaNatural from '../AreaNatural/AreaNatural';
import BotonCrearArea from '../Crear Area/Boton Crear Area.js';
import { useSelector } from 'react-redux';

const ListaAreas = ({arrayAreasNaturales}) => {    
    const user = useSelector((state) => state.user);

    return (
        <div className='areas-especies-container container mb-5'>
            <h1 className='text-center mt-5'>Lista Areas Naturales</h1>
            {user ? <BotonCrearArea /> : <></>}
            
            {                
                arrayAreasNaturales.map(area => <AreaNatural key={area.id} area={area}/>)
            }
        </div>
    )
}

export default ListaAreas;