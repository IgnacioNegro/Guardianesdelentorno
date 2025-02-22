import React, { useState } from 'react';
import './CrearAreaModal.css';

const CrearAreaModal = ({ closeModal, area }) => {
    const [name, setName] = useState(area.name || '');
    const [region, setRegion] = useState(area.region || '');
    const [description, setDescription] = useState(area.description || '');
    const [imageUrl, setImageUrl] = useState(area.imageUrl || '');
    const [mapLocation, setMapLocation] = useState(area.mapLocation || '');

    return (
        <>
            <div className='register-container'>
                <div className='form-register'>
                    <button className='modal-close' onClick={closeModal}>✖</button>

                    <div className="form-group">
                        <h3>Crear área natural</h3>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Nombre</label>
                        <input type="text" className="form-control" id="name" aria-describedby="name" placeholder="Enter Name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="region">Región</label>
                        <input type="text" className="form-control" id="region" aria-describedby="region" placeholder="Enter Region"
                            value={region}
                            onChange={e => setRegion(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Descripción</label>
                        <input type="text" className="form-control" id="description" aria-describedby="description" placeholder="Enter Description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="imageUrl">Imagen</label>
                        <input type="text" className="form-control" id="imageUrl" aria-describedby="imageUrl" placeholder="Enter Image URL"
                            value={imageUrl}
                            onChange={e => setImageUrl(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mapLocation">Ubicación mapa interactivo</label>
                        <input type="text" className="form-control" id="mapLocation" aria-describedby="mapLocation" placeholder="Enter Map Location"
                            value={mapLocation}
                            onChange={e => setMapLocation(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Cargar Area</button>
                </div>
            </div>
        </>
    );
};

export default CrearAreaModal;