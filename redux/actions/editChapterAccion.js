import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// Acción asincrónica para editar un capítulo
const editChapterAccion = createAsyncThunk(

  "editChapter/editChapterAction",
  async ({ id, info, token }) => {
    console.log(token)
    try {
      const response = await axios.put(
        `http://localhost:8000/chapters/${id}?manga_id=650d77d9ac832ff3f05d52b2`,
        info,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;

    }
  }
);

export default editChapterAccion;