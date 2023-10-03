import React from 'react'
import { useState } from 'react';
import ListComment from "./ListComment"

const MangaCover = (props) => {
    const [open, setOpen] = useState(false);
  const [mangaTitle, setMangaTitle] = useState('')
  const [mangaId, setMangaId] = useState('')


    return (
        <>
            <div className='flex flex-col'>
                <img className='px-4 md:pt-4 md:mx-auto' src={props.cover_photo} alt="Cover" />
                <h2 className='text-3xl px-4 py-4 md:pl-6 md:text-3xl md:text-center'> {props.title}</h2>
            </div>

            <div className='flex flex-row items-center justify-evenly px-4 sm:justify-evenly'>
                <p className='bg-pink-100 text-pink-400 rounded-full p-3 w-20 text-center shadow-md md:text-lg'>{props.categories}</p>
                <button onClick={()=>{
                        setOpen(true); setMangaId(manga._id); setChapterTitle(manga.title)
                      }}><img src='../public/image/icon_comment.png' alt='icon_comment' /></button>
                      {open && <ListComment open={open} setOpen={setOpen} manga_id={mangaId} mangaName={mangaTitle} />}
            </div>
            
        </>
    )
}

export default MangaCover