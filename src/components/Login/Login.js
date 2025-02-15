import React from 'react';
import { useState } from 'react';
import './Login.css';
import '../Register/Register.css';


const Login = ({closeModal}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');    
    //const error = [""]

    const Loguearse = async (event) => {
        console.log("entra al log usuario")
        event.preventDefault();         

        const consulta = await fetch('https://mammal-excited-tarpon.ngrok-free.app/api/user/login?secret=TallerReact2025!', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email: email, password: password}),
        })
        const data = await consulta.json();
        console.log(data);

    }

    return (
        <>
            <div className='register-container'>
                <form className='form-register' onSubmit={Loguearse}>
                <button className='modal-close' onClick={closeModal}>✖</button>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email</label>
                        <input type="email" className="form-control" id="Login-Email" aria-describedby="emailHelp" placeholder="Enter email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>                    
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="Login-Password" placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Iniciar Sesion</button>
                </form>
            </div>
        </>
    )
}

export default Login