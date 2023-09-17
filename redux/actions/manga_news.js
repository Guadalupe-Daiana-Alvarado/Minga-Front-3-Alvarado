import { createAction } from "@reduxjs/toolkit";

const mangasData= createAction ("getMangasdata", ({info_mangas}) => {
  return {
    payload:{
      info_mangas
    }
  }
})

export default mangasData