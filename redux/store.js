import chaptersReducer from '../redux/reducers/chapter'
import me_authors from "./reducers/me_authors";
import mangaNews from "./reducers/mangas_news";
import { loginReducer } from './reducers/login';
import { configureStore } from '@reduxjs/toolkit';
import mangasReducer from './reducers/mangasReducer';
import chapterReduce from './reducers/chapterReduce';

import  myMangasReducer  from './reducers/mangas';

import mangaReduce from './reducers/mangaReduce'




export const store = configureStore({
    reducer: {
        chapter: chapterReduce,
        author_reduce: me_authors,
        mangasNews_reduce: mangaNews,

        user_reduce:loginReducer,
        mangas : mangasReducer,
        myMangas: myMangasReducer,

        mangas : mangasReducer,
        mangasNew : mangaReduce

    }

   
});

