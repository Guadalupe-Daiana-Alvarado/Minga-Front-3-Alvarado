import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Acción asincrónica para eliminar un capítulo
const deleteChapterAction = createAsyncThunk("deleteChapter", async ({id, token}) => {
  try {
    const response = await axios.delete(
      `http://localhost:8000/chapters/${id}?manga_id=650d77d9ac832ff3f05d52b2`,
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    console.log(response);
    return response.data; 
  } catch (error) {
    console.error(error);
    throw error; 
  }
});

export default deleteChapterAction;