import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const createReplyAction = createAsyncThunk('createReplyAction', async (info, { rejectWithValue }) => {
    try {
        const res = await axios.post(`http://localhost:8000/comments/reply`, {
            parentCommentId: info.parentCommentId,
            text: info.text,
            user_id: info.user_id,
        }, {
            headers: {
                Authorization: "Bearer " + info.token,
            }
        });

        return { reply: res.data.response }; // Aquí corregimos para usar res.data.response
    } catch (error) {
        return rejectWithValue({ error: error.message });
    }
});

export default createReplyAction;