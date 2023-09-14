import { combineReducers } from 'redux';
import chaptersReducer from '../redux/reducers/chapter'

// Combinar los reductores si hay otros//
const rootReducer = combineReducers({
    chapters: chaptersReducer,
    // Otros reductores aquí...
});


export default store;
