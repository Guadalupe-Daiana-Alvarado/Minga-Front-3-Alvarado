
// import React, { useRef, useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import commentAction from '../../redux/actions/commentsAction';
// import createComment from '../../redux/actions/createCommentAction';
// import editComments from '../../redux/actions/editComment.js'
// import deleteComments from '../../redux/actions/deleteAction.js'
// import Filter from 'bad-words'; // Importa la librería para palabras malsonantes
// import { ToastContainer, toast } from 'react-toastify'; // Importa la librería de notificaciones
// import 'react-toastify/dist/ReactToastify.css';
// import DeleteComment from "../components/DeleteComment"
// import EditComment from "./EditComments"

// const Comment = ({ open, setOpen, chapter_id, chapterName }) => {

//   const comment = useRef();
//   const { user, token } = useSelector(store => store.user_reduce);
//   const {comments, error} = useSelector(store=>store.commentsReducer);
//   //const comments = useSelector(store => store.commentsReducer.comments);
//   const dispatch = useDispatch();
//   const [edit, setEdit] = useState({
//     show: false,
//     comment: {}
//   });

//   const [delette, setDelette] = useState({
//     show: false,
//     comment: {}
//   })
  
//   const filter = new Filter(); // Crea una instancia del filtro de palabras malsonantes

//   useEffect(() => {
//     // Carga los comentarios iniciales cuando el componente se monta
//     dispatch(commentAction({
//       chapter_id,
//       token
//     }));
//   }, [dispatch]);

//   const sendAndCreateComment = async () => {
//     const commentText = comment.current.value;
//     const info = {
//       chapter_id,
//       text: commentText,
//       user_id: user._id,
//       token
//     };
    
//     if (!commentText) {
//       alert("El comentario no puede estar vacío");
//       return;
//     }

//     if (filter.isProfane(commentText)) {
//       alert("Por favor, evita usar lenguaje inapropiado en tus comentarios.");
//       return;
//     }


//     try {
//       await dispatch(createComment(info));
//       comment.current.value = '';

//       // Muestra una notificación de éxito
//       toast.success('Comentario creado con éxito');
//     } catch (error) {
//       console.error('Error al crear el comentario:', error);
//       // Muestra una notificación de error
//       toast.error('Error al crear el comentario. Inténtalo de nuevo más tarde.');
//     }

   
//   };
  
//   const editComment = (comment)=>{
//     setEdit({
//       show:true,
//       comment
//     })
//   }
//   const deletteComment = (comment)=>{
//     setDelette({
//       show:true,
//       comment
//     })
//   }

//   return (
//     <div className='w-2/5 h-3/6 bg-white border border-pink-400 fixed right-0 bottom-0 flex flex-col items-center'>
//       <div className='flex items-center justify-between w-full h-10 p-6'>
//         <h1 className='text-xl font-bold'>{chapterName}</h1>
//         <button onClick={() => setOpen(!open)}>X</button>
//       </div>
//       <div className='flex flex-col gap-5 w-full h-4/6 mb-6 p-4 overflow-scroll'>
//       {comments.map((comment, index) => (
//   <div key={index} className='h-72 w-full rounded-xl border-2 border-[#666] p-1'>
//     {comment.user_id.email === user.email ? (
//       <div className='flex items-center gap-2'>
//         <button onClick={() => deletteComment(comment)}>
//           <img src="../../public/image/deleteimage.svg" alt="" />
//         </button>
//         <button onClick={() => editComment(comment)}>
//           <img src="../../public/image/pencil.svg" alt="" />
//         </button>
//         <h2>{comment.user_id.email}</h2>
//         <img src={comment.user_id.photo} alt="" className='w-8 rounded-full object-cover' />
//       </div>
//     ) : (
//       <div>
//         <img src={comment.user_id.photo} alt="" className='w-8 rounded-full object-cover' />
//         <h2>{comment.user_id.email}</h2>
//       </div>
//     )}
//     <div className='w-full h-4/6 p-3 bg-slate-500'>
//       <p>{comment.text}</p>
//     </div>
//     <div className='w-full h-fit text-center text-xs text-[#666]'>
//       {comment.createdAt}
//     </div>
//   </div>
// ))}
//         {edit.show ? <EditComment edit={edit} setEdit={setEdit} user={user} token={token} /> : null}
//         {delette.show ? <DeleteComment delette={delette} setDelette={setDelette} user={user} token={token} /> : null}
//       </div>
//       <div className='absolute bottom-2 w-5/6 h-fit flex border-2 border-[#999] rounded-lg overflow-scroll'>
//         <input ref={comment} className='w-5/6 h-10 p-2 rounded-lg focus:outline-none' type="text" placeholder='Say something here' />
//         <button onClick={sendAndCreateComment} className='absolute bottom-2 right-4 w-5'>Send</button>
//       </div>
//       {/* Notificaciones de éxito y error */}
//       <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
//     </div>
//   );
//             }
          
