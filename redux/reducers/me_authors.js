import { createReducer } from "@reduxjs/toolkit";
import { authorData } from "../actions/me_authors";
import { fetchAuthors, toggleAuthorStatus } from "../actions/me_authors";

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
      state.authors = action.payload; // Almacena la lista de autores cuando se obtienen por primera vez
      state.error = null;
      const newState = { ...state }
      if (action.payload.error) {
        newState.error = action.payload.error
        newState.authors = initialState.authors

      } else {
        newState.authors = action.payload
        newState.error = null
      }
      return newState
    })
    .addCase(fetchAuthors.rejected, (state, action) => {
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
