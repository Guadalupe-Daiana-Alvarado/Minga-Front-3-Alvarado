// reducers/

import { SET_MANGA } from '../actions/manga';

const initialState = {
  manga: null, // Inicialmente, no hay datos de manga
};

const mangaReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MANGA:
      return {
        ...state,
        manga: action.payload,
      };
    default:
      return state;
  }
};

export default mangaReducer;
