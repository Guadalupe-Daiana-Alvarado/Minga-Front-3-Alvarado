import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import editChapterAccion from '../../redux/actions/editChapterAccion.js';
import deleteChapterAccion from '../../redux/actions/deleteChapterAccion.js';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { uploadFile } from '../../fireBase/firebase.js';
import { useParams } from 'react-router-dom';


const EditChapter = () => {
  const {manga_id} = useParams()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.user_reduce);
  const [array, setArray] = useState([]);
  const [photo, setPhoto] = useState('../images/dbf359808a7c4589cdd2c99920e048c7.jpg');
  const [id, setId] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedField, setSelectedField] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const chapterTitle = useRef();
  const chapterField = useRef();
  const chapterEditInfo = useRef();
  const fileInputRef = useRef(); // Referencia al input de tipo archivo

  const getManga = async () => {
    try {
      const mangaById = await axios.get(`http://localhost:8000/mangas/${manga_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const mangaChaptersArray = mangaById.data;
      console.log(mangaById.data) 
      //setArray(mangaChaptersArray);
    } catch (error) {
      console.log(error);
    }
  };

  const editManga = async (e) => {
    try {
      e.preventDefault();

      const confirmEdit = await Swal.fire({
        title: '¿Are you sure about editing this chapter?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, edita',
        cancelButtonText: 'Cancel',
      });

      if (!confirmEdit.isConfirmed) {
        return;
      }

      const editedValue = chapterEditInfo.current.value;
      const data = {
        [selectedField]: selectedField === 'cover_photo' ? selectedImage || '' : editedValue,
      };

      try {
        await dispatch(editChapterAccion({ id, info: data, token }));
        Swal.fire({
          icon: 'success',
          title: 'Successful edition!',
          text: 'The chapter has been edited successfully.',
        });
      } catch (error) {
        console.error("Error editing chapter:", error);
        return;
      }

      getManga();
    } catch (error) {
      console.error('PUT request failed:', error);
    }
  };

  const deleteManga = async (e) => {
    try {
      e.preventDefault();

      const confirmDelete = await Swal.fire({
        title: 'Are you sure to delete this chapter?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete',
        cancelButtonText: 'Cancel',
      });

      if (!confirmDelete.isConfirmed) {
        return;
      }

      try {
        await dispatch(deleteChapterAccion({ id, token }));
        Swal.fire({
          icon: 'success',
          title: 'Successful removal!',
          text: 'The chapter has been successfully deleted.',
        });
      } catch (error) {
        console.error("Error deleting chapter:", error);
        return;
      }

      getManga();
    } catch (error) {
      console.error(error);
    }
  };

  const handleTitle = async (event) => {
    let titleValue = event.target.value;
    setSelectedTitle(titleValue);

    const selectedChapter = array.find((chapter) => chapter.title === titleValue);
    if (selectedChapter) {
      setPhoto(selectedChapter.cover_photo);
      setId(selectedChapter._id);
    } else {
      setPhoto('');
      setId(null);
    }
  };

  const handleFieldChange = async (event) => {
    setSelectedField(event.target.value);
  };

  const handleImageChange = async (selectedFile) => {
    try {
      if (!selectedFile) {
        // El usuario canceló la selección de la imagen
        return;
      }

      const imageUrl = await uploadFile(selectedFile, 'chapters/'); // Sube la imagen seleccionada
      setSelectedImage(imageUrl);
      console.log(imageUrl);

      console.log('Imagen cargada con éxito:', imageUrl);
    } catch (error) {
      console.error('Error al cargar la imagen:', error);
    }
  };

  useEffect(() => {
    getManga();
  }, []);

  return (
    <div className="h-screen bg-slate-100 flex flex-col justify-center pt-12 items-center md:flex-row">
      {user && (user.role === 1 || user.role === 2) ? (
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
              value={selectedTitle}
              className="border-b-2 border-neutral-400 bg-slate-100 text-xs pt-5 w-full md:w-1/2"
            >
              {array ? (
                array?.map((chapter) => (
                  <option key={chapter._id} value={chapter.title}>
                    {chapter.title}
                  </option>
                ))
              ) : (
                <option>Option 1</option>
              )}
            </select>
            <select
              onChange={handleFieldChange}
              ref={chapterField}
              value={selectedField}
              className="border-b-2 border-neutral-400 bg-slate-100 text-xs pt-5 w-full md:w-1/2"
            >
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
            {selectedField === 'cover_photo' ? ( // Ternario para mostrar el input de archivo solo cuando se selecciona 'cover_photo'
              <div>
                <label htmlFor="file">
                  Upload Cover Photo:
                  <input
                    type="file"
                    id="file"
                    name="file"
                    onChange={(e) => handleImageChange(e.target.files[0])} // Maneja el cambio del archivo
                    accept="image/*"
                    ref={fileInputRef} // Referencia al input de archivo
                  />
                </label>
              </div>
            ) : (
              <div>
                {/* Otros campos aquí */}
              </div>
            )}
            <button
              onClick={editManga}
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
            <h1>Chapter: {selectedTitle}</h1>
            <img className="h-96 w-52" src={photo} alt="" />
          </div>
        </>
      ) : (
        navigate('/')
      )}
    </div>
  );
};

export default EditChapter;
