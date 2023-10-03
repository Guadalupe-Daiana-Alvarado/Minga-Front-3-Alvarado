import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const commentReplyAction = createAsyncThunk('comentario', async (info, { rejectWithValue }) => {
    try {
        const res = await axios.get('http://localhost:8000/comments', {
            
            headers: {
                Authorization: "Bearer " + info.token,
            },
        });

        // Asumo que el servidor devuelve la información del usuario relacionada con cada comentario
        
        const commentsWithUser = res.data.response.comments.replies_id.user_id.map((comment) => ({
            ...comment,
            userId: comment.replies_id.user_id, // Añadir el correo electrónico del usuario al comentario
        }));

        return { comments: commentsWithUser };
    } catch (error) {
        return rejectWithValue({ error: error.message });
    }
});

export default commentReplyAction;