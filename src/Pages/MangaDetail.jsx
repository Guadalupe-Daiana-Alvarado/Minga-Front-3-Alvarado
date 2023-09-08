import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MangaCover from '../components/MangaCover.jsx';
import EmojisDataManga from '../components/EmojisDataManga.jsx';
import ButtonManga from '../components/ButtonManga.jsx';
import Content from '../components/Content.jsx';

const MangaDetail = () => {
  const { id } = useParams();
  const [manga, setManga] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [chapters, setChapters] = useState([]);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [showChapters, setShowChapters] = useState(false);
 
  useEffect(() => {
    axios.get(`http://localhost:8000/mangas/${id}`)
      .then((response) => {
        console.log(response);
        setManga(response.data);
      
      })
      .catch((error) => {
        console.error('Error al obtener los detalles del manga:', error);
      });
  }, [id]);

  
  useEffect(() => {
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
      <MangaCover title={manga?.title} cover_photo={manga?.cover_photo} categories={manga?.category_id.name} />
      <EmojisDataManga />
      <ButtonManga {...{ showChapters, setShowChapters }} />
      <Content
        {...{
          manga,
          chapters,
          hasPrevPage,
          hasNextPage,
          showChapters,
          onPageChange: setCurrentPage, // Pasa setCurrentPage como onPageChange
        }}
      />
    </div>
  );
};

export default MangaDetail;
