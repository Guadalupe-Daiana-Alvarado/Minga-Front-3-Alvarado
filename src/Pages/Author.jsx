import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authorData, fetchAuthors } from '../../redux/actions/me_authors.js';
import mangasData from '../../redux/actions/manga_news.js';
import actions from '../../redux/actions/mangas.js';

const Author = () => {
  const [showNewMangas, setShowNewMangas] = useState(true);
  const profile = useSelector((store) => store.author_reduce.profile);
  const mangasNews = useSelector((store) => store.myMangas.mangas);
  const dispatch = useDispatch();

  function getDataAuthor() {
    axios("http://localhost:8000/authors/me")
      .then((res) => {
        dispatch(authorData({ info: res.data.author }));
        console.log("Respuesta del autor", res.data.author);
      })
      .catch((error) => console.log(error));
  }

  function getDataMangas() {
    let { myMangas, mangaDelete } = actions;

    axios("http://localhost:8000/mangas/me")
      .then((res) => {
        console.log(res);
        dispatch(myMangas({ info_mangas: res.data.mangas }));
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    dispatch(fetchAuthors()); // Despacha la acción para obtener datos del autor
    getDataMangas();
    getDataAuthor();
  }, [dispatch]);

  const toggleMangas = (showNew) => {
    setShowNewMangas(showNew);
  };

  return (
    <>
      <div className='flex justify-center items-center mt-8 md:justify-start md:h-60 md:flex-col lg:mb-12'>
        <div className='flex flex-col justify-center items-center'>
          <img src={profile?.photo} className="w-20 h-12 lg:w-36 lg:h-28 rounded-full" alt='' />
        </div>
        <div className='w-72 h-12 mx-4'>
          <h3 className='text-md lg:text-xl'>
            {profile?.name} {profile?.last_name}
          </h3>
          <h5 className='text-sm lg:text-lg'>
            {profile?.city}, {profile?.country}
          </h5>
        </div>
        <div>
          <img className='w-12 h-10 lg:h-10 lg:mt-4' src='../../public/image/pencil-alt.png' alt='' />
        </div>
      </div>

      <div className='flex flex-wrap justify-center items-center gap-4'>
        {Array.isArray(mangasNews) && (
          mangasNews.length === 0 ? (
            <img src='../../public/image/Logo (1).png' alt='' />
          ) : showNewMangas ? (
            mangasNews.slice(0, 4).map((manga) => (
              <div key={manga._id}>
                <Link to={`/mangas/${manga._id}`} className='hover:opacity-80 focus:opacity-80'>
                  <img className='w-52 lg:w-60 rounded-md' src={manga?.cover_photo} alt='' />
                </Link>
                <h1>{manga?.title}</h1>
              </div>
            ))
          ) : (
            mangasNews.slice(4, 8).map((manga) => (
              <div key={manga._id}>
                <Link to={`/mangas/${manga._id}`} className='hover:opacity-80 focus:opacity-80'>
                  <img className='w-52 h-60 lg:w-52 rounded-lg' src={manga?.cover_photo} alt='' />
                </Link>
                <h1>{manga?.title}</h1>
              </div>
            ))
          )
        )}
      </div>

      {Array.isArray(mangasNews) && mangasNews.length >= 8 && (
        <div className='flex mt-12 justify-center items-center'>
          <button
            className={`${showNewMangas
              ? 'bg-pink-400 text-white'
              : 'bg-white text-black'
              } h-8 w-20 rounded-md hover:bg-pink-300`}
            onClick={() => toggleMangas(true)}
          >
            New
          </button>
          <button
            className={`${showNewMangas
              ? 'bg-white text-black'
              : 'bg-pink-400 text-white'
              } h-8 w-20 rounded-md hover:bg-pink-300`}
            onClick={() => toggleMangas(false)}
          >
            Old
          </button>
        </div>
      )}

      <button className='text-lg text-white rounded-xl h-10 w-32 cursor-pointer bg-pink-400 mt-4'>
        Manage!
      </button>
    </>
  );
};

export default Author;
