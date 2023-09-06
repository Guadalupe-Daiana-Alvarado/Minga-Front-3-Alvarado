// aca vamos a renderizar las paginas de cada capitulo de chapter//
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Page = () => {
    let url = "http://localhost:8000/chapters/"
    let { id, page } = useParams()
    console.log(useParams())
    let [counter, setCounter] = useState(0);
    let [chapter, setChapter] = useState({})
    let next = () => {
        if (counter + 1 < chapter.length) { setCounter(counter + 1); }
        else { setCounter(0); }
    };
    const prev = () => {
        if (counter - 1 >= 0) { setCounter(counter - 1); }
        else { setCounter(chapter.length - 1); }
    };
    function getData() {
        axios(url + id)
            .then(res => {
                setChapter(res.data.chapter)
                console.log(res.data)
            })

            .catch((err) => console.log(err))
    }
    useEffect(() => {
        getData()
    }, [])


    return (

        <div className=' h-screen flex items-center justify-center'>
            <img className=' h-3/4 w-full object-cover' src='../public/image/test-img.jpg' alt="" />
        </div>
    )
}

export default Page