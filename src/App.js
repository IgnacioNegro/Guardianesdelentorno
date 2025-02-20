
import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar'
import { useSelector } from "react-redux";
import ListaAreas from './components/ListaAreasNaturales/ListaAreas';

function App() {
  const user = useSelector((state) => state.user);
  console.log(user)
  return (
    <>
      <Navbar/>    
      <ListaAreas/>  
    </>    
    
  );
}

export default App;

