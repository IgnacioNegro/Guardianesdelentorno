import './AreaNatural.css';

const AreaNatural = ({id, nombre, tipo, region, estado}) => {

    return(
        <div className='area-natural-container'>
            <p>Id: {id}</p>
            <p>Nombre: {nombre}</p>
            <p>Tipo: {tipo}</p>
            <p>Region: {region}</p>
            <p>Estado: {estado}</p>

        </div>
    )
}

export default AreaNatural;