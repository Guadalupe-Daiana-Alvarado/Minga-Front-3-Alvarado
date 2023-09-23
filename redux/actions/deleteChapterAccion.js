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
    return response.data; // Puedes devolver la respuesta si es necesario
  } catch (error) {
    console.error(error);
    throw error; // Puedes lanzar el error para que Redux gestione los errores
  }
});

export default deleteChapterAction;