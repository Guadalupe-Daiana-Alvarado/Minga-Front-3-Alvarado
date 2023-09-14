import React from 'react';
import { Link } from 'react-router-dom';

const ButtonNav = ({ to, title }) => {
  return (
    <Link to={to} className='text-pink-400 bg-white p-1 w-48 rounded-md font-semibold text-2xl'>
      {title}
    </Link>
 );
};

export default ButtonNav;
