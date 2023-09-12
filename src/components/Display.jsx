import React, { useState } from 'react';
import ButtonNav from './ButtonNav';

const Display = () => {
  // Estado para manejar isLoggedIn
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Lista de opciones de navegación
  const navigationOptions = [
    <ButtonNav to="/" title="Home" />,
    <ButtonNav to={isLoggedIn ? "/Mangas" : "/NotAllowed"} title="Mangas" />,
    <ButtonNav to="/login" title="Login" />,
    <ButtonNav to="/authors/me" title="Profile" />,
    <ButtonNav to="/newRole" title="NewRole" />,
  ];

  // Función para cambiar el estado de isLoggedIn
  const toggleIsLoggedIn = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <nav className='bg-gradient-to-r from-pink-300 to-pink-500 h-1/2 flex flex-col justify-around items-center text-center mt-5'>
      {/* Generar dinámicamente botones de navegación */}
      {navigationOptions.map((option) => (
        <ButtonNav key={option.to} to={option.props.to} title={option.props.title} />
      ))}

      {/* Botón para cambiar el estado de isLoggedIn */}
      <button className='text-pink-400 bg-white p-1 w-48 rounded-md font-semibold text-2xl' onClick={toggleIsLoggedIn}>
        Toggle isLoggedIn: {isLoggedIn ? 'true' : 'false'}
      </button>
    </nav>
  );
};

export default Display;



/* 
import React from 'react';
import { Link } from 'react-router-dom';

const Display = () => {
  let isLoggedIn = true; //debo usar js para capturar el queryparam 
  

  return (
    <>
      <div className=' bg-gradient-to-r from-pink-300 to-pink-500  h-1/2 flex flex-col justify-around items-center text-center mt-5 '>
        <Link to="/" className='text-pink-400  bg-white p-1 w-48  rounded-md font-semibold text-2xl'>Home</Link>
        <Link to="/register" className='text-pink-400  bg-white p-1 w-48  rounded-md font-semibold text-2xl'>Register</Link>
        <Link to="/signin" className='text-pink-400  bg-white p-1 w-48  rounded-md font-semibold text-2xl'>Sign In</Link>
        <Link to={isLoggedIn ? "/Mangas" : "/NotAllowed"} className='text-pink-400  bg-white p-1 w-48  rounded-md font-semibold text-2xl'>Mangas</Link>
        <Link to="/authors/me"  className='text-pink-400  bg-white p-1 w-48  rounded-md font-semibold text-2xl'>Profile</Link>
        <Link to="/newRole" className='text-pink-400  bg-white p-1 w-48  rounded-md font-semibold text-2xl'>NewRole</Link>
      </div>
      
    </>
  );
};

export default Display;


className='bg-gradient-to-r from-pink-300 to-pink-500 h-1/2 flex flex-col justify-around items-center text-center mt-5'
*/
