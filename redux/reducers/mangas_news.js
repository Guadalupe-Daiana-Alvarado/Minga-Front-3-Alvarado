import { createReducer } from "@reduxjs/toolkit";
import mangasData from "../actions/manga_news";

const initialState = {
  mangas_news: {} 
}
// Se actualiza el estado
const mangaNews = createReducer(initialState, (builder) => 
  builder
    .addCase(mangasData, (state, action) =>{
      const newState = {
        ... state, // Este spread copia el estado inicial
        mangas_news: action.payload.info_mangas
      }
      return newState
    } )
)

export default mangaNews