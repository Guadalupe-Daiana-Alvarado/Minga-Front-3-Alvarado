import React, { useState, useRef } from 'react';
import ButtonForm from '../components/ButtonForm.jsx';
import Alert from '../components/Alert.jsx';
import { firebaseApp } from '../../fireBase/firebase.js';

import {upLoadFile} from '../../fireBase/firebase.js'



const AuthorForm = () => {
  const nameRef = useRef("Lucas Ezequiel");
  const last_NameRef = useRef("Silva");
  const cityRef = useRef("Buenos Aires, Argentina");
  const birthdateRef = useRef("2023-12-28");
  const imageRef = useRef(null);

  const [show, setShow] = useState(false);
  const [alertType, setAlertType] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");

  // Estados para controlar los mensajes de error
  const [nameError, setNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [cityError, setCityError] = useState("");
  const [birthdateError, setBirthdateError] = useState("");
  const [file, setFile] = useState(null)

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(file)
    const result = await upLoadFile(file)
    console.log(result)
/* 
    const imageFile = e.target.files[0];
    const archivoRef = ref(storage, `image/${imageFile.name}`);
    await uploadBytes(archivoRef, imageFile);
    const urlDescarga = await getDownloadURL(archivoRef);
 
    const storageRef = storage.ref();
    const imageStorageRef = storageRef.child(`images/${imageFile.name}`);
    await imageStorageRef.put(imageFile);
    const imageUrl = await imageStorageRef.getDownloadURL(); */

    const cityCountryValue = cityRef.current.value;
    const [city, country] = cityCountryValue.split(',').map((item) => item.trim());
    const formData = {
      name: nameRef.current.value,
      last_name: last_NameRef.current.value,
      city: city,
      country: country,
      date: birthdateRef.current.value,
      photo: file,
    };



/*     try { 
      const imageRef = storageRef.child(`images/${imageFile.name}`);
      await imageRef.put(imageFile);
    } catch (error) {
      console.error('Error al cargar la imagen en Firebase Storage:', error);
    } */

    //ENVIO DE LA DATA//////////////////////////////////
    try {
      const response = await fetch('http://localhost:8000/authors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Asegúrate de configurar los encabezados adecuadamente
        },
        body: JSON.stringify(formData), // Aquí enviamos los datos del formulario como JSON
      });

      if (response.ok) {
        // La solicitud fue exitosa
        console.log('Datos enviados correctamente');
        // Puedes realizar acciones adicionales aquí, como redirigir al usuario o mostrar un mensaje de éxito.
      } else {
        // La solicitud no fue exitosa
        console.error('Error al enviar datos al servidor');
        setAlertType("error");
        setAlertMessage("Error al enviar datos al servidor");
        setShow(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setAlertType("error");
      setAlertMessage("Error al enviar datos al servidor");
      setShow(true);
    }
  };

  return (
    <main className='w-full h-3/4 bg-no-repeat bg-cover flex flex-col justify-around' style={{ backgroundImage: "url('./image/backgroundMain.png')" }}>
      <div className='bg-neutral-100 w-full h-1/2 p-5 flex flex-col items-center'>
        <h2 className='p-5  bg-white text-bold'>Nuevo Autor</h2>
      </div>

      <div className='bg-neutral-100 w-full min-h-full flex flex-col items-center'>
      <form className='w-11/12 min-h-3/4 flex flex-col items-center' id="signup" onSubmit={handleSubmit}>          <ul>
            <div>
              <label htmlFor="name">
                <input
                  defaultValue={nameRef.value}
                  placeholder="Nombre"
                  className='p-3 m-1 w-60 bg-neutral-100 border-b-indigo-500 '
                  type="text"
                  id="name"
                  ref={nameRef}
                  required
                />
              </label>
              <span className="error">{nameError}</span>
            </div>

            <div>
              <label htmlFor="Last_Name">
                <input
                  defaultValue={last_NameRef.value}
                  placeholder="Apellido"
                  className='p-3 m-1 w-60 bg-neutral-100 border-b-indigo-500 '
                  type="text"
                  id="last_Name"
                  ref={last_NameRef}
                  required
                />
              </label>
              <span className="error">{lastNameError}</span>
            </div>

            <div>
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
              <span className="error">{cityError}</span>
            </div>

            <div>
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
              <span className="error">{birthdateError}</span>
            </div>

            <div>
              <label htmlFor="image">
                <input 
                type="file" 
                id="image" 
                ref={imageRef} 
                onChange={e => setFile(e.target.files[0])}
               />
              </label>
            </div>

            <li>
              <ButtonForm
                funcion={handleSubmit}
                title="Send"
                url="http://localhost:8000/authors"
                show={show}
                setShow={setShow}
              />
            </li>
            <li>
              {alertType === "error" && <Alert handleRegisterSubmit={handleSubmit} />}
            </li>
          </ul>
        </form>
      </div>
    </main>
  );
};

export default AuthorForm;
