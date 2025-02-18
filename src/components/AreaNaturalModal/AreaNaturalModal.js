import { useState } from "react";
import './AreaNaturalModal.css';

const AreaNaturalModal = ({closeModal}) => {    
    console.log(closeModal);
    return (
        <>
        <div className='register-container'>
            <div className='form-register'>
                <button className='modal-close' onClick={closeModal}>✖</button>  
                                 
                <div className="form-group">
                    <img></img>
                    
                </div>
                <div className="form-group">
                    <p>Nombre:</p>
                    <p>Tipo:</p>
                    <p>Region:</p>
                    <p>Estado</p>
                    <p>Descripcion</p>
                    <p>Ubicacion - mapa</p>
                </div>
                <div className="form-group">
                    
                </div>
                <div className="form-group">
                    
                </div>
                
            </div>
        </div>
        </>
        
    )
}

export default AreaNaturalModal;