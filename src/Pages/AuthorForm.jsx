// AuthorForm.jsx
import img from '../../public/image/Frame 50.png'
import React, { useState, useRef } from 'react';
import ButtonForm from '../components/ButtonForm';
import Alert from '../components/Alert';
import axios from 'axios';

const AuthorForm = () => {
  const nameRef = useRef("Lucas Ezequiel");
  const last_NameRef = useRef("Silva");
  const cityRef = useRef("Buenos Aires, Argentina");
  const birthdateRef = useRef("2023-12-28");
  const imageUrlRef = useRef("https://conceptodefinicion.de/wp-content/uploads/2016/01/Perfil2.jpg");

  const [show, setShow] = useState(false);
  const [alertType, setAlertType] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");

  // Estados para controlar los mensajes de error
  const [nameError, setNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [cityError, setCityError] = useState("");
  const [birthdateError, setBirthdateError] = useState("");
  const [imageUrlError, setImageUrlError] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validar campos antes de enviar la solicitud
    let isValid = true;

    if (!nameRef.current.value) {
      setNameError("Name is required");
      isValid = false;
    } else {
      setNameError("");
    }

    if (!last_NameRef.current.value) {
      setLastNameError("Last Name is required");
      isValid = false;
    } else {
      setLastNameError("");
    }

    if (!cityRef.current.value) {
      setCityError("City and Country are required");
      isValid = false;
    } else {
      setCityError("");
    }

    if (!birthdateRef.current.value) {
      setBirthdateError("Date of birth is required");
      isValid = false;
    } else {
      setBirthdateError("");
    }

    if (!imageUrlRef.current.value) {
      setImageUrlError("Image URL is required");
      isValid = false;
    } else {
      setImageUrlError("");
    }

    if (isValid) {
      try {
        const cityCountryValue = cityRef.current.value;
        const [city, country ] = cityCountryValue.split(',').map((item) => item.trim());

        const formData = {
          name: nameRef.current.value,
          last_name: last_NameRef.current.value,
          city: city,
          country: country,
          date: birthdateRef.current.value,
          photo: imageUrlRef.current.value,
        };

        const miStorage = localStorage.getItem("token"); // Recupera el token de localStorage
        const authToken = 'Bearer ' + miStorage; // Utiliza el token recuperado

        const config = {
          headers: {
            'Authorization': authToken,
          },
        };
        
        // Realiza la solicitud POST con Axios incluyendo el encabezado de autorización
        const { data } = await axios.post('http://localhost:8000/authors', formData, config);

        // Mostrar alerta de éxito
        setAlertType("success");
        setAlertMessage("Its author was successfully created");
        setShow(true);
      } catch (error) {    
        if (error.response) {
        // La respuesta del servidor contiene detalles del error
        console.error('Error de respuesta:', error.response.data);
      } else if (error.request) {
        // La solicitud se hizo pero no se recibió una respuesta
        console.error('Error de solicitud:', error.request);
      } else {
        // Ocurrió un error durante la configuración de la solicitud
        console.error('Error de configuración de solicitud:', error.message); 
        setShow(false);
      }
       // Mostrar alerta de error
       setAlertType("error");
       setAlertMessage("You do not have the required permissionss");
       setShow(true);
      }
    }
  };
  
  return (
    <main className='w-full h-3/4 bg-no-repeat bg-cover flex flex-col justify-around' style={{ backgroundImage: "url('./image/backgroundMain.png')" }}>
      <div className='bg-neutral-100 w-full h-1/2 p-5 flex flex-col items-center'>
        <h2 className='p-5  bg-white text-bold'>Nuevo Autor</h2>
        <img src={img} alt="" />
      </div>

      <div className='bg-neutral-100 w-full min-h-full flex flex-col items-center'>
        <form className='w-11/12 min-h-3/4 flex flex-col items-center' id="signup">
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
              /></label>
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
              /></label>
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
              /></label>
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
              /></label>
              <span className="error">{birthdateError}</span>
            </div>

            <div>
              <label htmlFor="image">
              <input
                defaultValue={imageUrlRef.value}
                placeholder="URL de la imagen"
                className='p-3 m-1 w-60 bg-neutral-100 border-b-indigo-500 '
                type="url"
                id="imageUrl"
                ref={imageUrlRef}
                required
              /></label>
              <span className="error">{imageUrlError}</span>
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
            {alertType === "error" && <Alert message={message} data={data} setShow={setShow} />}

            </li>
          </ul>
        </form>
        {/*show && <Alert message={alertMessage} type={alertType} />*/} 
      </div>
    </main>
  );
};

export default AuthorForm; 