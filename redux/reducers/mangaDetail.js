import { createReducer } from "@reduxjs/toolkit";
import actions from "../actions/mangaDetail.js";

const { mangaData } = actions
let initialState = { manga: [] }
const reducer = createReducer(initialState, builder => builder.addCase(mangaData.fulfilled,
   (state, action) =>{
    let newState = {
        ...state, manga: action.payload.manga
    }
    return newState
   } 
    )
   
)
export default reducer