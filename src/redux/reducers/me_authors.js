import { createReducer } from "@reduxjs/toolkit";
import authorData from "../actions/me_authors";

const initialState = {
  authors: []
}
// Se actualiza el estado
const me_authors = createReducer(initialState, (builder) =>
  builder
    .addCase(authorData, (state, action) => {
      console.log(action);
      console.log(action.payload);
      const newState = {
        ...state, // Este spread copia el estado inicial
        authors: []
      }
      return newState
    })
)
export default me_authors