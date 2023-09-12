import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';


const Page = () => {
    const { id, page } = useParams();
    const navigate = useNavigate()
    const location = useLocation()
    function notCero() {
        if (page == 0) {
            navigate(location.pathname.replace("0", "1"))
        }
    }
    console.log(id, page)
    // counter = variable de estado
    // setCounter = funcion que actualiza  el estado// 
    const [counter, setCounter] = useState(Number(page));
    const [chapter, setChapter] = useState({});

    //  NEXT ,funcion que le permite al usuario navegar hacia delante y hacia atras,
    // entre paginas del capitulo//
    const next = () => {
        if (counter < chapter.pages.length) {
            setCounter(counter + 1);
            navigate(`/chapter/${id}/${counter + 1}`)
        } else {
            setCounter(1);
            navigate(`/chapter/${chapter.nextChapter}/1`)
        }
    };

    console.log(chapter)

    const prev = () => {
        if (counter -1 >= 1) {
            // Reducir el contador en 1 si es mayor que 0
            setCounter(counter - 1);
            // Navegar a la página anterior del capítulo actual
            navigate(`/chapter/${id}/${counter - 1}`);
        } else if (chapter.previousChapter && counter == 1) {
            // Si el contador es 0 (estamos en la primera página) y hay un capítulo anterior
            // Navegar al capítulo anterior y establecer counter en 1 (primera página del nuevo capítulo)
            navigate(`/chapter/${chapter.previousChapter}/1`);
            setCounter(1);
        } else {
            // Si el contador es 0 y no hay un capítulo anterior, podrías tomar otra acción, como redirigir a la página de detalles del manga.
            navigate(`/manga/${id}`);
        }
    };
    

    useEffect(() => {
        axios.get(`http://localhost:8000/chapters/${id}`)
            .then((res) => {
                setChapter(res.data);
                console.log(res.data)
            })
            .catch((err) => console.log(err));
        notCero()

    }, [id]);

    return (
        <div className="h-screen flex flex-col items-center justify-center relative">

    
            {/* Verifica si hay una pagina en ele stado actual */}
            {chapter?.pages?.length > 0 ? (
                <div>
                    <div className='flex text-white justify-center'>
                        <p className='text-xs'>Page {counter} of {chapter?.pages?.length}</p>
                        <h2 className='text-xs'>Chapter Title: {chapter?.title}</h2>
                    </div>
                    
                    {chapter?.pages[counter - 1] ? (
                        <div className="relative">
                            <img src={chapter?.pages[counter - 1]} className="w-full mt-10 lg:w-11/12 xl:w-5/6" alt={`Page ${counter + 1}`} />


                            <svg onClick={next} className='absolute right-arrow right-5 top-1/2 transform -translate-y-1/2 ' width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.25146 9C0.69918 9 0.251465 8.55228 0.251465 8C0.251465 7.44772 0.69918 7 1.25146 7V9ZM13.7072 7.29289C14.0977 7.68342 14.0977 8.31658 13.7072 8.70711L7.34325 15.0711C6.95272 15.4616 6.31956 15.4616 5.92903 15.0711C5.53851 14.6805 5.53851 14.0474 5.92903 13.6569L11.5859 8L5.92903 2.34315C5.53851 1.95262 5.53851 1.31946 5.92903 0.928932C6.31956 0.538408 6.95272 0.538408 7.34325 0.928932L13.7072 7.29289ZM1.25146 7L13.0001 7V9L1.25146 9V7Z" fill="#424242" />
                            </svg>

                            <svg onClick={prev} className='absolute  left-arrow left-5 top-1/2 transform -translate-y-1/2' width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.7485 9C13.3008 9 13.7485 8.55228 13.7485 8C13.7485 7.44772 13.3008 7 12.7485 7V9ZM0.292794 7.29289C-0.0977306 7.68342 -0.0977306 8.31658 0.292794 8.70711L6.65675 15.0711C7.04728 15.4616 7.68044 15.4616 8.07097 15.0711C8.46149 14.6805 8.46149 14.0474 8.07097 13.6569L2.41411 8L8.07097 2.34315C8.46149 1.95262 8.46149 1.31946 8.07097 0.928932C7.68044 0.538408 7.04728 0.538408 6.65675 0.928932L0.292794 7.29289ZM12.7485 7L0.999901 7V9L12.7485 9V7Z" fill="#424242" />
                            </svg>
                        </div>
                    ) : (
                        <p>Page content not available</p>
                    )}
                </div>
            ) : (
                <p>Loading...</p>
            )}

        </div >
    );
};

export default Page;