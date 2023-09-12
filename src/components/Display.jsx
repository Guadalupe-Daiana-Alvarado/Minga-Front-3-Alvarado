import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Display = () => {
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Función para obtener los datos del usuario desde el backend
    const fetchUserData = async () => {
      try {
        // Obtén el token almacenado en localStorage
        const token = localStorage.getItem('token');

        // Verifica si el token está definido
        if (!token) {
          console.error('Token no encontrado en localStorage');
          return;
        }

        // Configura los encabezados para incluir el token de autenticación
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        // Realiza una solicitud al backend para obtener los datos del usuario
        const response = await axios.get('/auth/signin', { headers });

        // Almacena los datos del usuario en el estado
        setUserData(response.data);

        // Si los datos del usuario se obtuvieron correctamente, establece isLoggedIn en true
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };

    // Llama a la función para obtener los datos del usuario cuando el componente se monta
    fetchUserData();
  }, []);

  // Función para almacenar el token en localStorage al iniciar sesión
  const login = (token) => {
    localStorage.setItem('token', token);
  };

  return (
    <>
      <div className=' bg-gradient-to-r from-pink-300 to-pink-500 h-1/2 flex flex-col justify-around items-center text-center mt-5 '>
        <Link to="/" className='text-pink-400 bg-white p-1 w-48 rounded-md font-semibold text-2xl'>Home</Link>
        <Link to="/register" className='text-pink-400 bg-white p-1 w-48 rounded-md font-semibold text-2xl'>Register</Link>
        <Link to="/signin" className='text-pink-400 bg-white p-1 w-48 rounded-md font-semibold text-2xl'>Sign In</Link>

        {isLoggedIn ? (
          <div>
            {userData && (
              <>
                <img src={userData.profilePicture} alt="Foto de Perfil" />
                <p>{userData.name}</p>
              </>
            )}
          </div>
        ) : (
          <Link to="/login" className='text-pink-400 bg-white p-1 w-48 rounded-md font-semibold text-2xl'>Login</Link>
        )}
        <Link to={isLoggedIn ? "/Mangas" : "/NotAllowed"} className='text-pink-400 bg-white p-1 w-48 rounded-md font-semibold text-2xl'>Mangas</Link>
        <Link to="/authors/me" className='text-2xl w-1/2 rounded-xl font-bold hover:bg-white cursor-pointer'>Profile</Link>
      </div>
    </>
  );
};

export default Display;
