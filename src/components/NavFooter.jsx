import React from 'react';
import { Link } from 'react-router-dom';

const NavFooter = () => {
  return (
    <div className='flex flex-col p-5 w-5 lg:flex-row justify-around lg:justify-center gap-10'>
      <Link to="/" className='font-medium' href="">Home</Link>
      <Link to="/Mangas" className='font-medium' href="">Mangas</Link>
    </div>
  );
}

export default NavFooter;
