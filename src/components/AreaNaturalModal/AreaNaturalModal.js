import { useState } from "react";
import './AreaNaturalModal.css';

const AreaNaturalModal = ({ closeModal, area, especiesAvistadas }) => {
    
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
                        <p>Descripcion: {area.description}</p>
                        <img src={area.imageUrl} alt="Imagen del área" style={{ maxWidth: "100%" }} />
                        
                        { 
                            especiesAvistadas.length > 0 
                            ? (
                                <>
                                    <h5 className="mt-2">Especies Avistadas en la zona</h5>
                                    <ul>                                    
                                        {
                                            especiesAvistadas.map((especie, index) =>(
                                                <li key={index} className="mb-1"> 
                                                    <p className="mb-1">{especie.commonName}</p>
                                                </li>
                                                
                                            ))
                                        }                                     
                                    </ul>
                                </>
                                
                            ) : <p className="mt-2">No se registraron Especies avistadas en esta Zona</p>
                            
                        } 
                        
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