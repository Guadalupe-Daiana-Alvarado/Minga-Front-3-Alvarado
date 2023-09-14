<<<<<<< HEAD
// ButtonForm.jsx
import React from 'react';

const ButtonForm = ({ label }) => {
    return (
        <button type="submit" className="btn btn-primary">
            {label}
        </button>
    );
}
=======

import React, { useState } from 'react';
//import Alert from './Alert'; // Asegúrate de importar correctamente el componente Alert

const ButtonForm = ({ title, url, show, setShow }) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleFormSubmit = async () => {
    try {
      // Realiza una solicitud fetch a la URL
      const response = await fetch(url, {
        method: 'POST', // o 'GET', 'PUT', etc., según sea necesario
        // Otros encabezados y datos de solicitud según sea necesario
      });

      if (response.ok) {
        setSuccess(true);
        setError(false);
        setShow(true);
      } else {
        setError(true);
        setSuccess(false);
        setShow(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setError(true);
      setSuccess(false);
      setShow(true);
    }
  };

  return (
    <div>
      <button 
className='p-3 text-white font-bold ml-5  w-28 bg-pink-400 rounded-full'
 onClick={handleFormSubmit}>{title}</button>
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
>>>>>>> parent of fe7360e (Merge pull request #17 from Guadalupe-Daiana-Alvarado/revert-14-m-05-sprint-3)

export default ButtonForm;
