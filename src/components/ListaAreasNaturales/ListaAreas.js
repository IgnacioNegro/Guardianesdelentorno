import React, { useState } from 'react';
import './ListaAreas.css';
import AreaNatural from '../AreaNatural/AreaNatural';
import BotonCrearArea from '../Crear Area/Boton Crear Area.js';
import { useSelector } from 'react-redux';


const ListaAreas = ({arrayAreasNaturales, arrayEspecies}) => {    
    const user = useSelector((state) => state.user);
    //console.log("especiesAvistadas en lista areas: ", arrayEspecies);

    const [BarraDeBusqueda, setBarraDeBusqueda] = useState("");

    const areasFiltradas = arrayAreasNaturales.filter(area =>
        area.name?.toLowerCase().includes(BarraDeBusqueda.toLowerCase()) || 
        area.type?.toLowerCase().includes(BarraDeBusqueda.toLowerCase()) || 
        area.region?.toLowerCase().includes(BarraDeBusqueda.toLowerCase()) || 
        area.conservationStatus?.toLowerCase().includes(BarraDeBusqueda.toLowerCase())  
    );
    return (
        <div className='areas-especies-container container mb-5' id='listado-areas-naturales'>
            <h1 className='text-center mt-5'>Lista Areas Naturales</h1>
            {user ? <BotonCrearArea /> : <></>}

            <input
                type="text"
                placeholder="Buscar área"
                className="form-control my-3"
                value={BarraDeBusqueda}
                onChange={(e) => setBarraDeBusqueda(e.target.value)}
            />

        {areasFiltradas.length > 0 ? (
                areasFiltradas.map(area => {
                    let especiesAvistadas = arrayEspecies.filter(especie => especie.naturalAreaId === area.id);
                    return <AreaNatural key={area.id} area={area} especiesAvistadas={especiesAvistadas} />;
                })
            ) : (
                <p className="text-center">No se encontraron áreas que coincidan con la búsqueda.</p>
            )}
        
            {                
                arrayAreasNaturales.map(area => {
                    let especiesAvistadas = [] // por cada area dentro del array va a buscar todas las especies avistadas asociadas a esa area, y devuelve un array con la/s especie/s o un array vacio.
                    

                    arrayEspecies.forEach(especie => {
                        if(especie.naturalAreaId == area.id) {
                            especiesAvistadas.push(especie)
                        }
                        
                    });
                    //console.log("especiesAvistadas en lista areas: ", especiesAvistadas)
                    return (<AreaNatural key={area.id} area={area} especiesAvistadas={especiesAvistadas}/>)
                

                })
                    
            }
        </div>
    )
}

export default ListaAreas;