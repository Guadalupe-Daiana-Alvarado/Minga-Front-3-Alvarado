//M01 views//
import Carrousel from '../components/Carrousel'
import React, { useState } from 'react';
import Alert from '../components/Alert';
import { useRef } from 'react';
import axios from 'axios';
import '../assets/style.css'
import ButtonForm from '../components/ButtonForm';
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
      <div>
        <h2>Welcome!</h2>
        <p>Discord manga and comics,track your progres,
          have fun,read manga.
        </p>
        {/* Renderiza el componente Alert si show es true */}
        {show && <Alert message="Registro exitoso" type="success" />}
        <form onSubmit={(e) => handleRegisterSubmit(e)}>
          {/* Agrega los campos del formulario de registro aquí... */}
          {/* Por ejemplo: */}
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" name="email" ref={email} />
            <div className="form-group">
              <label htmlFor="photo">Photo:</label>
              <input type="text" id="photo" name="photo" ref={photo} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" ref={password} />
          </div>

          <div className="form-group">
            <label htmlFor="agreeTerms">
              <input type="checkbox" id="agreeTerms" name="agreeTerms" />
              Send notification to my Email
            </label>
          </div>



          <ButtonForm label="Sign Up" >Sign Up/</ButtonForm>
          <button> </button>
        </form>
      </div>
      <div className="container">
      </div>

    </>
  );
}
export default Register;