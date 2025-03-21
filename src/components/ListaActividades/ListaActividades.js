import React, { useState, useEffect } from 'react';
import './ListaActividades.css';
import Actividad from '../Actividad/Actividad';
import BotonCrearActividad from '../CrearActividad/BotonCrearActividad';
import { useSelector } from 'react-redux';

const ListaActividades = ({ arrayActividades, arrayAreasNaturales,modificarActividad }) => {
    const user = useSelector((state) => state.user);

    const [barraDeBusqueda, setBarraDeBusqueda] = useState("");
    const [actividadesFiltradas, setActividadesFiltradas] = useState(arrayActividades);

    useEffect(() => {
        // Filter para buscador
        setActividadesFiltradas(arrayActividades.filter(actividad =>
            actividad.description?.toLowerCase().includes(barraDeBusqueda.toLowerCase()) ||
            actividad.date?.includes(barraDeBusqueda) ||
            actividad.naturalAreaName?.toLowerCase().includes(barraDeBusqueda.toLowerCase())
        ));
    }, [barraDeBusqueda, arrayActividades]);

    // Función para eliminar la actividad
    const eliminarActividad = async (actividadId) => {
        const response = await fetch(`https://mammal-excited-tarpon.ngrok-free.app/api/conservation-activity/delete?secret=TallerReact2025!&id=${actividadId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            // Filtrar la actividad eliminada de la lista
            const actividadesActualizadas = actividadesFiltradas.filter(actividad => actividad.id !== actividadId);
            setActividadesFiltradas(actividadesActualizadas);
        } else {
            console.error("Error al eliminar la actividad");
        }
    };

    return (
        <div className='areas-actividades-container container mb-5' id='listado-actividades'>
            <h1 className='text-center mt-5'>Lista de Actividades</h1>

            {user ? <BotonCrearActividad arrayAreasNaturales={arrayAreasNaturales} /> : null}

            <input
                type="text"
                placeholder="Buscar actividad"
                className="form-control my-3"
                value={barraDeBusqueda}
                onChange={(e) => setBarraDeBusqueda(e.target.value)}
            />

            {actividadesFiltradas.length > 0 ? (
                actividadesFiltradas.map(actividad => {
                    // Encuentra el área natural de la actividad
                    const areaEncontrada = arrayAreasNaturales.find(area => area.id === actividad.naturalAreaId);

                    return (
                        <Actividad
                            key={actividad.id}
                            actividad={actividad}
                            area={areaEncontrada}
                            eliminarActividad={eliminarActividad}
                            modificarActividad={modificarActividad} // Pasamos la función de eliminación
                        />
                    );
                })
            ) : (
                <p className="text-center">No se encontraron actividades que coincidan con la búsqueda.</p>
            )}
        </div>
    );
};

export default ListaActividades;
