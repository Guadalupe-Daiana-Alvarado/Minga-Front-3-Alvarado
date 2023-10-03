import chaptersReducer from '../redux/reducers/chapter'
import me_authors from "./reducers/me_authors";
import mangaNews from "./reducers/mangas_news";
import { configureStore } from '@reduxjs/toolkit';
import mangasReducer from './reducers/mangasReducer';
import  myMangasReducer  from './reducers/mangas';
import mangaReduce from './reducers/mangaReduce'
import commentsReducer from './reducers/commentsReducer';
import { loginReducer } from './reducers/login';
import myMangasReducer from './reducers/mangas';
import reducerAlert from './reducers/DocuApiRedicers';




export const store = configureStore({
    reducer: {
        chapters: chaptersReducer,
        author_reduce: me_authors,
        mangasNews_reduce: mangaNews,
        user_reduce:loginReducer,
        mangas : mangasReducer,
        myMangas: myMangasReducer,
        mangas : mangasReducer,
        mangasNew : mangaReduce,
        alert: reducerAlert,
        commentsReducer
       
    }

    // Otros reductores aquÃ­...
});
       
 



