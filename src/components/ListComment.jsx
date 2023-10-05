import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import commentAction from '../../redux/actions/commentsAction';
import createComment from '../../redux/actions/createCommentAction';
import commentReplyAction from '../../redux/actions/commentsReplyActions'; // Importa la acción de comentarios y respuestas
import EditComment from '../components/EditComments';
import DeleteComment from './DeleteComment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BadWordsFilter from 'bad-words';
import { formatDistanceToNow } from 'date-fns';
import CreateReply from './ReplyComment';

const Comment = ({ open, setOpen, chapter_id, chapterName }) => {
  const comment = useRef();
  const { user, token } = useSelector((store) => store.user_reduce);
  const {comments} = useSelector((store)=>store.commentsReducer); // Utiliza el selector para obtener los comentarios
  
  const dispatch = useDispatch();
  const [replies, setReplies] = useState([]);
  const [edit, setEdit] = useState({
    show: false,
    comment: {},
  });
  const [delette, setDelette] = useState({
    show: false,
    comment: {},
  });
  const [replyingTo, setReplyingTo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Cantidad de capítulos por página

  useEffect(() => {
    dispatch(
      commentAction({
        chapter_id,
        token,
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      commentReplyAction({
        token,
      })
    ); // Llama a la acción de comentarios y respuestas para obtener los datos actualizados
  }, [dispatch, token]);

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
      token,
    };

    try {
      await dispatch(createComment(info));
      comment.current.value = '';
      toast.success('Comment created successfully');
    } catch (error) {
      toast.error('Error creating comment');
    }
  };

  const handleEditComment = (comment) => {
    setEdit({
      show: true,
      comment,
    });
  };

  const handleDeleteComment = (comment) => {
    setDelette({
      show: true,
      comment,
    });
  };

  const handleReplyComment = (comment) => {
    setReplyingTo(comment);
  };

  const addReply = (newReply) => {
    setReplies([newReply, ...replies]);
  };

  const sortedComments = comments
    .slice()
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  const totalPages = Math.ceil(sortedComments.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const commentsToDisplay = sortedComments.slice(startIndex, endIndex);

  return (
    <>
      <ToastContainer />
      <div className='fixed inset-0 z-50 flex items-center justify-center bg-opacity-75 bg-black'>
        <div className='w-full max-w-md p-4 bg-white rounded-lg shadow-md'>
          <div className='flex justify-between items-center'>
            <h1 className='text-xl font-bold'>{chapterName}</h1>
            <button
              onClick={() => setOpen(!open)}
              className='text-gray-600 hover:text-gray-800 focus:outline-none'
            >
              X
            </button>
          </div>
          <div className='mt-4'>
            <div className='flex flex-col gap-5 w-full mb-6 p-4 overflow-scroll'>
              {commentsToDisplay.map((comment, index) => (
                <div key={index} className='rounded-xl border-2 border-[#666] p-1'>
                  {/* Renderiza los comentarios existentes */}
                  {(comment.user_id.email == user.email) ? (
                    <div className='flex justify-between gap-2'>
                      <button onClick={() => handleDeleteComment(comment)}>
                        <img src="../../public/image/deleteimage.svg" alt="" />
                      </button>
                      <button onClick={() => handleEditComment(comment)}>
                        <img src="../../public/image/pencil-alt.png" alt="" />
                      </button>
                      <button onClick={() => handleReplyComment(comment)}>Reply</button>
                      <h2>{comment.user_id.email}</h2>
                      <img src={comment.user_id.photo} className='w-8 rounded-full object-cover' alt="" />
                    </div>
                  ) : (
                    <div className='flex items-center gap-2'>
                      <img src={comment.user_id.photo} className='w-8 rounded-full object-cover' alt="" />
                      <h2>{comment.user_id.email}</h2>
                    </div>
                  )}
                  {edit.show ? <EditComment edit={edit} setEdit={setEdit} user={user} token={token} /> : null}
                  {delette.show ? <DeleteComment delette={delette} setDelette={setDelette} user={user} token={token} /> : null}
                  <div className='w-full bg-gray-500 p-3'>
                    <p>{comment.text}</p>
                  </div>
                  <div className='w-full text-center text-xs text-[#666]'>
                    {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                  </div>

                  {/* Mostrar respuestas si existen */}
                  {comment.replies && comment.replies.length > 0 && (
                    
                    <div className="replies-section">
                      <h3>Respuestas:</h3>
                      {comment.replies.map((reply, replyIndex) => (
                        <div key={replyIndex} className='reply'>
                          {/* Código para mostrar cada respuesta */}
                          <p>{reply.text}</p>
                        </div>
                      ))}
                    </div>
                  )
}
                </div>
              ))}
            </div>
            <div className='flex border-2 border-[#999] rounded-lg'>
              <input ref={comment} className='w-full h-10 p-2 rounded-lg focus:outline-none' type="text" placeholder='Say something here' />
              {replyingTo ? (
                <CreateReply parentCommentId={replyingTo._id} user={user} addReply={addReply} />
              ) : (
                <button onClick={sendAndCreateComment} className='w-16 bg-pink-400 text-white'>Send</button>
              )}
            </div>
          </div>
          {/* Agrega controles de paginación */}
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`pagination-item ${currentPage === index + 1 ? 'active' : ''}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Comment;
