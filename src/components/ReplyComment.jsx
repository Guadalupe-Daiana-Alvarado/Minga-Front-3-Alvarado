import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import createReplyAction from '../../redux/actions/replyComments';

const CreateReply = ({ parentCommentId, user }) => {
    console.log(user)
    const token = localStorage.getItem("token")
    console.log(token)
    const [replyText, setReplyText] = useState('');
    const dispatch = useDispatch();

    console.log(user.email, replyText, parentCommentId)
    const handleCreateReply = async () => {
        try {
            
            if (!replyText) {
                return alert('El campo de respuesta no puede estar vacío');
            }

            if (!user || !user.email) {
                return alert('El usuario no está correctamente definido');
            }

            const info = {
                parentCommentId,
                user_id: user._id,
                text: replyText,
                token: token,
                // Otros datos necesarios para crear la respuesta
            };
            

            // Dispatch de la acción para crear la respuesta
            await dispatch(createReplyAction(info));

            // Limpia el campo de respuesta después de enviarlo
            setReplyText('');

            // Manejo del éxito (puedes mostrar una notificación u otra lógica aquí)
            alert('Respuesta creada con éxito');
        } catch (error) {
            // Manejo de errores
            console.error('Error al crear la respuesta:', error);
            alert('Error al crear la respuesta. Inténtalo de nuevo más tarde.');
        }
    };

    return (
        <div>
            <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Escribe tu respuesta aquí"
            />
            <button onClick={handleCreateReply}>Enviar respuesta</button>
        </div>
    );
};

export default CreateReply;