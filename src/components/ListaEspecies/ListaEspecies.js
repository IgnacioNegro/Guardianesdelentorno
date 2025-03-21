import React, { useState, useEffect } from 'react';
import './ListaEspecies.css';
import Especie from '../Especie/Especie';
import BotonCrearEspecie from '../Crear Especie/BotonCrearEspecie';
import { useSelector } from 'react-redux';

const ListaEspecies = ({ arrayEspecies, arrayAreasNaturales, eliminarYActualizar, modificarEspecie }) => {
    const user = useSelector((state) => state.user);
    const [BarraDeBusqueda, setBarraDeBusqueda] = useState("");
    const [especiesFiltradas, setEspeciesFiltradas] = useState(arrayEspecies);
    const especiesFiltradasPorBusqueda = especiesFiltradas.filter(especie =>
        especie.commonName?.toLowerCase().includes(BarraDeBusqueda.toLowerCase()) ||
        especie.scientificName?.toLowerCase().includes(BarraDeBusqueda.toLowerCase()) ||
        especie.category?.toLowerCase().includes(BarraDeBusqueda.toLowerCase()) ||
        especie.conservationStatus?.toLowerCase().includes(BarraDeBusqueda.toLowerCase())
    );

    useEffect(() => {
        setEspeciesFiltradas(arrayEspecies); // Se asegura que la lista se actualice al cambiar `arrayEspecies`
    }, [arrayEspecies]);

    return (
        <div className='areas-especies-container container mb-5' id='listado-especies'>
            <h1 className='text-center mt-5'>Lista Especies</h1>
            {user ? <BotonCrearEspecie arrayAreasNaturales={arrayAreasNaturales} /> : <></>}

            <input
                type="text"
                placeholder="Buscar especie"
                className="form-control my-3"
                value={BarraDeBusqueda}
                onChange={(e) => setBarraDeBusqueda(e.target.value)}
            />

            {especiesFiltradasPorBusqueda.length > 0 ? (
                especiesFiltradasPorBusqueda.map(especie => {
                    const areaEncontrada = arrayAreasNaturales.find(area => area.id === especie.naturalAreaId);
                    return (
                        <Especie
                            key={especie.id}
                            especie={especie}
                            area={areaEncontrada}
                            eliminarEspecie={eliminarYActualizar} // Usa la prop directamente
                            modificarEspecie={modificarEspecie} // Asegúrate de pasar la función correcta
                        />
                    );
                })
            ) : (
                <p className="text-center">No se encontraron especies que coincidan con la búsqueda.</p>
            )}
        </div>
    );
}

export default ListaEspecies;
