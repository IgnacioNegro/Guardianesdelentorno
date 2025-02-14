import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const CargarApi = async (event) => {
        event.preventDefault(); 
        const response = await fetch(
            "https://mammal-excited-tarpon.ngrok-free.app/api/user/login?secret=TallerReact2025!",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, password }),
            }
          );

          const data = await response.json();
          if (response.ok) { 
            console.log("✅ Inicio de sesión exitoso");
            alert("Bienvenido, has iniciado sesión correctamente.");
        } else {
            console.log("❌ Error en el inicio de sesión:", data.mensaje);
            alert("Usuario o contraseña incorrectos.");
         
    } 
}
    return (

        //Simple 
        
        <form onSubmit={CargarApi}>
            <h1>Login</h1>
            <label> Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>

            <label> Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button type="submit">Login</button> 
            
        </form>

        /* FORMULARIO INICIO DE SESION CON BOOTSTRAP
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title text-center">Login</h3>
                              <form onSubmit={CargarApi}>
                                <div className="form-group">
                                    <label htmlFor="email">Email address</label>
                                    <input type="email" id="email" className="form-control"  placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" id="password" className="form-control" placeholder="Password" value={password}  onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div> 

*/
    );


}


export default Login;
