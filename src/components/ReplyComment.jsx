import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import  createReplyAction from '../../redux/actions/replyComments'; // Asegúrate de importar la acción correcta

const CreateReply = ({ parentCommentId }) => {
    const [replyText, setReplyText] = useState('');
    const user = useSelector(state => state.user); // Supongamos que tienes un estado de usuario en Redux
    const dispatch = useDispatch();

    const handleCreateReply = async () => {
        try {
            // Verifica si replyText está vacío
            if (!replyText) {
                return alert('El campo de respuesta no puede estar vacío');
            }

            // Crea la respuesta
            const info = {
                parentCommentId, // ID del comentario padre
                email: user.email, // Email del usuario actual (ajusta esto según tu estructura de usuario)
                text: replyText,
                token, // Token de autenticación del usuario
            };

            // Dispatch de la acción para crear la respuesta
            await dispatch(createReplyAction(info));

            // Limpia el campo de respuesta después de enviarlo
            setReplyText('');

            // Puedes manejar el éxito aquí (por ejemplo, mostrar una notificación)
            alert('Respuesta creada con éxito');
        } catch (error) {
            // Puedes manejar el error aquí (por ejemplo, mostrar una notificación de error)
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