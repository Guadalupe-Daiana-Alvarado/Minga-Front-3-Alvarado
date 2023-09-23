import { createAction } from "@reduxjs/toolkit";



const setManga = createAction("newManga", ({manga}) => {
  return {
      payload: {
          manga
      },
  }
})

export default setManga