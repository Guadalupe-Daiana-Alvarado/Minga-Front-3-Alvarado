import { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import commentAction from '../../redux/actions/commentsAction';
import createComment from '../../redux/actions/createCommentAction';
import createReplyAction from '../../redux/actions/replyComments'; // Nueva acción para respuestas
import EditComment from '../components/EditComments';
import DeleteComment from './DeleteComment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BadWordsFilter from 'bad-words';
import { formatDistanceToNow } from 'date-fns';
import ReplyComment from "./ReplyComment"

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
    const [replyingTo, setReplyingTo] = useState(null); // Nuevo estado para el comentario al que se está respondiendo

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

    const handleEditComment = (comment) => {
        setEdit({
            show: true,
            comment
        });
    };

    const handleDeleteComment = (comment) => {
        setDelette({
            show: true,
            comment
        });
    };

    const handleReplyComment = (comment) => {
        setReplyingTo(comment); // Establece el comentario al que se está respondiendo
    };

    const sendAndCreateReply = async () => {
        const replyText = comment.current.value;
        const filter = new BadWordsFilter();
        if (filter.isProfane(replyText)) {
            toast.error('This reply contains inappropriate words');
            return;
        }
        if (!replyText.trim()) {
            toast.error('This reply cannot be empty');
            return;
        }
        const info = {
            parentCommentId: replyingTo._id, // Usar el ID del comentario principal
            text: replyText,
            user_id: user._id,
            token
        };

        // Dispatch de la acción asincrónica y espera la respuesta
        try {
            await dispatch(createReplyAction(info));
            // Limpia el campo de comentario después de enviarlo si es necesario
            comment.current.value = '';
            setReplyingTo(null); // Restablece el estado de respuesta
            toast.success('Reply created successfully');
        } catch (error) {
            toast.error('Error creating reply');
        }
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
                                                <button onClick={() => handleDeleteComment(comment)}>
                                                    <img src="../../public/image/deleteimage.svg" alt="" />
                                                </button>
                                                <button onClick={() => handleEditComment(comment)}>
                                                    <img src="../../public/image/pencil-alt.png" alt="" />
                                                </button>
                                                <button onClick={() => handleReplyComment(comment)}>Reply</button> {/* Agregar botón de respuesta */}
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
                            {replyingTo ? ( // Si se está respondiendo a un comentario, muestra un botón para enviar la respuesta
                                <button onClick={sendAndCreateReply} className='w-16 bg-orange-500 text-white'>Enviar respuesta</button>
                            ) : (
                                <button onClick={sendAndCreateComment} className='w-16 bg-orange-500 text-white'>Send</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Comment;