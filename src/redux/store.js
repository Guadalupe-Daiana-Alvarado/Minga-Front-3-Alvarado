import { configureStore } from "@reduxjs/toolkit";
import me_authors from "../redux/reducers/me_authors.js";
import mangaReducer from '../redux/reducers/mangaReduce.js';

const rootReducer = {
  author_reduce: me_authors,
  manga: mangaReducer,
  // Otros reductores si los tienes
};

export const store = configureStore({
  reducer: rootReducer,
  // Otras configuraciones de Redux Toolkit si las tienes
});
