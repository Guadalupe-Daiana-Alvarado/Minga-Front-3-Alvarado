import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MangaCover from '../components/MangaCover.jsx';
import EmojisDataManga from '../components/EmojisDataManga.jsx';
import ButtonManga from '../components/ButtonManga.jsx';
import Content from '../components/Content.jsx';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../redux/actions/mangaDetail.js';

import ListComment from "../components/ListComment.jsx"

  const MangaDetail = () => {
    const {mangaData, chaptersData} = actions
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(0);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [showChapters, setShowChapters] = useState(false);
  const [chapters, setChapters] = useState([]);

  let manga = useSelector(store => store.manga.manga)
  let chaptersDataSelector = useSelector(store => store.chaptersMangaDetail.chapters)
  const dispatch = useDispatch()
  useEffect(() => {
  dispatch(mangaData({id}))
  }, [id]);
console.log(chapters)
console.log(chaptersDataSelector)
  useEffect(() => {

       dispatch(chaptersData({id, currentPage}))

         setHasPrevPage(chaptersDataSelector.prev);
         setHasNextPage(chaptersDataSelector.next);
         setChapters(chaptersDataSelector.chapters);



  }, [id, currentPage, showChapters]);

  return (
    <div className='bg-gray-200'>
      <MangaCover title={manga?.title} cover_photo={manga?.cover_photo} categories={manga?.category_id?.name} />
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
