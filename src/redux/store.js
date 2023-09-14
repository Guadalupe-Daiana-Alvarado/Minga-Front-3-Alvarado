import { configureStore } from "@reduxjs/toolkit";
import me_authors from "./reducers/me_authors";

//Recibe los datos del despacho
export const store = configureStore({ //Lo que va entre llaves son las options
  reducer:{
    author_reduce: me_authors
  }
})