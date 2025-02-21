import './EspecieModal.css';

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
                    <p>Nombre: {especie.commonName}</p>
                    <p>Nombre Cientifico: {especie.scientificName}</p>
                    <p>Categoria: {especie.category}</p>                    
                    <p>Estado: {especie.conservationStatus}</p>
                    <p>Area Avistada: {especie.naturalAreaId}</p>
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