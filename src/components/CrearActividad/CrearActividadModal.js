import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './CrearActividadModal.css';

const CrearActividadModal = ({ closeModal, arrayAreasNaturales }) => {
    
    const [descripcion, setDescripcion] = useState('');
    const [fecha, setFecha] = useState('');
    const [areaNaturalId, setAreaNaturalId] = useState('');
    const [resultData, setResultData] = useState(null);

    const user = useSelector((state) => state.user);

    const InsertarActividad = async (event) => {
        event.preventDefault();

        const actividad = {
            "conservationActivity": {
                "userId": user.id,
                "naturalAreaId": areaNaturalId, 
                "description": descripcion,
                "date": fecha
            }
        };

        try {
            const insert = await fetch('https://mammal-excited-tarpon.ngrok-free.app/api/conservation-activity/insert?secret=TallerReact2025!', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(actividad),
            });

            const data = await insert.json();
            console.log(data);
            

            if (insert.ok) {
                setResultData(true);
            } else {
                setResultData(false);
            }
        } catch (error) {
            console.error("Error al crear actividad:", error);
            setResultData(false);
        }
    };

    return (
        <>
            <form onSubmit={InsertarActividad}>
                <div className='register-container'>
                    <div className="form-register">
                        <button className='modal-close' onClick={closeModal}>X</button>

                        <div className='form-group'>
                            <h3>Crear Actividad</h3>
                        </div>

                        {resultData !== null && (
                            resultData
                                ? <p className="text-success"><strong>Actividad Creada con Éxito</strong></p>
                                : <p className="text-danger"><strong>Error al Crear Actividad</strong></p>
                        )}

                        <div className='form-group'>
                            <label htmlFor='descripcion'>Descripción</label>
                            <input type='text' className='form-control' id='descripcion' placeholder="Descripción breve" required
                                value={descripcion}
                                onChange={e => setDescripcion(e.target.value)} />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='fecha'>Fecha</label>
                            <input type='date' className='form-control' id='fecha' required
                                value={fecha}
                                onChange={e => setFecha(e.target.value)} />
                        </div>


                        <div className='form-group'>
                            <label htmlFor='areaNatural'>Área Natural</label>
                            
                            <select className='form-control' id='areaNatural' required value={areaNaturalId} onChange={e => setAreaNaturalId(e.target.value)}>
                                <option value="">-Seleccione un área-</option>
                                {arrayAreasNaturales.map(area => (
                                    <option key={area.id} value={area.id}>{area.name}</option>
                                ))}
                            </select>
                        </div>

                        <button type='submit' className='btn btn-primary'>Crear Actividad</button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default CrearActividadModal;
