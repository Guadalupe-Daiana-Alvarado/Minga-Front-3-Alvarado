import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const commentAction = createAsyncThunk('comentario', async (info, { rejectWithValue }) => {
    try {
        const res = await axios.get(`http://localhost:8000/comments`, {
            
            params: {
                chapter_id: info.chapter_id,
            },
            headers: {
                Authorization: "Bearer " + info.data.token,
            }
        });
        
        return { comments: res.data.response.comments };
    } catch (error) {
        return rejectWithValue({ error: error.message });
    }
});

export default commentAction;