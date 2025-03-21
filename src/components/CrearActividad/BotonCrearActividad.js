import React, { useState } from 'react';
import CrearActividadModal from './CrearActividadModal.js';

const BotonCrearActividad = ({ arrayAreasNaturales }) => {
    const [mostrarModal, setMostrarModal] = useState(false);
    

    return (
        <>
            <button className="btn btn-primary" onClick={() => setMostrarModal(true)}>
                Crear Actividad
            </button>
            {mostrarModal && (
                <CrearActividadModal 
                    closeModal={() => setMostrarModal(false)} 
                    arrayAreasNaturales={arrayAreasNaturales}  // Aquí se pasa como prop
                />
            )}
        </>
    );
};

export default BotonCrearActividad;
