import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const deleteAction = createAsyncThunk('deleteAction', async (info, { rejectWithValue }) => {
    try {
        const res = await axios.delete(`http://localhost:8000/comments/${info.commentId}`, {
            headers: {
                Authorization: "Bearer " + info.token
            },
        });
        console.log(res.data.response)
        return { comments: res.data.response };
    } catch (error) {
        console.log(error)
        return rejectWithValue({ error: error.message });
    }
});

export default deleteAction;