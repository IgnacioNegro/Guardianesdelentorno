import { useState } from "react";
import './AreaNaturalModal.css';

const AreaNaturalModal = ({closeModal, area}) => {    
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
                    <p>Nombre: {area.name}</p>
                    <p>Region: {area.region}</p>
                    <p>Descripcion: {area.description}:</p>
                    <img src={area.imageUrl} alt="Imagen del área" style={{ maxWidth: "100%" }} />
                    <p>Ubicacion mapa interactivo:</p>
                    
                    
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