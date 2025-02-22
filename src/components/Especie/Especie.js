import { useEffect, useState } from 'react';
import './Especie.css';
import EspecieModal from '../EspecieModal/EspecieModal';

const Especie = ({especie, area}) => {

        const[modalVisible, setModalVisible] = useState(false);        
    
        const handleClickModal = () => {
            setModalVisible(true);
        }
        console.log("En especie, area: ", area);
        
    return(
        <>
            <div onClick={handleClickModal} className='area-especie-container container mt-5 d-flex flex-row mx-auto'>
                {/* <div className='thumbnail-container mr-2'>
                    <img src={especie.imageUrl} className='thumbnail' ></img>
                </div> */}
                <div>                
                    <p>Nombre: {especie.commonName}</p>
                    <p>Nombre Cientifico: {especie.scientificName}</p>
                    <p>Categoria: {especie.category}</p>                    
                    <p>Estado: {especie.conservationStatus}</p>
                </div>           
            </div>
            {modalVisible && (<EspecieModal especie={especie} area={area} closeModal={() => setModalVisible(false)}/>)} 
        </>
    )
}

export default Especie;