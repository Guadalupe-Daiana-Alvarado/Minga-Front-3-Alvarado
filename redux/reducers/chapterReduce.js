  import { createReducer } from "@reduxjs/toolkit";
  import editChapterAccion from "../actions/editChapterAccion.js";
  
  const initialState = {
    chapter: [], 
  };
  
  const chapterReduce = createReducer(initialState, (builder) =>
    builder.addCase(editChapterAccion.fulfilled, (state, action) => {
      // Utiliza los datos de la acción para actualizar el estado
      return {
        ...state,
        chapter: state.chapter.map((chapter) =>
          chapter._id === action.payload._id ? action.payload : chapter
        ),
      };
    })
  );
  
  export default chapterReduce;