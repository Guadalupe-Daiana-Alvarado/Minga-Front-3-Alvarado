import { createReducer } from "@reduxjs/toolkit";
import actions from "../actions/mangaDetail.js";


const { chaptersData } = actions
let initialState = { chapters: [] }
const reducer = createReducer(initialState, builder => builder.addCase(chaptersData.fulfilled,
   (state, action) =>{
    let newState = {
        ...state, chapters: action.payload.chapters
    }
    return newState
   } 
    )
   
)
export default reducer