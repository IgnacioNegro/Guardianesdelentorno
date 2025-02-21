import { useState } from 'react';
import './AreaNatural.css';
import AreaNaturalModal from '../AreaNaturalModal/AreaNaturalModal';

const AreaNatural = ({area}) => {

        const[modalVisible, setModalVisible] = useState(false);        
    
        const handleClickModal = () => {
            setModalVisible(true);
        }

    return(
        <>
            <div onClick={handleClickModal} className='area-especie-container container mt-5 d-flex flex-row mx-auto'>
                <div className='thumbnail-container mr-2'>
                    <img src={area.imageUrl} className='thumbnail' ></img>
                </div>
                <div>                
                    <p>Nombre: {area.nombre}</p>
                    <p>Tipo: {area.tipo}</p>
                    <p>Region: {area.region}</p>
                    <p>Estado: {area.estado}</p>
                </div>           
            </div>
            {modalVisible && (<AreaNaturalModal area={area} closeModal={() => setModalVisible(false)}/>)} 
        </>
    )
}

export default AreaNatural;