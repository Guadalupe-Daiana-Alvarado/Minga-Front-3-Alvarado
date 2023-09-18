import chaptersReducer from '../redux/reducers/chapter'
import me_authors from "./reducers/me_authors";
import mangaNews from "./reducers/mangas_news";
import { configureStore } from '@reduxjs/toolkit';
import mangasReducer from './reducers/mangasReducer';


// Combinar los reductores si hay otros//
export const store = configureStore({
    reducer: {
        chapters: chaptersReducer,
        author_reduce: me_authors,
        mangasNews_reduce: mangaNews,
        mangas : mangasReducer
    }

    // Otros reductores aquí...
});

