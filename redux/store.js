import chaptersReducer from '../redux/reducers/chapter'
import me_authors from "./reducers/me_authors";
import mangaNews from "./reducers/mangas_news";
import { configureStore } from '@reduxjs/toolkit';
import mangasReducer from './reducers/mangasReducer';
import chapterReduce from './reducers/chapterReduce';


// Combinar los reductores si hay otros//
export const store = configureStore({
    reducer: {
        chapter: chapterReduce,
        author_reduce: me_authors,
        mangasNews_reduce: mangaNews,
        mangas : mangasReducer
    }

    // Otros reductores aquí...
});

