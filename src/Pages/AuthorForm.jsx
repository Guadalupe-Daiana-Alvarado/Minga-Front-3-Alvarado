import React, { useState, useRef } from 'react';
import ButtonForm from '../components/ButtonForm.jsx';
import Alert from '../components/Alert.jsx';
import { ref } from 'firebase/storage';
import { isMobile } from 'react-device-detect'; 
import { firebaseApp, storage } from '../../fireBase/firebase.js';
import { uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import axios from 'axios';
import Swal from 'sweetalert2';

const AuthorForm = () => {
  const nameRef = useRef("Lucas Ezequiel");
  const last_NameRef = useRef("Silva");
  const cityRef = useRef("Buenos Aires, Argentina");
  const birthdateRef = useRef("2023-12-28");
  const imageRef = useRef(null);

  const [show, setShow] = useState(false);
  const [alertType, setAlertType] = useState(null);

  const [nameError, setNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [cityError, setCityError] = useState("");
  const [birthdateError, setBirthdateError] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nameRef.current.value) {
      setNameError("El campo Nombre es requerido");
      return;
    } else {
      setNameError("");
    }

    if (!last_NameRef.current.value) {
      setLastNameError("El campo Apellido es requerido");
      return;
    } else {
      setLastNameError("");
    }

    if (!cityRef.current.value) {
      setCityError("El campo Ciudad, País es requerido");
      return;
    } else {
      setCityError("");
    }

    if (!birthdateRef.current.value) {
      setBirthdateError("El campo Fecha de nacimiento es requerido");
      return;
    } else {
      setBirthdateError("");
    }

    const cityCountryValue = cityRef.current.value;
    const [city, country] = cityCountryValue.split(',').map((item) => item.trim());

    const formData = {
      name: nameRef.current.value,
      last_name: last_NameRef.current.value,
      city: city,
      country: country,
      date: birthdateRef.current.value,
      photo: '', //Inicia vacio porque despues se reasigna con la url
    };

    const miStorage = localStorage.getItem("token");
    const authToken = 'Bearer ' + miStorage;

    const config = {
      headers: {
        'Authorization': authToken,
      },
    };

    const metadata = {
      contentType: 'image/jpeg'
    };

    if (file) {
      // Crear una referencia a la ubicación donde deseas almacenar el archivo
      const storageRef = ref(storage, `images/${file.name}`);
      try {
        // Subir un archivo al almacenamiento
        await uploadBytesResumable(storageRef, file, metadata);
        // Descargo el archivo del almacenamiento storage
        const downloadURL = await getDownloadURL(storageRef);

        //Asignar el valor de la Url a la photo para que coincida con el schema de validacion
        formData.photo = downloadURL;
        console.log('URL de descarga de la imagen:', downloadURL);
      } catch (error) {
        console.error('Error al cargar la imagen en Firebase Storage:', error);
       // return;
      }
    }

    try {
      const { data } = await axios.post('http://localhost:8000/authors', formData, config);

      Swal.fire({
        icon: 'success',
        title: 'Autor creado con éxito',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error('Error:', error);

      Swal.fire({
        icon: 'error',
        title: 'Error al crear el autor',
        text: 'Ha ocurrido un error al enviar los datos al servidor.',
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  return (
    
    <main className='w-full h-3/4 bg-no-repeat bg-cover flex flex-col justify-around' style={{ backgroundImage: "url('./image/backgroundMain.png')" }}>
      <div className='bg-neutral-100 w-full h-1/2 p-5 flex flex-col items-center'>
        <h2 className='p-5  bg-white text-bold'>Nuevo Autor</h2>
      </div>

      <div className='bg-neutral-100 w-full min-h-full flex flex-col items-center'>
        <form className='w-11/12 min-h-3/4 flex flex-col items-center' id="fileUploadForm" onSubmit={handleSubmit}>
          <ul>
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
              <label htmlFor="last_Name">
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

            {isMobile ? (
              <div>
                <label htmlFor="image">
                  Ingrese la URL de la imagen:
                  <input
                    type="text"
                    id="imageUrlInput"
                    onChange={(e) => setFile(e.target.value)}
                    required
                  />
                </label>
              </div>
            ) : (
              <div>
                <label htmlFor="image">
                  Subir imagen:
                  <input
                    ref={imageRef}
                    type="file"
                    id="fileInput"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            )}

            <li>
              <ButtonForm
                funcion={handleSubmit}
                title="Enviar"
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
