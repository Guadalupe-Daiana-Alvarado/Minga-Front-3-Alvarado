import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const deleteAction = createAsyncThunk('deleteAction', async (info, { rejectWithValue }) => {
    try {
        console.log("Intentando eliminar comentario con ID:", info.comment_id);
        const res = await axios.delete(`http://localhost:8000/comments/${info.comment_id}`, {
            headers: {
                Authorization: "Bearer " + info.token
            },
        });
        console.log(res.data.response)
        return { comments: res.data.response,
        comment_id: info.comment_id};
    } catch (error) {
        console.log(error)
        return rejectWithValue({ error: error.message });
    }
});

export default deleteAction;