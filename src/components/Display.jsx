import React, { useState } from 'react';
import ButtonNav from './ButtonNav';

const Display = () => {
  // Estado para manejar isLoggedIn
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const [userRole, setUserRole] = useState(1); // Cambia esto según el rol del usuario

  // Función para cambiar el estado de isLoggedIn
  const toggleIsLoggedIn = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <nav className='bg-gradient-to-r from-pink-300 to-pink-500 h-1/2 flex flex-col justify-around items-center text-center mt-5'>
      {/* Lista de opciones de navegación */}
      <ButtonNav to="/" title="Home" />
      <ButtonNav to={isLoggedIn ? "/Mangas" : "/NotAllow"} title="Mangas" />
      <ButtonNav to="/login" title="Login" />
      <ButtonNav to="/authors/me" title="Profile" />

      {/* Renderiza "New Manga" solo si el usuario tiene un rol igual a 1 o 2 y está logueado */}
      {isLoggedIn && (userRole === 1 || userRole === 2) && (
        <ButtonNav to="/manga-form" title="New Manga" />
      )}

      {/* Botón para cambiar el estado de isLoggedIn */}
      <button className='text-pink-400 bg-white p-1 w-48 rounded-md font-semibold text-2xl' onClick={toggleIsLoggedIn}>
        Toggle isLoggedIn: {isLoggedIn ? 'true' : 'false'}
      </button> 
    </nav>
  );
};

export default Display;


