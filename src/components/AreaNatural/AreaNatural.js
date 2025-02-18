import { useState } from 'react';
import './AreaNatural.css';
import AreaNaturalModal from '../AreaNaturalModal/AreaNaturalModal';

const AreaNatural = ({id, imageUrl, nombre, tipo, region, estado}) => { //id, nombre, tipo, region, estado

        const[modalVisible, setModalVisible] = useState(false);        
    
        const handleClickModal = () => {
            setModalVisible(true);
        }

    return(
        <div onClick={handleClickModal} className='area-especie-container container mt-5 d-flex flex-row mx-auto'>
            <div className='thumbnail-container mr-2'>
                <img src={imageUrl} className='thumbnail' ></img>
            </div>
            <div>                
                <p>Nombre: {nombre}</p>
                <p>Tipo: {tipo}</p>
                <p>Region: {region}</p>
                <p>Estado: {estado}</p>
            </div>            
            {modalVisible && <AreaNaturalModal closeModal={() => setModalVisible(false)}/>} 
        </div>
    )
}

export default AreaNatural;