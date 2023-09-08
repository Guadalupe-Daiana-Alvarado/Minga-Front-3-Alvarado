import React, { useEffect, useState } from 'react'
import axios from 'axios'
import routerProvider from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import img from '../../public/image/search.png'


function Mangas() {
  let [mangas, setMangas] = useState([])
  let [categories, setCategories] = useState([]);
  let [text, setText] = useState("")
  let [check, setCheck] = useState([])
  let [count, setCount] = useState(0)
  const [noResults, setNoResults] = useState(false);

  console.log(check)
  let { page } = useParams();

  const arrayCategories = () => check ? check.toString() : ""
  async function getMangas() {
    try {
      let { data } = await axios.get(`http://localhost:8000/mangas?title=${text}&category=${arrayCategories()}&page=${page}`)
      setMangas(data.mangas);
      setCount(data.count)
      setNoResults(data.mangas.length === 0);
    } catch (error) {
      console.log(error.mesagge)
    }
  }


  async function getCategories() {
    try {
      let { data } = await axios.get('http://localhost:8000/categories')
      setCategories(data)
      console.log(data)

    } catch (error) {
      console.log(error.mesagge)

    }
  }
  function checkeados(id) {
    console.log(id)
    if (!check.includes(id)) {
      setCheck([...check, id])

    } else {
      setCheck(check.filter(category_id => category_id !== id))
    }

  }


  useEffect(() => {
    getMangas()
    getCategories()
  }, [text, check, page]);

  return (
    <>
      <header className='w-full h-96 items-center justify-center object-cover' style={{ backgroundImage: "url('/image/fondomangas.png')", objectFit: "contain" }}>
        <h2 className='p-5 m-10 mt-24 text-center text-white text-4xl font-semibold md:font-bold md:text-6xl '>MANGAS</h2>
        <div className=' w-full h-16 flex items-center justify-center p-4 '>
          <input onInput={(e) => setText(e.target.value)} className='rounded p-4 w-42 h-12 md:w-3/4 mt-24 ' type="text" placeholder=' 🔍︎ Find your manga here' />
        </div>
      </header>
      <main className='w-full min-h-screen flex flex-col justify-around bg-slate-100  rounded-3xl' >
  
      <div className='flex items-center justify-center'>
  {categories.map((category) => (
    <button
      onClick={() => checkeados(category._id)}
      key={category._id}
      className='rounded-full w-24 p-3 m-1 mb-2 transition-opacity hover:opacity-70 focus:outline-none active:bg-opacity-70'
      style={{ backgroundColor: category.color }}
    >
      {category.name}
    </button>
  ))}
</div>

    
          <div className='text-withe gap-4 min-w-10/12 min-h-2/3 flex flex-col md:flex-wrap md:flex-row items-center justify-around  bg-white  rounded-3xl'>
            {noResults ? (      <img src={img} alt="" />) : (

            /*   <div className="text-withe gap-4  rounded min-w-10/12 min-h-2/3 flex items-center justify-around flex-col md:flex-row bg-red-200"> */

                mangas.map((manga, index) => (

                  <Link to={`/manga/${manga._id}`} key={index} className=' bg-slate-100  rounded-3xl m-5 justify-between items-center flex flex-row w-3/4 h-auto  md:w-2/5  md:h-1/3  hover:shadow-md focus:shadow-md'>
                    <div>
                      <h2 className='font-bold text-2xl w-2/4 m-4 md:m-8'> {manga.title}</h2>
                      {/*   <h3 className='p-5 w-10' style={{ backgroundColor: manga.color }} >Type</h3> */}
                      <button className='bg-green-200 text-emerald-500 font-bold m-2 rounded-full w-24 p-3 mb-2 '> Read </button>
                    </div>

                    <img className='w-2/4 h-44 object-cover md:h-56 md:min-w-3/4 rounded-l-full gap-3 ' src={manga.cover_photo} alt={manga.title} />


                  </Link>
                ))
              /* </div> */
            )}
          </div>
      </main>

      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">

        <div className=" sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm flex justify-around gap-4 text-gray-700">
              Showing in {count} results
            </p>
          </div>

          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <Link to={`/mangas/${Math.max(1, parseInt(page) - 1)}`} className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                <span className="sr-only">Previous</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                </svg>
              </Link>

              <Link to={`/mangas/1`} className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">1</Link>
              <Link to={`/mangas/2`} className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">2</Link>
              <Link to={`/mangas/3`} className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">3</Link>
              <Link to={`/mangas/4`} className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">4</Link>


              <Link to={`/mangas/${Math.min(4, parseInt(page) + 1)}`} className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                <span className="sr-only">Next</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                </svg>
              </Link>
            </nav>
          </div>
        </div>
      </div>

    </>
  );
}

export default Mangas;
