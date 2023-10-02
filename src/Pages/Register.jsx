//M01 views//
import Carrousel from '../components/Carrousel'
import React, { useState } from 'react';
import Alert from '../components/Alert';
import { useRef } from 'react';
import axios from 'axios';
import '../assets/style.css'
import registerImg from '../../public/image/register.svg'


const Register = () => {
  // Estado para mostrar/ocultar la alerta
  const [show, setShow] = useState(false);
  const email = useRef()
  const password = useRef()
  const photo = useRef()
  // Función para manejar el envío del formulario
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    let data = {
      email: email.current.value,
      password: password.current.value,
      photo: photo.current.value
    }
    console.log(data)

    // Lógica de registro aquí...
    axios
      .post("http://localhost:8000/auth/register", data)
      .then((res) => {
        // Muestra la alerta de éxito cuando el registro es exitoso
        setShow(true);
        alert("Registro exitoso");
      })
      .catch((error) => {
        // Muestra la alerta de fracaso en caso de error
        setShow(true);
        alert("Error en el registro");
        console.log(error);
      });

  };

  return (
    <>
      <div className="container max-w-full mx-auto md:py-24 px-6">
        <div className="max-w-screen-xl mx-auto flex items-center justify-center">
          <div className="w-1/2 pr-4">
            <img src={registerImg} alt="register" className="w-full h-auto" />
          </div>
          <div className="w-1/2 pl-4">
            <div className="text-center font-semibold text-black">
              Welcome!
            </div>
            <div className="text-center font-base text-black">
              Discover mangas and comics, track your progress, have fun, read manga
            </div>
            <Alert handleRegisterSubmit={handleRegisterSubmit} />
            <form className="mt-8" onSubmit={handleRegisterSubmit}>
              <div className="mx-auto max-w-lg">
                <div className="py-1">
                  <span className="px-1 text-sm text-gray-600">Email</span>
                  <input
                    ref={email}
                    type="email"
                    className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                  />
                </div>
                <div className="py-1">
                  <span className="px-1 text-sm text-gray-600">Photo URL</span>
                  <input
                    ref={photo}
                    type="text" // Cambiamos el tipo de input a "text" para cargar una URL de foto
                    className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                  />
                </div>

                <div className="py-1">
                  <span className="px-1 text-sm text-gray-600">Password</span>
                  <input
                    ref={password}
                    type="password"
                    className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                  />

                </div>
                <div className="py-1">
                  <label htmlFor="agreeTerms">
                    <input className='p-3 m-1 w-60 bg-neutral-100 border-b-indigo-500 ' type="checkbox" id="agreeTerms" name="agreeTerms" />
                    Send notification to my Email
                  </label>
                </div>

              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
