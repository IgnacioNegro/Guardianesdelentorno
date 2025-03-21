import { useState } from 'react';
import './Actividad.css';
import ActividadModal from '../ActividadModal/ActividadModal';

const Actividad = ({ actividad, area, eliminarActividad, modificarActividad }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false); // Estado para controlar la edición
    const [editedActividad, setEditedActividad] = useState(actividad); // Estado para almacenar los cambios de la actividad

    const handleClickModal = () => {
        setModalVisible(true);
    };

    // Función para manejar los cambios en los campos de la actividad
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditedActividad((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Función para guardar los cambios
    const handleSaveChanges = () => {
        modificarActividad(editedActividad.id, editedActividad); // Llamar a la función de modificación con los datos editados
        setIsEditing(false); // Desactivar el modo de edición
    };

    return (
        <>
            <div onClick={handleClickModal} className='area-actividad-container container mt-5 d-flex flex-row mx-auto'>
                <div>
                    {isEditing ? (
                        <>
                            <div>
                                <label>Descripción:</label>
                                <input
                                    type="text"
                                    name="description"
                                    value={editedActividad.description}
                                    onChange={handleEditChange}
                                    className="form-control"
                                />
                            </div>
                            <div>
                                <label>Fecha:</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={editedActividad.date}
                                    onChange={handleEditChange}
                                    className="form-control"
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <p>Descripción: {editedActividad.description}</p>
                            <p>Fecha: {editedActividad.date}</p>
                        </>
                    )}
                </div>
            </div>

            {/* Editar o guarda los cambios*/}
            {isEditing ? (
                <button 
                    onClick={handleSaveChanges} 
                    className="btn btn-success btn-sm mx-3 mb-2"
                >
                    Guardar Cambios
                </button>
            ) : (
                <button 
                    onClick={() => setIsEditing(true)} 
                    className="btn btn-primary btn-sm mx-3 mb-2"
                >
                    Modificar Actividad
                </button>
            )}

            {/*  Boton Eliminar actividad */}
            <button 
                onClick={(e) => {
                    e.stopPropagation(); // Evita abrir el modal al hacer clic en el botón
                    eliminarActividad(actividad.id); // Llamamos a la API para eliminar
                }} 
                className="btn btn-danger btn-sm mx-3 mb-2"
            >
                Eliminar Actividad
            </button>

            {modalVisible && (
                <ActividadModal 
                    actividad={editedActividad} 
                    area={area} 
                    closeModal={() => setModalVisible(false)} 
                />
            )}
        </>
    );
};

export default Actividad;
