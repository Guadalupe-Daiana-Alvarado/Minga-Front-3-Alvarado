import { combineReducers } from 'redux';
import chaptersReducer from '../redux/reducers/chapter'
import me_authors from "./reducers/me_authors";

// Combinar los reductores si hay otros//
const rootReducer = combineReducers({
    chapters: chaptersReducer,
    author_reduce: me_authors,
    // Otros reductores aquí...
});

