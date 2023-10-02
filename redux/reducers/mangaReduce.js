import { createReducer } from '@reduxjs/toolkit';
import setManga from '../actions/manga';

const initialState = {
  manga: {}
};

const mangaReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(setManga, (state, action) => {
      const newState = {
        ...state,
        manga: action.payload.manga
      }
      return newState
    })

)
export default mangaReducer;
