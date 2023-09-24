import { createReducer } from "@reduxjs/toolkit";
import authorData from "../actions/me_authors";

const initialState = {
  profile: {} 
}
// Se actualiza el estado
const me_authors = createReducer(initialState, (builder) =>
  builder
    .addCase(authorData, (state, action) =>{
      const newState = {
        ... state, // Este spread copia el estado inicial
        profile: action.payload.info
        
      }
      return newState
    })
)
export default me_authors