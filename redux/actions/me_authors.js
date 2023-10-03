import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// Acción para obtener datos de autores
const authorData = createAction("getAuthordata", ({ info }) => {
  return {
    payload: 
      info
    }
  }
)


// Acción para cambiar el estado de un autor (activar/desactivar)
const toggleAuthorStatus = createAsyncThunk('toggleAuthorStatus', async (author) => {
  try {
    // Cambiar el estado del autor localmente en el frontend
    const updatedAuthor = { ...author, active: !author.active };

    // Actualizar el estado del autor en la base de datos
    await axios.put(`/api/authors/${author._id}`, updatedAuthor);

    // Devolver el autor actualizado como resultado exitoso
    return updatedAuthor;
  } catch (error) {
    // Manejar errores y devolverlos como resultado de error
    throw error;
  }
});

export { authorData, fetchAuthors, toggleAuthorStatus };
