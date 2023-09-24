import Swal from 'sweetalert2';
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import editChapterAccion from '../../redux/actions/editChapterAccion.js';
import deleteChapterAccion from '../../redux/actions/deleteChapterAccion.js';
import { useNavigate } from 'react-router-dom';

const EditChapter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.user_reduce);
  const [array, setArray] = useState([]);
  const [title, setTitle] = useState('');
  const [photo, setPhoto] = useState('../images/dbf359808a7c4589cdd2c99920e048c7.jpg');
  const [id, setId] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState(''); // Nuevo estado para el título seleccionado

  const chapterTitle = useRef();
  const chapterField = useRef();
  const chapterEditInfo = useRef();

  // Función para obtener los capítulos del manga
  const getManga = async () => {
    try {
      const mangaById = await axios.get('http://localhost:8000/chapters/me?manga_id=650d77d9ac832ff3f05d52b2', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const mangaChaptersArray = mangaById.data;
      setArray(mangaChaptersArray);
    } catch (error) {
      console.log(error);
    }
  };

  // Función para editar un capítulo
  const editManga = async (e) => {
    try {
      e.preventDefault();

      if (!id) {
        console.error('ID de capítulo no encontrado.');
        return;
      }

      // Muestra una alerta de confirmación antes de la edición
      const confirmEdit = await Swal.fire({
        title: '¿Estás seguro de editar este capítulo?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, editar',
        cancelButtonText: 'Cancelar',
      });

      if (!confirmEdit.isConfirmed) {
        return; // Si el usuario cancela, no realizar la edición
      }

      // Creando el objeto que se envía en las peticiones
      const selectedField = chapterField.current.value;
      const editedValue = chapterEditInfo.current.value;
      const data = {
        [selectedField]: editedValue,
      };

      // Dispatch de la acción para editar el capítulo a través de Redux
      try {
        await dispatch(editChapterAccion({ id, info: data, token }));
        Swal.fire({
          icon: 'success',
          title: '¡Edición exitosa!',
          text: 'El capítulo se ha editado correctamente.',
        });
      } catch (error) {
        console.error("Error al editar el capítulo:", error);
        // Maneja el error, por ejemplo, muestra un mensaje de error al usuario
        return;
      }

      // Llama a getManga para actualizar la lista de capítulos
      getManga();
    } catch (error) {
      console.error('Error en la solicitud PUT:', error);
    }
  };

  // Función para eliminar un capítulo
  const deleteManga = async (e) => {
    try {
      e.preventDefault();

      // Muestra una alerta de confirmación antes de la eliminación
      const confirmDelete = await Swal.fire({
        title: '¿Estás seguro de eliminar este capítulo?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
      });

      if (!confirmDelete.isConfirmed) {
        return;
      }

      // Dispatch de la acción para eliminar el capítulo usando Redux
      try {
        await dispatch(deleteChapterAccion({ id, token }));
        Swal.fire({
          icon: 'success',
          title: '¡Eliminación exitosa!',
          text: 'El capítulo se ha eliminado correctamente.',
        });
      } catch (error) {
        console.error("Error al eliminar el capítulo:", error);
        // Maneja el error, por ejemplo, muestra un mensaje de error al usuario
        return;
      }

      // Recarga los datos del manga después de la eliminación
      getManga();
    } catch (error) {
      console.error(error);
    }
  };

  // Función para manejar el cambio de título del capítulo
  const handleTitle = async (event) => {
    let titleValue = event.target.value;
    setSelectedTitle(titleValue); // Actualiza selectedTitle cuando cambia el valor del cuadro de selección

    const selectedChapter = array.find((chapter) => chapter.title === titleValue);
    if (selectedChapter) {
      setPhoto(selectedChapter.cover_photo);
      setId(selectedChapter._id);
    } else {
      setPhoto('');
      setId(null);
    }
  };

  // Carga los datos del manga al montar el componente
  useEffect(() => {
    getManga();
  }, []);

  return (
    <div className="h-screen bg-slate-100 flex flex-col justify-center pt-12 items-center md:flex-row">
      {user && (user.role === 1 || user.role === 2) ? ( // Protege la ruta comprobando el rol del usuario
        <>
          <form className="flex flex-col h-2/3 w-2/3 items-center">
            <label htmlFor="" className="text-2xl pb-5">
              Edit Chapter
            </label>
            <h1 className="border-b-2 border-neutral-400 bg-slate-100 text-center text-xs pt-5 w-full md:w-1/2">
              Alice in Borderland
            </h1>
            <select
              onChange={handleTitle}
              ref={chapterTitle}
              value={selectedTitle} // Utiliza selectedTitle como valor seleccionado
              className="border-b-2 border-neutral-400 bg-slate-100 text-xs pt-5 w-full md:w-1/2"
            >
              {array
                ? array.map((chapter) => (
                    <option key={chapter._id} value={chapter.title}>
                      {chapter.title}
                    </option>
                  ))
                : <option>Option 1</option>}
            </select>
            <select ref={chapterField} className="border-b-2 border-neutral-400 bg-slate-100 text-xs pt-5 w-full md:w-1/2">
              <option value="title">Title</option>
              <option value="cover_photo">Cover Photo</option>
              <option value="order">Order</option>
            </select>
            <input
              ref={chapterEditInfo}
              type="text"
              className="border-b-2 border-neutral-400 bg-slate-100 text-xs pt-5 w-full md:w-1/2"
              placeholder="data to edit"
            />
            <button onClick={editManga} className="bg-emerald-400 text-white font-semibold py-3 px-5 mt-10 rounded-full w-full md:w-1/2">
              Edit
            </button>
            <button onClick={deleteManga} className="text-rose-400 bg-red-100 font-semibold py-3 px-5 mt-5 rounded-full w-full md:w-1/2">
              Delete
            </button>
          </form>
          <div className="text-center max-md: hidden md:h-2/3 md:flex md:flex-col md:items-center md:w-1/2 md:me-10">
            <h1>Chapter: {selectedTitle}</h1> {/* Muestra el título seleccionado */}
            <img className="h-96 w-52" src={photo} alt="" />
          </div>
        </>
      ) : (
        navigate('/Index')
      )}
    </div>
  );
};

