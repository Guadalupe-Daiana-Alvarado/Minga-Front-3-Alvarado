
import React, { useState } from 'react';
import Alert from './Alert'; // Asegúrate de importar correctamente el componente Alert

const ButtonForm = ({ title,funcion, url, show, setShow }) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div>
      <button 
className='p-3 text-white font-bold ml-5  w-28 bg-pink-400 rounded-full'
 onClick={funcion}>{title}</button>
       {show && (
        <Alert
          success={success}
          error={error}
          onClose={() => {
            setShow(false);
            setSuccess(false);
            setError(false);
          }}
        />
      )} 
    </div>
  );
};

export default ButtonForm;
