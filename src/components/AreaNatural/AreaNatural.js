import { useState } from 'react';
import './AreaNatural.css';
import AreaNaturalModal from '../AreaNaturalModal/AreaNaturalModal';

const AreaNatural = ({ area, especiesAvistadas, eliminarArea, modificarArea }) => {

    const [modalVisible, setModalVisible] = useState(false); // Use state hook para controlar la visibilidad del modal
    const [isEditing, setIsEditing] = useState(false); // Estado para cambiar al modo edicion (modificar)
    const [editedArea, setEditedArea] = useState(area); // Estado para almacenar los cambios en el área

    const handleClickModal = () => {
        setModalVisible(true);
    }

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditedArea((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSaveChanges = () => {
        modificarArea(editedArea); // Ejecuta la función para actualizar el área
        setIsEditing(false); // Desactiva el modo de edición
    };

    return (
        <>
            <div onClick={handleClickModal} className='area-especie-container container mt-5 d-flex flex-row mx-auto'>
                <div className='thumbnail-container mr-2'>
                    <img src={editedArea.imageUrl} className='thumbnail' alt={editedArea.name} />
                </div>
                <div>
                    {isEditing ? (
                        <>
                            <div>
                                <label>Nombre:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={editedArea.name}
                                    onChange={handleEditChange}
                                    className="form-control"
                                />
                            </div>
                            <div>
                                <label>Tipo:</label>
                                <input
                                    type="text"
                                    name="areaType"
                                    value={editedArea.areaType}
                                    onChange={handleEditChange}
                                    className="form-control"
                                />
                            </div>
                            <div>
                                <label>Región:</label>
                                <input
                                    type="text"
                                    name="region"
                                    value={editedArea.region}
                                    onChange={handleEditChange}
                                    className="form-control"
                                />
                            </div>
                            <div>
                                <label>Estado:</label>
                                <input
                                    type="text"
                                    name="conservationStatus"
                                    value={editedArea.conservationStatus}
                                    onChange={handleEditChange}
                                    className="form-control"
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <p>Nombre: {editedArea.name}</p>
                            <p>Tipo: {editedArea.areaType}</p>
                            <p>Región: {editedArea.region}</p>
                            <p>Estado: {editedArea.conservationStatus}</p>
                        </>
                    )}
                </div>
            </div>

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
                    Modificar Área
                </button>
            )}

            <button 
                onClick={() => eliminarArea(area.id)} 
                className="btn btn-danger btn-sm mx-3 mb-2"
            >
                Eliminar Área
            </button>

            {modalVisible && (
                <AreaNaturalModal 
                    area={editedArea} 
                    especiesAvistadas={especiesAvistadas} 
                    closeModal={() => setModalVisible(false)} 
                />
            )}
        </>
    );
}

export default AreaNatural;
