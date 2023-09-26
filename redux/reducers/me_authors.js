import { createReducer } from "@reduxjs/toolkit";
import { authorData, toggleAuthorStatus, fetchAuthors } from "../actions/me_authors";


/*const initialState = {
  profile: {}
}
// Se actualiza el estado
const me_authors = createReducer(initialState, (builder) =>
  builder
    .addCase(authorData, (state, action) => {
      const newState = {
        ...state, // Este spread copia el estado inicial
        profile: action.payload.info
        
      }
      return newState
    })
)
export default me_authors*/


const initialState = {
  authors: [], // Inicialmente vacío
  error: null,
};

const me_authors = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchAuthors.fulfilled, (state, action) => {
      if (action.payload && action.payload.error) {
        state.error = action.payload.error;
        state.authors = [];
      } else {
        state.authors = action.payload;
        state.error = null;
      }
    })


    .addCase(fetchAuthors.rejected, (state, action) => {
      // En caso de un error de red o similar, actualiza el estado con el mensaje de error
      state.error = action.error.message;
    })

    .addCase(toggleAuthorStatus.fulfilled, (state, action) => {
      // Encuentra y actualiza el autor en la lista
      const updatedAuthors = state.authors.map((author) =>
        author.id === action.payload.id ? action.payload : author
      );
      state.authors = updatedAuthors;
      state.error = null;
    })
    .addCase(toggleAuthorStatus.rejected, (state, action) => {
      state.error = action.error.message;
    });
});

export default me_authors;
