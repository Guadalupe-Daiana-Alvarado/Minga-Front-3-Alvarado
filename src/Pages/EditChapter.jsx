import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2'; // Importa SweetAlert2

const EditChapter = () => {
  const user = localStorage.getItem('user');
  const miStorage = localStorage.getItem('token'); // Recupera el token de localStorage
  const authToken = 'Bearer ' + miStorage; // Utiliza el token recuperado

  const dispatch = useDispatch();
  const [array, setArray] = useState([]);
  const [title, setTitle] = useState('');
  const [photo, setPhoto] = useState('../images/dbf359808a7c4589cdd2c99920e048c7.jpg');
  const [id, setId] = useState(null);

  const chapterTitle = useRef();
  const chapterField = useRef();
  const chapterEditInfo = useRef();

  const getManga = async () => {
    try {
      const mangaById = await axios.get('http://localhost:8000/chapters/me?manga_id=650d77d9ac832ff3f05d52b2', {
        headers: {
          Authorization: authToken,
        },
      });

      const mangaChaptersArray = mangaById.data;

      if (Array.isArray(mangaChaptersArray)) {
        setArray(mangaChaptersArray);
      } else {
        // Manejar el caso en que mangaChaptersArray no es un array válido
        console.error('mangaChaptersArray no es un array válido:', mangaChaptersArray);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editManga = async (e) => {
    try {
      e.preventDefault();

      if (!id) {
        console.error('ID de capítulo no encontrado.');
        return;
      }

      const selectedField = chapterField.current.value;
      const editedValue = chapterEditInfo.current.value;

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

      let data = {
        [selectedField]: editedValue,
      };

      const response = await axios.put(`http://localhost:8000/chapters/${id}?manga_id=650d77d9ac832ff3f05d52b2`, data, {
        headers: {
          Authorization: authToken,
        },
      });

      if (response) {
        console.log('Capítulo actualizado exitosamente.');
        // Llamar a getManga para actualizar la lista de capítulos
        getManga();
      } else {
        console.error('Error al actualizar el capítulo:', response.data.message);
      }
    } catch (error) {
      console.error('Error en la solicitud PUT:', error);
    }
  };

  const handleTitle = async (event) => {
    let titleValue = event.target.value;
    setTitle(titleValue);

    const selectedChapter = array.find((chapter) => chapter.title === titleValue);
    if (selectedChapter) {
      setPhoto(selectedChapter.cover_photo);
      setId(selectedChapter._id);
    } else {
      setPhoto('');
      setId(null);
    }
  };

  const deleteManga = async (e) => {
    try {
      e.preventDefault();

      // Verifica si existe un título seleccionado
      if (!title) {
        console.error('Título no encontrado.');
        return;
      }

      // Muestra una alerta de confirmación antes de la eliminación
      const confirmDelete = await Swal.fire({
        title: '¿Estás seguro de eliminar este capítulo?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
      });

      if (!confirmDelete.isConfirmed) {
        return; // Si el usuario cancela, no realizar la eliminación
      }

      // Realiza la solicitud DELETE al servidor para eliminar el capítulo de la base de datos
      const response = await axios.delete(`http://localhost:8000/chapters/${id}?manga_id=650d77d9ac832ff3f05d52b2`, {
        headers: {
          Authorization: authToken,
        },
      });

      // Verifica la respuesta del servidor para manejar errores o confirmación de éxito
      if (response.status === 200) {
        console.log('Capítulo eliminado de la base de datos.');
        // Actualiza la interfaz de usuario eliminando el capítulo de la lista
        const updatedArray = array.filter((chapter) => chapter.title !== title);
        setArray(updatedArray);
      } else {
        console.error('Error al eliminar el capítulo de la base de datos.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getManga();
  }, []);

  return (
    <div className="h-screen bg-slate-100 flex flex-col justify-center pt-12 items-center md:flex-row">
      <form className="flex flex-col h-2/3 w-2/3 items-center">
        <label htmlFor="" className="text-2xl pb-5">
          Edit Chapter
        </label>
        <h1 className="border-b-2 border-neutral-400 bg-slate-100 text-center text-xs pt-5 w-full md:w-1/2">
          Alice in Borderland
        </h1>
        <select onChange={handleTitle} ref={chapterTitle} className="border-b-2 border-neutral-400 bg-slate-100 text-xs pt-5 w-full md:w-1/2">
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
        <h1>Chapter: {title}</h1>
        <img className="h-96 w-52" src={photo} alt="" />
      </div>
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
import editChapter from '../redux/actions/editChapter.js';
import deleteChapter from "../redux/actions/deleteChapter" 

const EditChapter = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((store) => store.me_authorsReducer);
  const chapters = useSelector((store) => store.chapterReducer.chapters);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  const chapterTitle = useRef();
  const chapterField = useRef();
  const chapterEditInfo = useRef();

  const getManga = async () => {
    try {
      let mangaById = await axios.get(
        'http://localhost:8000/chapters/me?manga_id=650d77d9ac832ff3f05d52b2',
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      let mangaChaptersArray = mangaById.data;
      // Actualiza el estado global con los capítulos
      // (Puedes almacenar los capítulos en el estado global al cargar la página)
      // dispatch(setChaptersAction(mangaChaptersArray));
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

      // Llama a la acción de edición
      dispatch(editChapter(selectedChapter.id, updatedChapter));

      // Actualiza el estado local del capítulo editado
      setSelectedChapter({ ...selectedChapter, ...updatedChapter });
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

      // Llama a la acción de eliminación
      dispatch(deleteChapter(selectedChapter.id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleTitleChange = (event) => {
    const titleValue = event.target.value;
    const selected = chapters.find((chapter) => chapter.title === titleValue);
    
    setSelectedChapter(selected); // Actualiza el estado local del capítulo seleccionado

    if (selected) {
      setEditTitle(selected[chapterField.current.value] || '');
    } else {
      setEditTitle('');
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
              onChange={handleTitleChange}
              ref={chapterTitle}
              className="border-b-2 border-neutral-400 bg-slate-100 text-xs pt-5 w-full md:w-1/2"
            >
              {chapters
                ? chapters.map((chapter) => (
                    <option value={chapter.title} key={chapter.id}>
                      {chapter.title}
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
            <h1>Chapter: {selectedChapter?.title || ''}</h1>
            <img className="h-96 w-52" src={selectedChapter?.cover_photo || ''} alt="" />
          </div>
        </div>
      ) : (
        <Index />
      )}
    </>
  );
};

export default EditChapter; */



/* import React from 'react'
import { useSelector } from 'react-redux'
import Index from './Index'


const EditChapter = () => {
    const user = useSelector((store)=>store.profile.user)
    console.log(user)
    return (<>
        {user.role === 1 || user.role === 2? (<div className='h-screen bg-slate-100 flex flex-col justify-center pt-12 items-center md:flex-row'>
            <form action="" className='flex flex-col h-2/3 w-2/3 items-center'>
                <label htmlFor="" className='text-2xl pb-5'>Edit Chapter</label>
                <h1 className='border-b-2 border-neutral-400 bg-slate-100 text-center text-xs pt-5 w-full md:w-1/2'>Title of the manga</h1>
                <select className='border-b-2 border-neutral-400 bg-slate-100 text-xs pt-5 w-full md:w-1/2'>

                    <option>Option 1 </option>  {/*Aca probablemente haya que hacer un mapeo dinamico de los caps

                    <option>Option 2 </option>

                    <option>Option 3 </option>

                </select>
                <select className='border-b-2 border-neutral-400 bg-slate-100 text-xs pt-5 w-full md:w-1/2'>

                    <option>Title</option>

                    <option>Cover photo</option>

                    <option>Pages</option>

                    <option>Order</option>

                </select>
                <input type="text" className='border-b-2 border-neutral-400 bg-slate-100 text-xs pt-5 w-full md:w-1/2' placeholder='  data to edit' />
                <button onClick={(e) => {
                    e.preventDefault();
                    handleForm();
                }}
                    className='bg-emerald-400 text-white font-semibold py-3 px-5 mt-10 rounded-full w-full md:w-1/2'>Edit</button>
                <button onClick={(e) => {
                    e.preventDefault();
                    handleForm();
                }}
                    className='text-rose-400 bg-red-100 font-semibold py-3 px-5 mt-5 rounded-full w-full md:w-1/2'>Delete</button>
            </form>
            <div className='text-center max-md: hidden md:h-2/3 md:flex md:flex-col md:items-center md:w-1/2 md:me-10'>
                <h1>Chapter X: Titulo del capitulo</h1>
                <img className='h-96 w-52' src="../images/dbf359808a7c4589cdd2c99920e048c7.jpg" alt="" />
            </div>
            {{show && <Alert show={show} message={message} data={dataResponse} setShow={setShow} />/}
        </div>) : (<Index/>)}
        </>)
}

export default EditChapter*/

/*  */