import React, { useState, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { uploadFile } from "../../fireBase/firebase.js"
import Alert from '../components/Alert'; 


const Register = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const photoRef = useRef(null); // Referencia al input de archivo

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [photoError, setPhotoError] = useState("");
  const [imgUrl, setImgUrl] = useState(null); // Almacenar la URL de la imagen

  const handleImageChange = async (img) => {
    try {
      const result = await uploadFile(img, "user_profile/"); // Cargar la imagen a Firebase Storage
      console.log(result);
      setImgUrl(result); // Almacenar la URL de la imagen cargada
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (!emailRef.current.value) {
      setEmailError("El campo Email es requerido");
      return;
    } else {
      setEmailError("");
    }

    if (!passwordRef.current.value) {
      setPasswordError("El campo Password es requerido");
      return;
    } else {
      setPasswordError("");
    }

    if (!imgUrl) {
      setPhotoError("La imagen de perfil es requerida");
      return;
    } else {
      setPhotoError("");
    }

    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      photo: imgUrl, // Usar la URL de la imagen
    };
    console.log(data);

    try {
      await axios.post('http://localhost:8000/auth/register', data);
      console.log(data);
      Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error('Error:', error);

      Swal.fire({
        icon: 'error',
        title: 'Error en el registro',
        text: 'Ha ocurrido un error al enviar los datos al servidor.',
      });
    }
  };

  return (
    <>
      <div className='w-full min-h-screen bg-red-500 flex flex-col md:flex'>
        <div className='bg-red-200 min- w-full md:w-1/2 min-h-screen flex flex-col justify-center items-center'>
          <h2>Welcome!</h2>
          <p>Discord manga and comics, track your progress, have fun, read manga.</p>
          <Alert handleRegisterSubmit={handleRegisterSubmit} />
          <form className='bg-blue-200 h-5/6' onSubmit={(e) => handleRegisterSubmit(e)}>

            <div className="form-group">
              <label htmlFor="email"></label>
              <input className='p-3 m-1 w-60 bg-neutral-100 border-b-indigo-500 ' type="text" id="email" name="email" placeholder='Email' ref={emailRef} />
              <div className="form-group">
                <label htmlFor="photo"></label>
                <input
                  className='p-3 m-1 w-60 bg-neutral-100 border-b-indigo-500'
                  type="file"
                  id="photo"
                  name="photo"
                  onChange={e => handleImageChange(e.target.files[0])}
                  required
                  ref={photoRef}
                />
              </div>
              <span className="error">{emailError}</span>
            </div>
            <div className="form-group">
              <label htmlFor="password"></label>
              <input className='p-3 m-1 w-60 bg-neutral-100 border-b-indigo-500 ' type="password" id="password" name="password" placeholder='Password' ref={passwordRef} />
              <span className="error">{passwordError}</span>
            </div>

            <div className="form-group">
              <span className="error">{photoError}</span>
            </div>

            <div className="form-group">
              <label htmlFor="agreeTerms">
                <input className='p-3 m-1 w-60 bg-neutral-100 border-b-indigo-500 ' type="checkbox" id="agreeTerms" name="agreeTerms" />
                Send notification to my Email
              </label>
            </div>

            <button
              type="submit"
              className='bg-blue-500 text-white py-2 px-4 rounded'
            >
              Enviar
            </button>

          </form>
        </div>
        <div className='w-full md:w-1/2 md:m-5 min-h-screen bg-no-repeat bg-cover flex flex-col justify-start' style={{ backgroundImage: "url('/public/image/imagen-registro.svg')" }}>
        </div>

      </div >

    </>
  );
};

export default Register;
