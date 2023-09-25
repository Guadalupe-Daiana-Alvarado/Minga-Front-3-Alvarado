import chaptersReducer from '../redux/reducers/chapter'
import me_authors from "./reducers/me_authors";
import mangaNews from "./reducers/mangas_news";
import { configureStore } from '@reduxjs/toolkit';
import mangasReducer from './reducers/mangasReducer';
import mangaReduce from './reducers/mangaReduce'
import commentsReducer from './reducers/commentsReducer';
import { loginReducer } from './reducers/login';
import mangaDetailReducer from '../redux/reducers/mangaDetail.js';
import chaptersMangaDetailReducer from './reducers/chaptersMangaDetail';


export const store = configureStore({
    reducer: {
        chapters: chaptersReducer,
        author_reduce: me_authors,
        mangasNews_reduce: mangaNews,
        mangas : mangasReducer,
        mangasNew : mangaReduce,
        commentsReducer, 
        user_reduce:loginReducer,
        manga: mangaDetailReducer,
        chaptersMangaDetail: chaptersMangaDetailReducer,

    }

    // Otros reductores aquÃ­...
});



