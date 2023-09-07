import React from 'react';
import { Link } from 'react-router-dom';

const Display = () => {
  let isLoggedIn = true; //debo usar js para capturar el queryparam 

  return (
    <>
      <div className=' bg-gradient-to-r from-pink-300 to-pink-500  h-1/2 flex flex-col justify-around items-center text-center mt-5 '>
        <Link to="/" className='text-pink-400  bg-white p-1 w-48  rounded-md font-semibold text-2xl'>Home</Link>
        <Link to="/Registre" className='text-pink-400  bg-white p-1 w-48  rounded-md font-semibold text-2xl'>Register</Link>
        <Link to="/SignIn" className='text-pink-400  bg-white p-1 w-48  rounded-md font-semibold text-2xl'>Sign In</Link>
        <Link to={isLoggedIn ? "/Mangas" : "/NotAllowed"} className='text-pink-400  bg-white p-1 w-48  rounded-md font-semibold text-2xl'>Mangas</Link>
      </div>
    </>
  );
};

export default Display;
