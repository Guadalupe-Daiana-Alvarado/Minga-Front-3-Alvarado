import chaptersReducer from '../redux/reducers/chapter'
import me_authors from "./reducers/me_authors";
import mangaNews from "./reducers/mangas_news";
import { configureStore } from '@reduxjs/toolkit';
import mangasReducer from './reducers/mangasReducer';
import chapterReduce from './reducers/chapterReduce';
import  myMangasReducer  from './reducers/mangas';
import mangaReduce from './reducers/mangaReduce'
import commentsReducer from './reducers/commentsReducer';
import { loginReducer } from './reducers/login';
import reducerAlert from './reducers/DocuApiRedicers';
import mangaDetailReducer from '../redux/reducers/mangaDetail.js';
import chaptersMangaDetailReducer from './reducers/chaptersMangaDetail';
import { botReducer } from './reducers/botReducer';




export const store = configureStore({
    reducer: {
        chapter: chapterReduce,
        author_reduce: me_authors,
        mangasNews_reduce: mangaNews,
        user_reduce:loginReducer,
        mangas : mangasReducer,
        myMangas: myMangasReducer,
        mangasNew : mangaReduce,
        alert: reducerAlert,
        mangas : mangasReducer,
        botReducer,
        commentsReducer, 
        user_reduce:loginReducer,
        manga: mangaDetailReducer,
        chaptersMangaDetail: chaptersMangaDetailReducer,


        commentsReducer
       
    }

    // Otros reductores aquÃ­...
});
       
 



