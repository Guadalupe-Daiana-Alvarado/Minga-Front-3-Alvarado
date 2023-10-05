import { createAsyncThunk } from "@reduxjs/toolkit"; 
import axios from "axios";

const commentAction = createAsyncThunk('comentario', async (info, { rejectWithValue }) => {
    try {
        const res = await axios.get('http://localhost:8000/comments', {
            params: {
                chapter_id: info.chapter_id,
            },
            headers: {
                Authorization: "Bearer " + info.data.token,
            },
        });

        // Asumo que el servidor devuelve la información del usuario relacionada con cada comentario
        const commentsWithUser = res.data.response.comments.map((comment) => ({
            ...comment,
            userEmail: comment.user_id.email, // Añadir el correo electrónico del usuario al comentario
        }));

        return { comments: commentsWithUser };
    } catch (error) {
        return rejectWithValue({ error: error.message });
    }
});

export default commentAction;