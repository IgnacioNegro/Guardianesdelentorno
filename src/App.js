
import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar'
import Register from './components/Register/Register';
import { useSelector } from "react-redux";
import ListaAreas from './components/ListaAreasNaturales/ListaAreas';
import UserProfile from './components/UserProfile/UserProfile';
import Login from './components/Login/Login';



function App() {
  const user = useSelector((state) => state.user);
  return (
    <>
      <Navbar/>   
      <ListaAreas/>
      {user ? <UserProfile /> : <Login />}
    </>    
    
  );
}

export default App;

