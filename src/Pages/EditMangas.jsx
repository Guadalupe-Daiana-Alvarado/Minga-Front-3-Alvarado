import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


function EditMangas({ id }) {
  const title = useRef();
  const coverPhoto = useRef();
  const description = useRef();
  const userToken = localStorage.getItem("token");
  const headers = { headers: { "authorization": `Bearer ${userToken}` } };
  const navigate = useNavigate()
  const closeModal = () => { setIsOppen(true) }


  function handleEdit(e) {
    e.preventDefault();
    let data = {
      title: title.current.value,
      cover_photo: coverPhoto.current.value,
      description: description.current.value
    };

    axios.put('http://localhost:8000/mangas/' + id, data, headers)
      .then((response) => {

        // Realiza acciones necesarias después de la solicitud PUT
        console.log("Solicitud PUT exitosa", response);
        navigate("/MyMangas")
      })
      .catch((error) => {
        console.error("Error en la solicitud PUT", error);
      });
  }

  return (
    <>
      {/* Botón para abrir el modal */}

      {/* El modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="modal-overlay fixed inset-0 bg-gray-500 opacity-75"></div>

        <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
          {/* Contenido del modal */}
          <div className="modal-content py-4 text-left px-6">
            {/* Título del modal */}
            <div className="flex justify-between items-center pb-3">
              <p className="text-2xl font-bold">Formulario</p>
              <button

                className="modal-close cursor-pointer z-50"
              >
                
                  <svg
                  onClick={closeModal}
                  className="fill-current text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                >
                  <path
                    d="M1 1l16 16M17 1L1 17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

              </button>
            </div>

            {/* Contenido del formulario */}
            <form >
              {/* Aquí puedes agregar tus campos de formulario */}
              <div className="mb-4">

                <input
                  ref={title}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Title"
                />
                <input
                  ref={coverPhoto}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Cover Photo"
                />

                <input
                  ref={description}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Description"
                />
              </div>


            </form>

            {/* Botones del modal */}
            <div className="flex justify-end pt-2">
              <button

                className="px-4 bg-gray-300 p-3 rounded-lg text-black hover:bg-gray-400"
              >
                Cerrar
              </button>
              <button onClick={handleEdit} className="px-4 bg-blue-500 p-3 ml-3 rounded-lg text-white hover:bg-blue-400">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>


    </>

  );
}

export default EditMangas;
