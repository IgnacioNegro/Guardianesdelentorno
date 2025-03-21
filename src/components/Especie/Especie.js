import { useState } from 'react';
import './Especie.css';
import EspecieModal from '../EspecieModal/EspecieModal';

const Especie = ({ especie, area, eliminarEspecie, modificarEspecie }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false); // Estado para controlar la edición
    const [editedEspecie, setEditedEspecie] = useState(especie); // Estado para almacenar los cambios de la especie

    const handleClickModal = () => {
        setModalVisible(true);
    };

    // Función para manejar los cambios en los campos de la especie
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditedEspecie((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Función para guardar los cambios
    const handleSaveChanges = () => {
        modificarEspecie(editedEspecie.id, editedEspecie); // Llamar a la función de modificación con los datos editados
        setIsEditing(false); // Desactivar el modo de edición
    };

    return (
        <>
            <div onClick={handleClickModal} className='area-especie-container container mt-5 d-flex flex-row mx-auto'>
                {/* Contenido de la especie */}
                <div>
                    {isEditing ? (
                        <>
                            <div>
                                <label>Nombre común:</label>
                                <input
                                    type="text"
                                    name="commonName"
                                    value={editedEspecie.commonName}
                                    onChange={handleEditChange}
                                    className="form-control"
                                />
                            </div>
                            <div>
                                <label>Nombre científico:</label>
                                <input
                                    type="text"
                                    name="scientificName"
                                    value={editedEspecie.scientificName}
                                    onChange={handleEditChange}
                                    className="form-control"
                                />
                            </div>
                            <div>
                                <label>Categoría:</label>
                                <input
                                    type="text"
                                    name="category"
                                    value={editedEspecie.category}
                                    onChange={handleEditChange}
                                    className="form-control"
                                />
                            </div>
                            <div>
                                <label>Estado:</label>
                                <input
                                    type="text"
                                    name="conservationStatus"
                                    value={editedEspecie.conservationStatus}
                                    onChange={handleEditChange}
                                    className="form-control"
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <p>Nombre común: {editedEspecie.commonName}</p>
                            <p>Nombre científico: {editedEspecie.scientificName}</p>
                            <p>Categoría: {editedEspecie.category}</p>
                            <p>Estado: {editedEspecie.conservationStatus}</p>
                        </>
                    )}
                </div>
            </div>

            {/* Botón de guardar cambios o editar */}
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
                    Modificar Especie
                </button>
            )}

            {/* Botón de eliminación fuera del contenedor principal */}
            <button 
                onClick={(e) => {
                    e.stopPropagation(); // Evita abrir el modal al hacer clic en el botón
                    eliminarEspecie(especie.id);
                }} 
                className="btn btn-danger btn-sm mx-3 mb-2"
            >
                Eliminar Especie
            </button>

            {modalVisible && (
                <EspecieModal 
                    especie={editedEspecie} 
                    area={area} 
                    closeModal={() => setModalVisible(false)} 
                />
            )}
        </>
    );
}

export default Especie;
