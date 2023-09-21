import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ButtonForm from '../components/ButtonForm';
import Alert from '../components/Alert';
import { useDispatch, useSelector } from 'react-redux';
import setManga from '../../redux/actions/manga.js';


const MangaForm = () => {
  const [show, setShow] = useState(false);
  const [alertType, setAlertType] = useState(null);
  const [message, setAlertMessage] = useState('');
  const [categories, setCategories] = useState([]);
  const dispatchMangaForm = useDispatch();
  const newMangasForm = useSelector((store) => store.mangasNew.manga)
  
  const [formData, setFormData] = useState({
    title: '',
    cover_photo: '',
    description: '',
    category_id: '',
  });

  useEffect(() => {
    axios.get('http://localhost:8000/categories')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener categorías:', error);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authToken = localStorage.getItem("token");

    if (!authToken) {
      console.error("Token de autorización no encontrado");
      return;
    }

    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      };

      
      
      const { data } = await axios.post('http://localhost:8000/mangas', formData, config);
      dispatchMangaForm(setManga({manga:data.manga}))
      console.log(dispatchMangaForm)
     
      setAlertType('success');
      setAlertMessage('Manga creado exitosamente');
      setShow(true);
    } catch (error) {
      
      setAlertType('error');
      setAlertMessage('Error al crear el manga');
      setShow(true);
    }
  };

  return (
    <main className="w-full h-3/4 bg-no-repeat bg-cover flex flex-col justify-around" style={{ backgroundImage: "url('./image/backgroundMain.png')" }}>
      {}
      <div className="bg-neutral-100 w-full min-h-full flex flex-col items-center">
        <form className="w-11/12 min-h-3/4 flex flex-col items-center" id="manga-form">
          <ul>
            <div>
              <label htmlFor="title">
                <input
                  placeholder="Título"
                  className="p-3 m-1 w-60 bg-neutral-100 border-b-indigo-500"
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <div>
              <label htmlFor="cover_photo">
                <input
                  placeholder="URL de la portada"
                  className="p-3 m-1 w-60 bg-neutral-100 border-b-indigo-500"
                  type="url"
                  id="cover_photo"
                  name="cover_photo"
                  value={formData.cover_photo}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <div>
              <label htmlFor="description">
                <textarea
                  placeholder="Descripción"
                  className="p-3 m-1 w-60 bg-neutral-100 border-b-indigo-500"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <div>
              <label htmlFor="category_id">
                <select
                  className="p-3 m-1 w-60 bg-neutral-100 border-b-indigo-500"
                  id="category_id"
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Selecciona una categoría
                  </option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <li>
              <ButtonForm
                funcion={handleSubmit}
                title="Enviar"
                url="http://localhost:8000/mangas"
                show={show}
                setShow={setShow}
              />
            </li>
          </ul>
        </form>
        {show && <Alert  show={show} message={message} type={alertType} setShow={setShow} />}
      </div>
    </main>
  );
};

export default MangaForm;
