import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const createComment = createAsyncThunk('createComentario', async (info, { rejectWithValue }) => {
    console.log("createcomment")
    console.log(info.token)
    try {
        const res = await axios.post('http://localhost:8000/comments', info, {
            headers: {
                Authorization: "Bearer " + info.token
            },
        });
        
        return { comments: res.data.response };
    } catch (error) {
        return rejectWithValue({ error: error.message });
    }
});


export default createComment;
