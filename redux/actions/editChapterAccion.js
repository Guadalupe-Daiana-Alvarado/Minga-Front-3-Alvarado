// actions.js
import axios from 'axios';
import { EDIT_CHAPTER_REQUEST, EDIT_CHAPTER_SUCCESS, EDIT_CHAPTER_FAILURE } from './types';

export const editChapterAction = (id, updatedChapter) => async (dispatch) => {
  dispatch({ type: EDIT_CHAPTER_REQUEST });

  try {
    // Realiza la solicitud de edición a la API
    const response = await axios.put(
      `http://localhost:8000/chapters/${id}?manga_id=650d77d9ac832ff3f05d52b2`,
      updatedChapter,
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );

    if (response.status === 200) {
      dispatch({
        type: EDIT_CHAPTER_SUCCESS,
        payload: {
          id,
          updatedChapter,
        },
      });
    } else {
      dispatch({ type: EDIT_CHAPTER_FAILURE });
    }
  } catch (error) {
    dispatch({ type: EDIT_CHAPTER_FAILURE });
  }
};