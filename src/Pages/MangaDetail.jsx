import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MangaCover from '../components/MangaCover.jsx';
import EmojisDataManga from '../components/EmojisDataManga.jsx';
import ButtonManga from '../components/ButtonManga.jsx';
import Content from '../components/Content.jsx'
const MangaDetail = () => {
  // Obtiene el valor del parámetro :id de la URL
  const { id } = useParams();

  // Define estados para el manga, capítulos y paginación
  const [manga, setManga] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [chapters, setChapters] = useState([]);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [showChapters, setShowChapters] = useState(false);
  // Efecto para cargar los detalles del manga
  useEffect(() => {
    // Hacer una solicitud para obtener los detalles del manga
    axios.get(`http://localhost:8000/mangas/${id}`)
      .then((response) => {
        console.log(response);
        setManga(response.data);
      
      })
      .catch((error) => {
        console.error('Error al obtener los detalles del manga:', error);
      });
  }, [id]);

  // Efecto para cargar los capítulos paginados
  useEffect(() => {
    // Hacer una solicitud para obtener los capítulos paginados
   axios.get(`http://localhost:8000/chapters/?manga_id=${id}&page=${currentPage}`)
      .then((response) => {
        setChapters(response.data.chapters);
        setHasPrevPage(response.data.prev);
        setHasNextPage(response.data.next);
       
      })
      .catch((error) => {
        console.error('Error al obtener los capítulos:', error);
      });
  }, [id, currentPage, showChapters]);

  return (
    <div className='bg-gray-200'>
      {/* Muestra la portada del manga */}
      <MangaCover title={manga?.title} cover_photo={manga?.cover_photo} categories={manga?.category_id.name} />

      {/* Muestra los emojis y datos del manga */}
      <EmojisDataManga />

      {/* Muestra los botones para alternar entre Manga y Capítulos */}
      <ButtonManga {...{showChapters, setShowChapters}} />
      <Content {...{manga, chapters, hasPrevPage, hasNextPage, showChapters}}/>
        </div>
  );
};

export default MangaDetail;


// import React, { useState } from 'react';
// import MangaCover from '../components/MangaCover.jsx';
// import EmojisDataManga from '../components/EmojisDataManga.jsx';
// import ButtonManga from '../components/ButtonManga.jsx';

// const MangaDetail = () => {
//     return (
//         <div className='bg-gray-200'>
//            <MangaCover/>
//            <EmojisDataManga/>
//            <ButtonManga/>
//         </div>
//     );
// }

// export default MangaDetail





