import './Navbar.css';
import Login from '../Login/Login';
import Register from '../Register/Register';
import { useState } from 'react';

const Navbar = () => {

    const[registerModalVisible, setRegisterModalVisible] = useState(false);
    const[registerModalVisibleLogin, setRegisterModalVisibleLogin] = useState(false);

    const handleClickRegister = () => {
        setRegisterModalVisible(true);
    }

    const handleClickLogin = () => {
        setRegisterModalVisibleLogin(true);
    }

    return (
        <div id='Navbar-container'>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>                                                  
                        </ul>
                        <button type="button" class="btn btn-link" onClick={handleClickLogin}>Loguearse</button>
                        {registerModalVisibleLogin && <Login closeModal={() => setRegisterModalVisibleLogin(false)}/> } 

                        <button type="button" class="btn btn-primary" onClick={handleClickRegister}>Registrarse</button>    
                        {registerModalVisible && <Register closeModal={() => setRegisterModalVisible(false)}/> }                   
                    </div>
                </div>
            </nav>
        </div>
    )

};

export default Navbar;
