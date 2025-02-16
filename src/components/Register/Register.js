import { use, useState } from 'react';
import './Register.css';

const Register = ({closeModal}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [username, setUserName] = useState('');
    const [resultData, setresultData] = useState('null');
    //const error = [""]

    const RegistrarNuevoUsuario = async (event) => {
        console.log("entra al registrar nuevo usuario")
        event.preventDefault();

        const user = {
            User: {
                Name: name,
                username: username,
                email: email,
                password: password
            }
        };   

        const consulta = await fetch('https://mammal-excited-tarpon.ngrok-free.app/api/user/register?secret=TallerReact2025!', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
        const data = await consulta.json();
        setresultData(data);

        console.log(data.details);

    }

    return (
        <>
            <div className='register-container'>
                <form className='form-register' onSubmit={RegistrarNuevoUsuario}>
                    <button className='modal-close' onClick={closeModal}>✖</button>
                    {resultData.success == false && <p>- {resultData.details}</p>}
                    {resultData.result && <p>- Usuario registrado con exito</p>}
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email</label>
                        <input type="email" className="form-control" id="Login-Email" aria-describedby="emailHelp" placeholder="Enter email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Nombre</label>
                        <input type="text" className="form-control" id="Name" aria-describedby="user" placeholder="Enter Name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Nombre de usuario</label>
                        <input type="text" className="form-control" id="User-Name" aria-describedby="user" placeholder="Enter User Name"
                            value={username}
                            onChange={e => setUserName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="Login-Password" placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Registrarse</button>
                </form>
            </div>
        </>
    )
}

export default Register;