//M01 views//
import Carrousel from '../components/Carrousel'
import React, { useState } from 'react';
import Alert from '../components/Alert';
import { useRef } from 'react';
import axios from 'axios';
import '../assets/style.css'


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
      <div className='w-full min-h-screen bg-red-500 flex flex-col md:flex'>
        <div className='bg-red-200 min- w-full md:w-1/2 min-h-screen flex flex-col justify-center items-center'>
          <h2>Welcome!</h2>
          <p>Discord manga and comics,track your progres,
            have fun,read manga.
          </p>
          <Alert handleRegisterSubmit={handleRegisterSubmit} />
          <form className='bg-blue-200 h-5/6' onSubmit={(e) => handleRegisterSubmit(e)}>

            <div className="form-group">
              <label htmlFor="email"></label>
              <input className='p-3 m-1 w-60 bg-neutral-100 border-b-indigo-500 ' type="text" id="email" name="email" placeholder='Email' ref={email} />
              <div className="form-group">
                <label htmlFor="photo"></label>
                <input className='p-3 m-1 w-60 bg-neutral-100 border-b-indigo-500 ' type="text" id="photo" name="photo" placeholder='Photo' ref={photo} />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="password"></label>
              <input className='p-3 m-1 w-60 bg-neutral-100 border-b-indigo-500 ' type="password" id="password" name="password" placeholder='Password' ref={password} />
            </div>

            <div className="form-group">
              <label htmlFor="agreeTerms">
                <input className='p-3 m-1 w-60 bg-neutral-100 border-b-indigo-500 ' type="checkbox" id="agreeTerms" name="agreeTerms" />
                Send notification to my Email
              </label>
            </div>

          </form>
        </div>
        <div className='w-full md:w-1/2 md:m-5 min-h-screen bg-no-repeat bg-cover flex flex-col justify-start' style={{ backgroundImage: "url('/public/image/imagen-registro.svg')" }}>
        </div>

      </div >

    </>
  );
}
export default Register;
