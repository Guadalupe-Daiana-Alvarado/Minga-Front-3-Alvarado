/* import React from 'react'
import Carrousel from '../components/Carrousel'
import img from '../../public/image/Frame 50.png'
import ButtonForm from '../components/ButtonSubmit'

function AuthorForm () {
  return (
    <>
      <div className='hidden md:block'>
        <Carrousel />
      </div>

      <main className='w-full h-96 bg-no-repeat bg-cover flex flex-col justify-around' style={{ backgroundImage: "url('./image/backgroundMain.png')" }}>
        <div className='bg-neutral-100 w-full h-1/2 p-5 flex flex-col items-center'>
          <h2 className='p-5  bg-white text-bold'>New Author</h2>
          <img src={img} alt="" />
        </div>

        <div className='bg-neutral-100 w-full min-h-full flex flex-col items-center'>
          <form className='w-11/12 min-h-3/4 flex flex-col items-center' action="signup.html" method="post" id="signup">
              <ul>
                <li>
                  <label for="name">
                  <input className='p-3 m-1 w-60 bg-neutral-100 border-b-indigo-500 ' type="text" id="name" name="Firstname" placeholder="First Name"/>
                  </label>
                </li>
                <li>
                  <label for="image">
                  <input  className='p-3 m-1 w-60 bg-neutral-100  ' type="text" id="name" name="Lastname" placeholder="url profile image" />
                  </label>
                </li>
                <li>
                  <label for="birth"> 
                  <input  className='p-3 m-1 w-60 bg-neutral-100  '  type="text" id="birth" name="birth" placeholder="date of birth ej:22/12/1194" />
                  </label>
                </li>
                <li>
                  <label for="image">
                  <input  className='p-3 m-1 w-60 bg-neutral-100  ' type="text" id="name" name="image" placeholder="url profile image" />
                  </label>
                </li>
                <li>
             <ButtonForm/>
                </li>
              </ul>

          </form>

        </div>

      </main>

    </>
  )
}

export default AuthorForm */

import React, { useState, useRef } from 'react';
import Carrousel from '../components/Carrousel';
import img from '../../public/image/Frame 50.png';
import ButtonForm from '../components/ButtonForm';
//import Alert from './Alert'; // Importa el componente Alert






const AuthorForm = () => {
  const firstNameRef = useRef("Lucas Ezequiel");
  const lastNameRef = useRef("Silva");
  const cityRef = useRef("Buenos Aires, Argentina");
  const birthdateRef = useRef(28 / 12 / 2023);
  const imageUrlRef = useRef("https://conceptodefinicion.de/wp-content/uploads/2016/01/Perfil2.jpg");

  const [show, setShow] = useState(false); // Estado show para mostrar alertas

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const cityCountryValue = cityRef.current.value;
      const [city, country] = cityCountryValue.split(',').map((item) => item.trim());

      const formData = {
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        city: city || '', // Asigna cadena vacía si city está vacía
        country: country || '', // Asigna cadena vacía si country está vacío
        birthdate: birthdateRef.current.value,
        imageUrl: imageUrlRef.current.value,
      };

      // Aquí puedes enviar formData al servidor

      // Mostrar alerta de éxito
      setShow(true);
    } catch (error) {
      console.error('Error:', error);
      // Mostrar alerta de error
      setShow(false);
    }
  };

  return (
    <main className='w-full h-3/4 bg-no-repeat bg-cover flex flex-col justify-around' style={{ backgroundImage: "url('./image/backgroundMain.png')" }}>
      <div className='bg-neutral-100 w-full h-1/2 p-5 flex flex-col items-center'>
        <h2 className='p-5  bg-white text-bold'>Nuevo Autor</h2>
        <img src={img} alt="" />
      </div>

      <div className='bg-neutral-100 w-full min-h-full flex flex-col items-center'>
        <form className='w-11/12 min-h-3/4 flex flex-col items-center' action="signup.html" method="post" id="signup">
          <ul>
            <li>
              <label htmlFor="name">
                <input
                  defaultValue={firstNameRef.value}
                  placeholder="Nombre"
                  className='p-3 m-1 w-60 bg-neutral-100 border-b-indigo-500 '
                  type="text"
                  id="firstName"
                  ref={firstNameRef}
                  required
                />
              </label>
            </li>
            <li>
              <label htmlFor="LastName">
                <input
                  defaultValue={lastNameRef.value}
                  placeholder="Apellido"
                  className='p-3 m-1 w-60 bg-neutral-100 border-b-indigo-500 '
                  type="text"
                  id="lastName"
                  ref={lastNameRef}
                  required
                />
              </label>
            </li>
            <li>
              <label htmlFor="city">
                <input
                  defaultValue={cityRef.value}
                  placeholder="Ciudad, País"
                  className='p-3 m-1 w-60 bg-neutral-100 border-b-indigo-500 '
                  type="text"
                  id="city"
                  ref={cityRef}
                  required
                />
              </label>
            </li>
            <li>
              <label htmlFor="birthdate">
                <input
                  defaultValue={birthdateRef.value}
                  placeholder="Fecha de nacimiento"
                  className='p-3 m-1 w-60 bg-neutral-100 border-b-indigo-500 '
                  type="date"
                  id="birthdate"
                  ref={birthdateRef}
                  required
                />
              </label>
            </li>
            <li>
              <label htmlFor="image">
                <input
                  defaultValue={imageUrlRef.value}
                  placeholder="URL de la imagen"
                  className='p-3 m-1 w-60 bg-neutral-100 border-b-indigo-500 '
                  type="url"
                  id="imageUrl"
                  ref={imageUrlRef}
                  required
                />
              </label>
            </li>
            <li>
              <ButtonForm
                title="Send" // Puedes ajustar el título según sea necesario
                url="http://localhost:8000/authors/create" // Puedes ajustar la URL a tu backend
                show={show} // Pasa el estado show si es necesario
                setShow={setShow} // Pasa la función setShow si es necesario
              />

            </li>
          </ul>
        </form>
        {show && <Alert />} {/* Mostrar la alerta si show es verdadero */}
      </div>
    </main>
  );
};

export default AuthorForm;

