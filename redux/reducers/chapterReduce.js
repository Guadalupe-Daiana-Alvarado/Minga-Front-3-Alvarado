// chapterReducer.js
import {
    EDIT_CHAPTER_REQUEST,
    EDIT_CHAPTER_SUCCESS,
    EDIT_CHAPTER_FAILURE,
    DELETE_CHAPTER_REQUEST,
    DELETE_CHAPTER_SUCCESS,
    DELETE_CHAPTER_FAILURE,
  } from '../actions/types';

  const initialState = {
    chapters: [], // Tu array de capítulos
    loading: false,
    error: null,
  };

  const chapterReducer = (state = initialState, action) => {
    switch (action.type) {
      case EDIT_CHAPTER_REQUEST:
      case DELETE_CHAPTER_REQUEST:
        return {
          ...state,
          loading: true,
        };

      case EDIT_CHAPTER_SUCCESS:
        const updatedChaptersAfterEdit = state.chapters.map((chapter) => {
          if (chapter.id === action.payload.id) {
            return {
              ...chapter,
              ...action.payload.updatedChapter,
            };
          }
          return chapter;
        });

        return {
          ...state,
          chapters: updatedChaptersAfterEdit,
          loading: false,
        };

      case DELETE_CHAPTER_SUCCESS:
        const updatedChaptersAfterDelete = state.chapters.filter(
          (chapter) => chapter.id !== action.payload.id
        );

        return {
          ...state,
          chapters: updatedChaptersAfterDelete,
          loading: false,
        };

      case EDIT_CHAPTER_FAILURE:
      case DELETE_CHAPTER_FAILURE:
        return {
          ...state,
          loading: false,
          error: 'Error al realizar la operación.',
        };

      default:
        return state;
    }
  };

  export default chapterReducer;