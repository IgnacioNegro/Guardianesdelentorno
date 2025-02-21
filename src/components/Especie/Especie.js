import { useState } from 'react';
import './Especie.css';


const Especie = ({especie}) => {

        const[modalVisible, setModalVisible] = useState(false);        
    
        const handleClickModal = () => {
            setModalVisible(true);
        }

    return(
        <>
            <div onClick={handleClickModal} className='area-especie-container container mt-5 d-flex flex-row mx-auto'>
                <div className='thumbnail-container mr-2'>
                    <img src={especie.imageUrl} className='thumbnail' ></img>
                </div>
                <div>                
                    <p>Nombre: {especie.name}</p>
                    <p>Tipo: {especie.areaType}</p>
                    <p>Region: {especie.region}</p>
                    <p>Estado: {especie.conservationStatus}</p>
                </div>           
            </div>
            {modalVisible && (<EspecieModal especie={especie} closeModal={() => setModalVisible(false)}/>)} 
        </>
    )
}

export default Especie;