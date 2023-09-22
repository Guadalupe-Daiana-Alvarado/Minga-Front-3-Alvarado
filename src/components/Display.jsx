import React, { useState } from 'react';
import ButtonNav from './ButtonNav';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Display = () => {
  const isAuthenticated = false;
  // Estado para manejar isLoggedIn
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userRole, setUserRole] = useState(0);
  const navigate = useNavigate();

  const navigationOptions = [
    <ButtonNav to="/" title="Home" />,
    <ButtonNav to={isLoggedIn ? "/Mangas" : "/NotAllow"} title="Mangas" />,
    <ButtonNav to="/login" title="Login" />,
    <ButtonNav to="/authors/me" title="Profile" />,
    <ButtonNav to="/notAllow" title="NewRole" />,
    <ButtonNav to="/edit/:manga_id" title="Edit Chapter" />,
    /* Si el usuario NO está autenticado, muestra el botón "Register" que dirige a /register */
    !isAuthenticated && <ButtonNav to="/register" title="Register" />,
  ];

  const toggleIsLoggedIn = () => {
    if (isLoggedIn) {
      // Eliminar token y datos de usuario del localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Redirigir al usuario a la página principal o de inicio de sesión
      navigate('/');
    } else {
      // Implementa la lógica para iniciar sesión aquí, si es necesario
      // Por ejemplo, redirigir al usuario a la página de inicio de sesión
      navigate('/login');
    }
    setIsLoggedIn(!isLoggedIn); // Cambiar el estado isLoggedIn
  };

  return (
    <nav className='bg-gradient-to-r from-pink-300 to-pink-500 h-1/2 flex flex-col justify-around items-center text-center mt-5'>
      {navigationOptions.map((option) => (
        // Renderiza "New Author" solo si el usuario tiene un rol igual a 0 y está logueado
        option.props.title === "NewRole" && userRole === 0 && isLoggedIn ? (
          <ButtonNav key={option.props.to} to="/NewRole" title="New Author" />
        ) : (
          <ButtonNav key={option.props.to} to={option.props.to} title={option.props.title} />
        )
      ))}
      
      <button
        className='text-pink-400 bg-white p-1 w-48 rounded-md font-semibold text-2xl'
        onClick={toggleIsLoggedIn}
      >
        {isLoggedIn ? 'Cerrar Sesión' : 'Iniciar Sesión'}
      </button>
    </nav>
  );
};

export default Display;
