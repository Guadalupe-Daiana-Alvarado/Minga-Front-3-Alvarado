import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// Acción para obtener datos de autores
const authorData = createAction("getAuthordata", ({ info }) => {
  return {
    payload: {
      info
    }
  }
});

// Acción para obtener la lista de autores con autenticación
const fetchAuthors = createAsyncThunk('authors', async (token) => {
  try {
    //aca obtengo el token desde donde lo tengo almacenado
    const token = localStorage.getItem("token")
    console.log(token)
    // Configurar los headers con el token
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // Realizar la solicitud con los headers configurados
    const response = await axios.get('http://localhost:8000/authors/admin', { headers });
    console.log(response.data)
    return response.data
  }
  catch (error) {
    console.log(error)
  }
})


// Acción para cambiar el estado de un autor (activar/desactivar)
const toggleAuthorStatus = createAsyncThunk('toggleAuthorStatus', async (author) => {
  try {
    // Cambiar el estado del autor localmente en el frontend
    const updatedAuthor = { ...author, active: !author.active };

    // Actualizar el estado del autor en la base de datos
    await axios.put(`/api/authors/${author.id}`, updatedAuthor);

    // Devolver el autor actualizado como resultado exitoso
    return updatedAuthor;
  } catch (error) {
    // Manejar errores y devolverlos como resultado de error
    throw error;
  }
});

export { authorData, fetchAuthors, toggleAuthorStatus };
