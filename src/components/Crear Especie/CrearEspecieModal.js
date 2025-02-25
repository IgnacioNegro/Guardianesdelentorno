import React, { useState } from 'react';
import './CrearEspecieModal.css';
import { useSelector } from 'react-redux';



const CrearEspecieModal = ({ closeModal, arrayAreasNaturales}) => {
    const [commonName, setCommonName] = useState('');
    const [scientificName, setScientificName] = useState('');
    const [category, setCategory] = useState('');
    const [conservationStatus, setConservationStatus] = useState('');
    const [naturalAreaId, setNaturalAreaId] = useState('');
    const [resultData, setresultData] = useState(null);
    console.log(arrayAreasNaturales);

    const user= useSelector((state) => state.user);
    const InsertarEspecie = async (event) => {
        event.preventDefault();

        const especie = {
            "userId": user.id,
            "especies": {
                "commonName": commonName,
                "scientificName": scientificName,
                "category": category,
                "conservationStatus": conservationStatus,
                "naturalAreaId": naturalAreaId

            }
        }
        const insert = await fetch('https://mammal-excited-tarpon.ngrok-free.app/api/species/insert',
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(especie),
            }
        )

        const data = await insert.json();
        setresultData(data);
        console.log(data);

        if (insert.ok) {
            setresultData(true);
        } else {
            setresultData(false);
        }
    }
    return (
        <>
            <form onSubmit = {InsertarEspecie}>
              <div className='register-container'>
                <div className="form-register">
                     <button className='modal-close' onClick={closeModal}>X</button>
                    
                     <div className='form-group'>
                     <h3>Crear Especie</h3>
                        </div>
                        {resultData != null && (
                            resultData 
                            ? <p class="text success"><strong>Especie Creada con Exito</strong></p>
                            : <p class="text-danger"><strong>Error al Crear Especie</strong></p>
                        )}

                <div className='form-group'>
                <label htmlFor='name'>Nombre</label>
                <input type='text' className='form-control'  id='name' aria-describedby="name" placeholder="Nombre de la especie" required                            
                     value= {commonName}
                      onChange={e => setCommonName(e.target.value)} />
                </div>
                  
                    
                    <div className='form-group'>
                    <label htmlFor='name'>Nombre Cientifico</label>
                    <input type='text' className='form-control' id='scientificName' aria-describedby="ScrientificName" placeholder="Nombre Cientifico de la especie" required
                    value={scientificName}
                    onChange={e => setScientificName(e.target.value)} />
                    </div>

                    <div className='form-group'>
                    <label htmlFor='category'>Categoria</label>
                    <input type='text' className='form-control' id='category' aria-describedby="category" placeholder="Mamifero" required
                    value={category}
                    onChange={e => setCategory(e.target.value)} />
                    </div>

                    <div className='form-group'>
                    <label htmlFor='conservationStatus'>Estado de Conservacion</label>
                    <input type='text' className='form-control' id='conservationStatus' aria-describedby="conservationStatus" placeholder="En peligro" required
                    value={conservationStatus}
                    onChange={e => setConservationStatus(e.target.value)} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='naturalArea'>Área Natural</label>
                        <select
                            className='form-control'
                            id='naturalArea'
                            required
                            value={naturalAreaId}
                            onChange={e => setNaturalAreaId(e.target.value)}
                        >

{/*                 <option value="">Seleccione un área</option>
                 { arrayAreasNaturales.map(area => ( NO ME TOMA EL ARRAY
          <option key={area.id} value={area.id}>
            {area.name}
          </option> */}
    ))
                        </select>
                    </div>
                    <button type='submit' className='btn btn-primary'>Crear Especie</button>
                    </div>
                    </div>
                    
                    </form>
                    
                    </>
                    );
                    };  

                    export default CrearEspecieModal;