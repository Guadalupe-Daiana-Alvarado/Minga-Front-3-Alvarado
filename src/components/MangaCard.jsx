import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import EditMangas from '../Pages/EditMangas';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../redux/actions/mangas';
let {mangaUpdate}= actions


function MangaCard({ manga, onEdit, onDelete }) {
  let dispatch = useDispatch()
  const title = useRef();
  const coverPhoto = useRef();
  const description = useRef();
  const userToken = localStorage.getItem("token");
  const headers = { headers: { "authorization": `Bearer ${userToken}` } };
  const [isOppen,setIsOppen] = useState(false)
  const navigate = useNavigate()
  const openModal = () => {setIsOppen(true)}
  const closeModal = () => { setIsOppen(false) }
  console.log(manga._id)
  const id = manga._id
  let mangas = useSelector(store=>store?.myMangas?.mangas)
  function handleEdit(e) {
    e.preventDefault();
    let data = {
      title: title.current.value,
      cover_photo: coverPhoto.current.value,
      description: description.current.value
    };
    dispatch(mangaUpdate({id ,data}))
  }
  useEffect(() => {
    // Tu componente se actualizará cada vez que la lista de mangas cambie en el estado Redux.
  }, [mangas]);
  
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2">
      <div className="border p-4 bg-white rounded-3xl shadow-md">
        <h3 className="text-xl font-semibold mb-2">{manga?.title}</h3>
        <div className="mb-4">
          <img
            src={manga?.cover_photo}
            alt=""
            className="w-full h-auto rounded-t-3xl"
            style={{ objectFit: 'contain' }}
          />
        </div>
        <p>{manga?.description}</p>
        <div className="mb-2">
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 mr-2 rounded" onClick={openModal}>
            
            Edit
          </button>{isOppen && (<div className="fixed inset-0 flex items-center justify-center z-50">
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
      </div> )}
          
          <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded" onClick={onDelete}>
            Delete
          </button>
        </div>
        <div className="mt-2">
          <Link to={`/manga/${manga._id}/chapter-form`} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 mr-2 rounded">
            +
          </Link>
          <Link to={`/edit/${manga.id}`} className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded">
            ✏️
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MangaCard;
