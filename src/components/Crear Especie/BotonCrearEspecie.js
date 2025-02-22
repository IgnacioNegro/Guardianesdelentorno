import React from 'react';
import CrearEspecieModal from './CrearEspecieModal';

const BotonCrearEspecie = ({ onClick }) => {
    return (
        <button class="btn btn-primary" onClick={CrearEspecieModal}>
            Crear Especie
        </button>
    );
};


export default BotonCrearEspecie;