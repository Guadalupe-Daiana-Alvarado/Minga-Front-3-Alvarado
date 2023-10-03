
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Alert from '../components/Alert'; // Asegúrate de importar el componente Alert desde la ubicación correcta.

function ChapterForm() {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState([]);
  const [dataResponse, setDataResponse] = useState(null);

  const title = useRef();
  const order = useRef();
  const pages = useRef();

  const handleForm = async () => {
    const inputTitle = title.current.value;
    const inputPages = pages.current.value;
    const inputOrder = order.current.value;
    const newChapterData = {
      manga_id: "64f3aa96d9cc8ec6d82d73e9",
      title: inputTitle,
      order: inputOrder,
      pages: inputPages.split(","),
    };
    try {
      const { data } = await axios.post(
        "http://localhost:8000/chapters/",
        newChapterData,
        {
          headers: {
            Authorization:
              "Bearer " +
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGYzYTg0YWMwMGU4OWQ0MTI3NWM5M2QiLCJlbWFpbCI6ImlnbmFAbWguY29tLmFyIiwiaWF0IjoxNjk1MzU3MjU1LCJleHAiOjE2OTU0NDM2NTV9.dWsBd1JDPYQQoLQG9-wuUT7OMILyp_42qjs8q045HS4",
          },
        }
      );
      setMessage([]); // Limpiar mensajes de error en caso de éxito
      setDataResponse(data); // Almacenar la respuesta en el nuevo estado
    } catch (error) {
      console.error(error);
      setMessage([error.response.data.message]); // Pasar el mensaje de error como un array
      setDataResponse(null); // Limpiar respuesta en caso de error
    }
  };

  useEffect(() => {
    if (dataResponse && dataResponse.message || message.length > 0) {
      setShow(true); // Mostrar la alerta si hay un mensaje en la respuesta
    }
  }, [dataResponse, message]);

  return (
    <div className='h-screen bg-slate-100 flex flex-col justify-center items-center'>
      <form action="" className='flex flex-col h-2/3 w-2/3 items-center'>
        <label htmlFor="" className='text-2xl pb-5'>New Chapter</label>
        <input
          type="text"
          className='border-b-2 border-neutral-400 bg-slate-100 text-xs pt-5 w-full md:w-1/2'
          ref={title}
          placeholder='  Insert title'
        />
        <input
          type="text"
          className='border-b-2 border-neutral-400 bg-slate-100 text-xs pt-5 w-full md:w-1/2'
          ref={order}
          placeholder='  Insert order'
        />
        <input
          type="text"
          className='border-b-2 border-neutral-400 bg-slate-100 text-xs pt-5 w-full md:w-1/2'
          ref={pages}
          placeholder='  Insert pages'
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            handleForm();
          }}
          className='bg-indigo-700 text-white font-semibold py-2 px-5 mt-20 rounded-full w-full md:w-1/2'
        >
          Send
        </button>
      </form>
      {show && (
        <Alert show={show} message={message} data={dataResponse} setShow={setShow} />
      )}
    </div>
  );
}

// import React, { useState, useEffect, useRef } from 'react';
// import Alert from '../components/Alert';
// import axios from 'axios';

// const ChapterForm = () => {
//   const [show, setShow] = useState(false);
//   const [message, setMessage] = useState([]);
//   const [dataResponse, setDataResponse] = useState(null);

//   const title = useRef();
//   const order = useRef();
//   const pages = useRef();

//   const handleForm = async () => {
//     const inputTitle = title.current.value;
//     const inputPages = pages.current.value;
//     const inputOrder = order.current.value;
//     const newChapterData = {
//       manga_id: "64f3aa96d9cc8ec6d82d73e9",
//       title: inputTitle,
//       order: inputOrder,
//       pages: inputPages.split(",")
//     };
//     try {
//       const { data } = await axios.post("http://localhost:8000/chapters/", newChapterData, {

//                headers: {
//                    Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGYzYTg0YWMwMGU4OWQ0MTI3NWM5M2EiLCJlbWFpbCI6Imx1Y2FzQG1oLmNvbS5hciIsImlhdCI6MTY5NDcwMjE4NywiZXhwIjoxNjk0Nzg4NTg3fQ.tW6uQzOkD6qZOBs0NNJ3DaRxYEGAy0iLoUTjYgH7mzw"
//                }
      
//              }
//        );
//       setMessage([]); // Limpiar mensajes de error en caso de Ã©xito
//       setDataResponse(data); // Almacenar la respuesta en el nuevo estado
//     } catch (error) {
//       console.error(error);
//       setMessage([error.response.data.message]); // Pasar el mensaje de error como un array
//       setDataResponse(null); // Limpiar respuesta en caso de error
//     }
//   };

//   useEffect(() => {
//     if (dataResponse && dataResponse.message || message.length > 0) {
//       setShow(true); // Mostrar la alerta si hay un mensaje en la respuesta
//     }
//   }, [dataResponse, message]);

//   return (
//     <div className='h-screen bg-slate-100 flex flex-col justify-center items-center'>
//       <form action="" className='flex flex-col h-2/3 w-2/3 items-center'>
//         <label htmlFor="" className='text-2xl pb-5'>New Chapter</label>
//         <input type="text" className='border-b-2 border-neutral-400 bg-slate-100 text-xs pt-5 w-full md:w-1/2' ref={title} placeholder='  Insert title' />
//         <input type="text" className='border-b-2 border-neutral-400 bg-slate-100 text-xs pt-5 w-full md:w-1/2' ref={order} placeholder='  Insert order' />
//         <input type="text" className='border-b-2 border-neutral-400 bg-slate-100 text-xs pt-5 w-full md:w-1/2' ref={pages} placeholder='  Insert pages' />
//         <button onClick={(e) => {
//           e.preventDefault();
//           handleForm();
//         }}
//           className='bg-indigo-700 text-white font-semibold py-2 px-5 mt-20 rounded-full w-full md:w-1/2'>Send</button>
//       </form>
//       {show && <Alert show={show} message={message} data={dataResponse} setShow={setShow} />}
//     </div>
//   );
// }

export default ChapterForm;


