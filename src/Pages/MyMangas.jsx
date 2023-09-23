import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import MangaCard from '../components/MangaCard';
import EditMangas from './EditMangas';
import actions from '../../redux/actions/mangas';
import { useDispatch, useSelector } from 'react-redux';





function MyMangasAuthor() {
  let {myMangas,mangaDelete} = actions

  const dispatch= useDispatch()
  let mangas = useSelector(store=>store?.myMangas?.mangas)
  useEffect(() => {
    if (mangas.length === 0) {

        dispatch(myMangas())
    }
}, [])


  
  const userToken = localStorage.getItem("token")
  console.log(mangas)
  const headers = { headers: { "authorization": `Bearer ${userToken}` } }
  
  const handleDelete = (mangaId) => {
    console.log("Manga ID", mangaId)

    if (window.confirm('¿Estás seguro de que quieres eliminar este manga?')) {
      dispatch(mangaDelete({id:mangaId}))
    }
  };

  return (
    <div className='flex flex-wrap'>
      <Link to="/manga-form">
        <button>+</button>
      </Link>
      {Array.isArray(mangas) && mangas.map((manga) => (
        <MangaCard
          key={manga._id}
          manga={manga}

          onDelete={() => handleDelete(manga._id)}
        />
      ))}
    </div>
  );
}

export default MyMangasAuthor;
