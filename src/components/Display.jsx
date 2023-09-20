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
  const navigationOptions = [
    <ButtonNav to="/" title="Home" />,
    <ButtonNav to={isLoggedIn ? "/Mangas" : "/NotAllow"} title="Mangas" />,
    <ButtonNav onClick={toggleIsLoggedIn} to="/login" title="Login" />,
    <ButtonNav to="/authors/me" title="Profile" />,
    <ButtonNav to="/newRole" title="NewRole" />,
    /* Si el usuario NO está autenticado, muestra el botón "Register" que dirige a /register */
    !isAuthenticated && <ButtonNav to="/register" title="Register" />,
  ];

  

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
      
    </nav>
  );
};

export default Display;
