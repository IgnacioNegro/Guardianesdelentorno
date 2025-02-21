import { useState } from "react";
import './especie.css';

const EspecieModal = ({ closeModal, especie }) => {
    console.log(closeModal);
    return (
        <>
            <div className='register-container'>
                <div className='form-register'>
                    <button className='modal-close' onClick={closeModal}>✖</button>

                    <div className="form-group">
                        <img src={especie.imageUrl} alt="Imagen de la especie" style={{ maxWidth: "100%" }} />
                    </div>
                    <div className="form-group">
                        <p>Nombre: {especie.name}</p>
                        <p>Familia: {especie.family}</p>
                        <p>Descripción: {especie.description}</p>
                        <p>Hábitat: {especie.habitat}</p>
                    </div>
                    <div className="form-group">
                        <p>Estado de conservación: {especie.conservationStatus}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EspecieModal;