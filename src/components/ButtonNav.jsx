import React from 'react';
import { Link } from 'react-router-dom';

const ButtonNav = () => {
  return (
    <Link to="/login" className='text-pink-400 bg-white p-1 w-48 rounded-md font-semibold text-2xl'>Login</Link>
  );
};

export default ButtonNav;
