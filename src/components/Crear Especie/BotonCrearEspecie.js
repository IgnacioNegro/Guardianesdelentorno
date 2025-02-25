import React, { useState } from 'react';
import CrearEspecieModal from './CrearEspecieModal.js';

const BotonCrearEspecie = (arrayAreasNaturales) => {
    const [mostrarModal, setMostrarModal] = useState(false);
    console.log("Boton Crear Especie")

    return (
        <>
            <button className="btn btn-primary" onClick={() => setMostrarModal(true)}>
                Crear Especie
            </button>
            {mostrarModal && (
                <CrearEspecieModal closeModal={() => setMostrarModal(false)}
                arrayAreasNaturales={arrayAreasNaturales} /* area={{}} */ />
            )}            
        </>
    );
};

export default BotonCrearEspecie;