// export default Comment


import { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import commentAction from '../../redux/actions/commentsAction';
import createComment from '../../redux/actions/createCommentAction';
import EditComment from '../components/EditComments';
import DeleteComment from './DeleteComment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BadWordsFilter from 'bad-words';
import { formatDistanceToNow } from 'date-fns';

const Comment = ({ open, setOpen, chapter_id, chapterName }) => {
  const comment = useRef();
  const { user, token } = useSelector(store => store.user_reduce);
  const { comments, error } = useSelector(store => store.commentsReducer);
  const dispatch = useDispatch();
  const [edit, setEdit] = useState({
    show: false,
    comment: {}
  });
  const [delette, setDelette] = useState({
    show: false,
    comment: {}
  });

  useEffect(() => {
    // Carga los comentarios iniciales cuando el componente se monta
    dispatch(commentAction({
      chapter_id,
      token
    }));
  }, [dispatch]);

  const sendAndCreateComment = async () => {
    const commentText = comment.current.value;
    const filter = new BadWordsFilter();
    if (filter.isProfane(commentText)) {
      toast.error('This comment contains inappropriate words');
      return;
    }
    if (!commentText.trim()) {
      toast.error('This comment cannot be empty');
      return;
    }
    const info = {
      chapter_id,
      text: commentText,
      user_id: user._id,
      token
    };

    // Dispatch de la acción asincrónica y espera la respuesta
    try {
      await dispatch(createComment(info));
      // Limpia el campo de comentario después de enviarlo si es necesario
      comment.current.value = '';
      toast.success('Comment created successfully');
    } catch (error) {
      toast.error('Error creating comment');
    }
  };

  const editComment = (comment) => {
    setEdit({
      show: true,
      comment
    })
  };

  const deleteComment = (comment) => {
    setDelette({
      show: true,
      comment
    })
  };

  return (
    <>
      <ToastContainer />
      <div className='fixed inset-0 z-50 flex items-center justify-center bg-opacity-75 bg-black'>
        <div className='w-full max-w-md p-4 bg-white rounded-lg shadow-md'>
          <div className='flex justify-between items-center'>
            <h1 className='text-xl font-bold'>{chapterName}</h1>
            <button onClick={() => setOpen(!open)} className='text-gray-600 hover:text-gray-800 focus:outline-none'>
              X
            </button>
          </div>
          <div className='mt-4'>
            <div className='flex flex-col gap-5 w-full mb-6 p-4 overflow-scroll'>
              {comments.map((comment, index) => (
                <div key={index} className='rounded-xl border-2 border-[#666] p-1'>
                  {/* Renderiza los comentarios existentes */}
                  {
                    (comment.user_id.email == user.email) ?
                      <div className='flex justify-between gap-2'>
                        <button onClick={() => deleteComment(comment)}>
                          <img src="../../public/image/deleteimage.svg" alt="" />
                        </button>
                        <button onClick={() => editComment(comment)}>
                          <img src="../../public/image/pencil-alt.png" alt="" />
                        </button>
                        <h2>{comment.user_id.email}</h2>
                        <img src={comment.user_id.photo} className='w-8 rounded-full object-cover' alt="" />
                      </div> :
                      <div className='flex items-center gap-2'>
                        <img src={comment.user_id.photo} className='w-8 rounded-full object-cover' alt="" />
                        <h2>{comment.user_id.email}</h2>
                      </div>
                  }
                  {edit.show ? <EditComment edit={edit} setEdit={setEdit} user={user} token={token} /> : null}
                  {delette.show ? <DeleteComment delette={delette} setDelette={setDelette} user={user} token={token} /> : null}
                  <div className='w-full bg-gray-500 p-3'>
                    <p>{comment.text}</p>
                  </div>
                  <div className='w-full text-center text-xs text-[#666]'>
                  {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                  </div>
                </div>
              ))}
            </div>
            <div className='flex border-2 border-[#999] rounded-lg'>
              <input ref={comment} className='w-full h-10 p-2 rounded-lg focus:outline-none' type="text" placeholder='Say something here' />
              <button onClick={sendAndCreateComment} className='w-16 bg-orange-500 text-white'>Send</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comment;