import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import MangaCard from '../components/MangaCard';
import EditMangas from './EditMangas';
import actions from '../../redux/actions/mangas';
import { useDispatch, useSelector } from 'react-redux';





function MyMangasAuthor() {
  let { myMangas, mangaDelete } = actions

  const dispatch = useDispatch()
  let mangas = useSelector(store => store?.myMangas?.mangas)
  useEffect(() => {
    if (mangas.length === 0) {

      dispatch(myMangas())
    }
  }, [])



  const userToken = localStorage.getItem("token")

  const headers = { headers: { "authorization": `Bearer ${userToken}` } }

  const handleDelete = (mangaId) => {
    
    if (window.confirm('¿Estás seguro de que quieres eliminar este manga?')) {
      dispatch(mangaDelete({ id: mangaId }))
    }
  };

  return (
    <div className=''>
      
      <div className='manga-cards-container flex flex-col items-center lg:flex-row flex-wrap"'>
      <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2'>
        <Link to="/manga-form">+</Link>
        <img src="../../public/image/luffy.jpg" alt="" />
      </div>
      
        {Array.isArray(mangas) && mangas.map((manga) => (
          <MangaCard
            key={manga._id}
            manga={manga}

            onDelete={() => handleDelete(manga._id)}
          />
        ))}
      </div>

    </div>
  );
}

export default MyMangasAuthor;
