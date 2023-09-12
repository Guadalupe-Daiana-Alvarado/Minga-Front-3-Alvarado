import React, { useState } from 'react';
import flecha1 from '../../public/image/flecha.png';
import flecha2 from '../../public/image/flecha.png';
import axios from 'axios'
import { useEffect } from 'react';


const Carrousel = () => {
  let url = "http://localhost:8000/categories"
  /*  let titulos = ["pepito", "juancito", "carlitos", "menganito"]; */
  let [counter, setCounter] = useState(0);
  let [categories, setCategories] = useState([])

  let next = () => {
    if (counter + 1 < categories.length) {
      setCounter(counter + 1);
    } else {
      setCounter(0);
    }
  };

  const prev = () => {
    if (counter - 1 >= 0) {
      setCounter(counter - 1);
    } else {
      setCounter(categories.length - 1);
    }
  };

  function getData() {
    axios(url)
      .then(res => {
        setCategories(res.data)
        console.log(res)

      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    getData()
  }, [])


  return (
    <div className='w-full h-72 flex justify-around mb-5 bg-gradient-to-r from-pink-300 to-pink-500'>
      <div className='pt-36 pl-3'>
        <img onClick={prev} className='cursor-pointer rotate-180 w-8 p-2 rounded-full bg-white' src={flecha1} alt="flecha1" />
      </div>

      <div className='w-56 -mt-8'>
        <img src={categories[counter]?.character_photo} alt="tarjeta2" />
      </div>
      
      <div className='w-48 -mt-8'>
        <img className='sm:pt-5 ' src={categories[counter]?.cover_photo}  alt="tarjeta1" />
      </div>


      <div className='flex flex-col w-6/12 mt-20'>
        <h2 className='text-white text-3xl m-5'>{categories[counter]?.name} </h2>
        <p className='w-9/12 text-white font-serif '>{categories[counter]?.description}</p>
      </div>

      <div className='pt-36 pr-3'>
        <img onClick={next} className='cursor-pointer w-8 p-2 rounded-full bg-white' src={flecha2} alt="flecha2" />
      </div>
    </div>
  );
};

export default Carrousel;
