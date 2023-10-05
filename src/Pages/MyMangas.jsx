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
    <div className='flex flex-col items-center justify-center lg:flex-row flex-wrap '>
      
      <div className='manga-cards-container flex flex-wrap items-center justify-center lg:flex-row "'>
      <div className='w-full p-2 flex flex-col items-center justify-center '>
        <Link to="/manga-form">
          <button className='p-1 m-3 text-white font-bold ml-5  w-28 bg-pink-400 rounded-full'>New Manga</button>
        </Link>
        <img className='md:w-1/2' src="../../public/image/luffy.jpg" alt="" />
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