export default EditChapter;


/* import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import NavBar from '../layouts/NavBar';
import Index from './Index';
import Swal from 'sweetalert2';
import editChapterAction from '../redux/actions/editChapter.js';
import deleteChapterAction from '../redux/actions/deleteChapter.js';

const EditChapter = () => {
  const { user, token } = useSelector((store) => store.me_authorsReducer);

  const [chapter, setChapter] = useState([]);
  const [title, setTitle] = useState('');
  const [photo, setPhoto] = useState('');
  const [id, setId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  const chapterTitle = useRef();
  const chapterField = useRef();
  const chapterEditInfo = useRef();
  const dispatch = useDispatch();

  const getManga = async () => {
    try {
      let mangaById = await axios.get(
        'http://localhost:8080/chapters/me?manga_id=650b543262dd9dcc4488d8f0',
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      let mangaChaptersArray = mangaById.data;
      
      setChapter(mangaChaptersArray);
    } catch (error) {
      console.error(error);
    }
  };

  const editManga = async (e) => {
    try {
      e.preventDefault();

      const { value: confirmEdit } = await Swal.fire({
        title: '¿Estás seguro de editar este capítulo?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
      });

      if (!confirmEdit) {
        return;
      }

      const updatedChapter = {
        [chapterField.current.value]:
          chapterField.current.value === 'title'
            ? editTitle
            : chapterEditInfo.current.value,
      };

      // Actualiza el capítulo seleccionado en la base de datos a través de Redux
      try {
        await dispatch(editChapterAction({ id, info: updatedChapter, token }));
        Swal.fire({
          icon: 'success',
          title: '¡Edición exitosa!',
          text: 'El capítulo se ha editado correctamente.',
        });
      } catch (error) {
        console.error("Error al editar el capítulo:", error);
        // Maneja el error, por ejemplo, muestra un mensaje de error al usuario
        return;
      }

      // Recarga los datos del manga después de la edición
      getManga();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteManga = async (e) => {
    try {
      e.preventDefault();

      const { value: confirmDelete } = await Swal.fire({
        title: '¿Estás seguro de eliminar este capítulo?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'No, cancelar',
      });

      if (!confirmDelete) {
        return;
      }

      // Llama a la acción para eliminar el capítulo usando Redux
      try {
        await dispatch(deleteChapterAction({ id, token }));
        Swal.fire({
          icon: 'success',
          title: '¡Eliminación exitosa!',
          text: 'El capítulo se ha eliminado correctamente.',
        });
      } catch (error) {
        console.error("Error al eliminar el capítulo:", error);
        // Maneja el error, por ejemplo, muestra un mensaje de error al usuario
        return;
      }

      // Recarga los datos del manga después de la eliminación
      getManga();
    } catch (error) {
      console.error(error);
    }
  };

  const handleTitle = (event) => {
    const titleValue = event.target.value;
    setTitle(titleValue);

    const selectedChapter = chapter.find((ch) => ch.title === titleValue);
    if (selectedChapter) {
      setPhoto(selectedChapter.cover_photo);
      setId(selectedChapter._id);
    } else {
      setPhoto('');
      setId(null);
    }
  };

  useEffect(() => {
    getManga();
  }, []);

  return (
    <>
      <NavBar />
      {user.role === 1 || user.role === 2 ? (
        <div className="h-screen bg-slate-100 flex flex-col justify-center pt-12 items-center md:flex-row">
          <form className="flex flex-col h-2/3 w-2/3 items-center">
            <label htmlFor="" className="text-2xl pb-5">
              Edit Chapter
            </label>
            <h1 className="border-b-2 border-neutral-400 bg-slate-100 text-center text-xs pt-5 w-full md:w-1/2">
              Alice in Borderland
            </h1>
            <select
              onChange={handleTitle}
              ref={chapterTitle}
              className="border-b-2 border-neutral-400 bg-slate-100 text-xs pt-5 w-full md:w-1/2"
            >
              {chapter
                ? chapter.map((ch) => (
                    <option value={ch.title} key={ch._id}>
                      {ch.title}
                    </option>
                  ))
                : <option>Option 1</option>}
            </select>

            <select
              ref={chapterField}
              className="border-b-2 border-neutral-400 bg-slate-100 text-xs pt-5 w-full md:w-1/2"
            >
              <option value="title">Title</option>
              <option value="cover_photo">Cover photo</option>
              <option value="order">Order</option>
            </select>
            <input
              ref={chapterEditInfo}
              type="text"
              className="border-b-2 border-neutral-400 bg-slate-100 text-xs pt-5 w-full md:w-1/2"
              placeholder="data to edit"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />

            <button
              onClick={(e) => {
                e.preventDefault();
                editManga(e);
              }}
              className="bg-emerald-400 text-white font-semibold py-3 px-5 mt-10 rounded-full w-full md:w-1/2"
            >
              Edit
            </button>
            <button
              onClick={deleteManga}
              className="text-rose-400 bg-red-100 font-semibold py-3 px-5 mt-5 rounded-full w-full md:w-1/2"
            >
              Delete
            </button>
          </form>
          <div className="text-center max-md: hidden md:h-2/3 md:flex md:flex-col md:items-center md:w-1/2 md:me-10">
            <h1>Chapter: {title}</h1>
            <img className="h-96 w-52" src={photo} alt="" />
          </div>
        </div>
      ) : (
        <Index />
      )}
    </>
  );
};

export default EditChapter; */