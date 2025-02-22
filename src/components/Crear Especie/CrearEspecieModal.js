import React, { useState } from 'react';
import './CrearEspecieModal.css';

const CrearEspecieModal = ({ closeModal, especie  }) => {
    const [commonName, setCommonName] = useState(especie.commonName || '');
    const [scientificName, setScientificName] = useState(especie.scientificName || '');
    const [category, setCategory] = useState(especie.category || '');
    const [conservationStatus, setConservationStatus] = useState(especie.conservationStatus || '');

    return (
        <>
            <div className='register-container'>
                <div className='form-register'>
                    <button className='modal-close' onClick={closeModal}>✖</button>

                    <div className="form-group">
                        <h1> Crear Especie</h1>
                    </div>
                    <div className="form-group">
                        <label htmlFor="commonName">Nombre Común</label>
                        <input type="text" className="form-control" id="commonName" aria-describedby="commonName" placeholder="Enter Common Name"
                            value={commonName}
                            onChange={e => setCommonName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="scientificName">Nombre Científico</label>
                        <input type="text" className="form-control" id="scientificName" aria-describedby="scientificName" placeholder="Enter Scientific Name"
                            value={scientificName}
                            onChange={e => setScientificName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Categoría</label>
                        <input type="text" className="form-control" id="category" aria-describedby="category" placeholder="Enter Category"
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="conservationStatus">Estado de Conservación</label>
                        <input type="text" className="form-control" id="conservationStatus" aria-describedby="conservationStatus" placeholder="Enter Conservation Status"
                            value={conservationStatus}
                            onChange={e => setConservationStatus(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Cargar Especie</button>
                </div>
            </div>
        </>
    );
};

export default CrearEspecieModal;