import { createAction } from "@reduxjs/toolkit";

const authorData = createAction ("getAuthordata", ({info}) => {
  return {
    payload:
      info
    
  }
})

export default authorData