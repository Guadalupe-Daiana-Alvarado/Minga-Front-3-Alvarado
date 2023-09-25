import React, { useState } from 'react';
import ButtonNav from './ButtonNav';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Display = () => {
  const isAuthenticated = false;
  // Estado para manejar isLoggedIn
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userRole, setUserRole] = useState(0);
  const navigate = useNavigate();
  const role = localStorage.getItem("role")
  console.log(role)
  const userToken = localStorage.getItem("token")
  const headers = { headers: { "authorization": `Bearer ${userToken}` } }
  const logout = async () => {
    axios.post("http://localhost:8000/auth/signout", null, headers)
      .then(res => {
        localStorage.clear()
        navigate("/")
      })
      .catch(res => console.log(res))
  }

  return (
    <nav className='bg-gradient-to-r from-pink-300 to-pink-500 h-1/2 flex flex-col justify-around items-center text-center mt-5'>
      <ButtonNav to="/" title="Home" />
      <ButtonNav to={role ? "/Mangas" : "/NotAllow"} title="Mangas" />
      {!role ? (<ButtonNav to="/login" title="Login" />) : ("")}

      {role ? (<button className='cursor-pointer text-pink-400 bg-white p-1 w-48 rounded-md font-semibold text-2xl' onClick={logout}>Logout</button>) : ("")}

      {role ? (<ButtonNav to="/authors/me" title="Profile" />) : ("")}
      {role ? (<ButtonNav to="/newRole" title="NewRole" />) : ("")}
      {role ? (<ButtonNav to="/MyMangas" title="My Mangas" />) : ("")}
      {!role ? (<ButtonNav to="/register" title="Register" />) : ("")}
      {role ? (<ButtonNav to="/admin" title="Admin" />) : ("")}



    </nav>
  );
};

export default Display;
