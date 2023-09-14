
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { filters } from "../redux/actions/mangasAction";

function Mangas() {
  const [mangas, setMangas] = useState([]);
  const [categories, setCategories] = useState([]);
  // const [text, setText] = useState('');
  // const [check, setCheck] = useState([]);
  const [count, setCount] = useState(0);
  const [noResults, setNoResults] = useState(false);
  const { page } = useParams();
  const  navigate  = useNavigate();

  /*
  const [mangas, setMangas] = useState([]);
  const [prev, setPrev] = useState();
  const [next, setNext] = useState();
  const { page } = useParams();
  const [pageActual, setPageActual] = useState(Number(page));
  const [noElements, setNoElements] = useState(false);
  const [noElementsMessage, setNoElementsMessage] = useState("");
*/
  const { check, text } = useSelector((store) => store.mangas)
  const dispatch = useDispatch() 


  const arrayCategories = () => (check ? check.toString() : '');

  const applyFilters = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8000/mangas?title=${text}&category=${arrayCategories()}&page=${page}`);
      setMangas(data.mangas);
      setCount(data.count);
      setNoResults(data.mangas.length === 0);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getCategories = async () => {
    try {
      const { data } = await axios.get('http://localhost:8000/categories');
      setCategories(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const checkeados = (id) => {
    if (!check.includes(id)) {
      setCheck([...check, id]);
    } else {
      setCheck(check.filter((category_id) => category_id !== id));
    }
  };

  const setFilters = (filterName, filterValue) => {
    if (filterName === 'text') {
      //setText(filterValue);
      dispatch(filters({
        checks: null,
        text: filterValue
      }))
    } else if (filterName === 'check') {
      if (!check.includes(filterValue)) {
        //setCheck([...check, filterValue]);
        dispatch(filters({
          checks: [...check, filterValue],
          text: null
        }))
      } else {
        //setCheck(check.filter((category_id) => category_id !== filterValue));
        dispatch(filters({
          checks: check.filter((category_id) => category_id !== filterValue),
          text: null
        }))
      }
    }
    navigate(`/mangas/${1}`); // Actualiza la URL
  };

  useEffect(() => {
    applyFilters();
    getCategories();
  }, [text, check, page]);

  return (
    <>
      <header className='w-full h-96 items-center justify-center object-cover' style={{ backgroundImage: "url('/image/fondomangas.png')", objectFit: "contain" }}>
        <h2 className='p-5 m-10 mt-24 text-center text-white text-4xl font-semibold md:font-bold md:text-6xl '>MANGAS</h2>
        <div className=' w-full h-16 flex items-center justify-center p-4 '>
          <input onInput={(e) => setFilters("text", e.target.value)} className='rounded p-4 w-42 h-12 md:w-3/4 mt-24 ' type="text" placeholder=' 🔍︎ Find your manga here' />
        </div>
      </header>
      <main className='w-full min-h-screen flex flex-col justify-around bg-slate-100  rounded-3xl'>

        <div className='flex items-center justify-center'>
          {categories.map((category) => (
            <button
              onClick={() => setFilters("check", category._id)}
              key={category._id}
              className='rounded-full w-24 p-3 m-1 mb-2 transition-opacity hover:opacity-70 focus:outline-none active:bg-opacity-70'
              style={{ backgroundColor: category.color }}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className='text-withe gap-4 min-w-10/12 min-h-2/3 flex flex-col md:flex-wrap md:flex-row items-center justify-around  bg-white  rounded-3xl'>
          {noResults ? (<img src={img} alt="" />) : (
            mangas.map((manga, index) => (
              <Link to={`/manga/${manga._id}`} key={index} className=' bg-slate-100  rounded-3xl m-5 justify-between items-center flex flex-row w-3/4 h-auto  md:w-2/5  md:h-1/3  hover:shadow-md focus:shadow-md'>
                <div>
                  <h2 className='font-bold text-2xl w-2/4 m-4 md:m-8'> {manga.title}</h2>
                  <button className='bg-green-200 text-emerald-500 font-bold m-2 rounded-full w-24 p-3 mb-2 '> Read </button>
                </div>
                <img className='w-2/4 h-44 object-cover md:h-56 md:min-w-3/4 rounded-l-full gap-3 ' src={manga.cover_photo} alt={manga.title} />
              </Link>
            ))
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

/*// import { useState, useEffect } from 'react';
// import { useNavigate, Link, useParams } from 'react-router-dom';
// import axios from 'axios';
// import NavBar from '../layouts/NavBar';
// import Footer from './Footer';

// const Mangas = () => {

//   const navigate = useNavigate();
//   const [categories, setCategories] = useState([]);
//   const [text, setText] = useState("")
//   const [check, setCheck] = useState([])
//   const [mangas, setMangas] = useState([]);
//   const [prev, setPrev] = useState();
//   const [next, setNext] = useState();
//   const { page } = useParams();
//   const [pageActual, setPageActual] = useState(Number(page));
//   const [noElements, setNoElements] = useState(false);
//   const [noElementsMessage, setNoElementsMessage] = useState("");
//   const arrayCategories = () => check ? check.toString() : ""

//   const getMangas = () => {
//     axios(`http://localhost:8080/mangas/?page=${page}&title=${text}&category=${arrayCategories()}`)
//     .then(res => {
//       if (res.data.mangas.length === 0) {
//         setNoElements(true);
//         setNoElementsMessage("No se encontraron mangas");
//       } else {
//         setNoElements(false);
//       }
//       console.log(res)
//       setMangas(res.data.mangas)
//       setPageActual(res.data.page)
//       setPrev(res.data.prev)
//       setNext(res.data.next)
//     })
//     .catch(err => console.log(err))
//   }
//   console.log(mangas)

//   const getCategories = () => axios(`http://localhost:8080/categories`)
//     .then(res => {
//       setCategories(res.data.response)
//       console.log(res.data)
//     })
//     .catch(err => console.log(err))

//   function checked(id) {
//     console.log(id, check)
//     if (!check.includes(id)) {
//       setearCheck([...check, id])

//     } else {
//       setearCheck(check.filter(category_id => category_id !== id))
//     }

//   }

//   useEffect(() => {
//     getMangas()
//     getCategories()
//   }, [page, text, check])


//   const handleNext = () => {
//     if (next) {
//       const nextPage = pageActual + 1
//       navigate(`/mangas/${nextPage}`)
//     }
//   }

//   const handlePrev = () => {
//     if (prev) {
//       const prevPage = pageActual - 1
//       navigate(`/mangas/${prevPage}`)
//     }
//   }
//   function setearCheck(id) {
//     setCheck(id)
//     navigate(`/mangas/${1}`)
//   }
//   function setearTexto(value) {
//     setText(value)
//     navigate(`/mangas/${1}`)
//   }
//   console.log(categories)
//   return (
//     <>
//       <div className='w-full h-96 items-center justify-center bg-top flex flex-col' style={{ backgroundImage: "url('../../public/img/bg-mangas.png')" }}>
//         <NavBar />
//         <h1 className='text-white text-6xl'>Mangas</h1>
//         <input onInput={(e) => setearTexto(e.target.value)} className='rounded h-12 p-4 w-11/12 mt-8 lg:mt-24 ' type="text" placeholder=' Find your manga here' />
//       </div>
//       <div className='flex items-center justify-center '>


//         {categories?.map((category) => (
//           <button
//             onClick={() => checked(category._id)}
//             key={category._id} // Agrega un key único aquí
//             className='rounded p-1 m-1 mb-2 '
//             style={{ backgroundColor: category.color }}
//           >{category.name}</button>
//         ))}
//       </div>
//       <div className="w-full min-h-[47vh] justify-center items-center flex flex-wrap gap-10">
//         {noElements ? (
//           <div>{noElementsMessage}</div>) : (
//           mangas?.map((manga) => (
//             <div className='w-72 md:w-80 lg:w-96 h-36 md:h-40 lg:h-44 bg-gray-200 flex justify-between rounded-2xl ' key={manga._id}>
//               <div className='w-3 h-4/5 p-1' style={{ background: manga.category_id.color }}></div>
//               <div>
//                 <div>
//                   <div className='w-36 text-neutral-800 text-base font-medium leading-none ml-1' >{manga.title}</div>
//                   <div className='w-36 text-base font-normal leading-none ml-1 mb-3' style={{ color: manga.category_id.color }} >{manga.category_id.name}</div>
//                 </div>
//                 <div >
//                   <Link to={`/manga/${manga._id}`} className='p-1 ml-2 bg-emerald-500 rounded-lg'>Read</Link>
//                 </div>
//               </div>
//               <img className='w-2/5  object-cover rounded-l-full gap-3 ' src={manga.cover_photo} alt="" />
//             </div>
//           ))
//         )}
//       </div>
//       <div className='flex gap-3 justify-center mt-3'>
//         <button className='p-1 bg-orange-500 rounded' disabled={!prev} onClick={handlePrev}>Prev</button>
//         <button className='p-1 bg-orange-500 rounded' disabled={!next} onClick={handleNext}>Next</button>
//       </div>
//       <Footer />
//     </>
//   )
// }

// export default Mangas;








  const arrayCategories = () => (check ? check.toString() : "");

  const getMangas = () => {
    axios(`http://localhost:8080/mangas/?page=${page}&title=${text}&category=${arrayCategories()}`)
      .then((res) => {
        if (res.data.mangas.length === 0) {
          setNoElements(true);
          setNoElementsMessage("No se encontraron mangas");
        } else {
          setNoElements(false);
        }
        setMangas(res.data.mangas);
        setPageActual(res.data.page);
        setPrev(res.data.prev);
        setNext(res.data.next);
      })
      .catch((err) => console.log(err));
  };

  const getCategories = () =>
    axios(`http://localhost:8080/categories`)
      .then((res) => {
        setCategories(res.data.response);
        console.log(res.data);
      })
      .catch((err) => console.log(err));

  const applyFilters = (filterName, filterValue) => {
    if (filterName === 'text') {
      //setText(filterValue);
      dispatch(filters({
        checks: null,
        text: filterValue
      }))
    } else if (filterName === 'check') {
      if (!check.includes(filterValue)) {
        //setCheck([...check, filterValue]);
        dispatch(filters({
          checks: [...check, filterValue],
          text: null
        }))
      } else {
        //setCheck(check.filter((category_id) => category_id !== filterValue));
        dispatch(filters({
          checks: check.filter((category_id) => category_id !== filterValue),
          text: null
        }))
      }
    }
    navigate(`/mangas/${1}`); // Actualiza la URL
  };

  useEffect(() => {
    getMangas();
    getCategories();
  }, [page, text, check]);

  const handleNext = () => {
    if (next) {
      const nextPage = pageActual + 1;
      navigate(`/mangas/${nextPage}`);
    }
  };

  const handlePrev = () => {
    if (prev) {
      const prevPage = pageActual - 1;
      navigate(`/mangas/${prevPage}`);
    }
  };

  return (
    <>
      <div className='w-full h-96 items-center justify-center bg-top flex flex-col' style={{ backgroundImage: "url('../../public/img/bg-mangas.png')" }}>
        <NavBar />
        <h1 className='text-white text-6xl'>Mangas</h1>
        <input onInput={(e) => applyFilters('text', e.target.value)} className='rounded h-12 p-4 w-11/12 mt-8 lg:mt-24 ' type="text" placeholder=' Find your manga here' />
      </div>
      <div className='flex items-center justify-center '>
        {categories?.map((category) => (
          <button
            onClick={() => applyFilters('check', category._id)}
            key={category._id} // Agrega un key único aquí
            className='rounded p-1 m-1 mb-2 '
            style={{ backgroundColor: category.color }}
          >{category.name}</button>
        ))}
      </div>
      <div className="w-full min-h-[47vh] justify-center items-center flex flex-wrap gap-10">
        {noElements ? (
          <div>{noElementsMessage}</div>) : (
          mangas?.map((manga) => (
            <div className='w-72 md:w-80 lg:w-96 h-36 md:h-40 lg:h-44 bg-gray-200 flex justify-between rounded-2xl ' key={manga._id}>
              <div className='w-3 h-4/5 p-1' style={{ background: manga.category_id.color }}></div>
              <div>
                <div>
                  <div className='w-36 text-neutral-800 text-base font-medium leading-none ml-1' >{manga.title}</div>
                  <div className='w-36 text-base font-normal leading-none ml-1 mb-3' style={{ color: manga.category_id.color }} >{manga.category_id.name}</div>
                </div>
                <div >
                  <Link to={`/manga/${manga._id}`} className='p-1 ml-2 bg-emerald-500 rounded-lg'>Read</Link>
                </div>
              </div>
              <img className='w-2/5  object-cover rounded-l-full gap-3 ' src={manga.cover_photo} alt="" />
            </div>
          ))
        )}
      </div>
      <div className='flex gap-3 justify-center mt-3'>
        <button className='p-1 bg-orange-500 rounded' disabled={!prev} onClick={handlePrev}>Prev</button>
        <button className='p-1 bg-orange-500 rounded' disabled={!next} onClick={handleNext}>Next</button>
      </div>
      <Footer />
    </>
  );
};

export default Mangas; */
