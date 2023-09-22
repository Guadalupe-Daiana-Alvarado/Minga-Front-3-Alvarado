import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const editComment = createAsyncThunk('editComment', async (info, { rejectWithValue }) => {
    try {
        console.log(info)
        const res = await axios.put(`http://localhost:8080/comments/${info.comment_id}`, 
        {
            text: info.text
        }, {
            headers: {
                Authorization: "Bearer " + info.token
            },
        });

        return { comments: res.data.response };
    } catch (error) {
        console.log(error)
        return rejectWithValue({ error: error.message });
    }
});

export default editComment;
