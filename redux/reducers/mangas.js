import { createReducer } from "@reduxjs/toolkit";
import actions from "../actions/mangas";
const { myMangas, mangaUpdate, mangaDelete } = actions
let initialState = {
  mangas: []
}

const reducer = createReducer(initialState, (builder) => builder.addCase(myMangas.fulfilled, (state, action) => {
  let newState = { ...state, mangas: action.payload.mangas }
  return newState
}).addCase(mangaDelete.fulfilled, (state, action) => {
  let newState = { ...state, mangas: state.mangas.filter(each => each._id !== action.payload.delete) }
  return newState
}).addCase(mangaUpdate.fulfilled, (state, action) => {
  let newState = {
    ...state, mangas: state.mangas.map(manga => {
      if (manga._id === action.payload.data) {
        return action.payload.data
      } else {
        return manga
      }

    })

  }
  return newState
}))

export default reducer