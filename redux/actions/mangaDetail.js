import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const mangaData = createAsyncThunk('mangaDetail', async ({id}) => {
  
    try {
      const userToken = localStorage.getItem("token")
      const headers = { headers: { "authorization": `Bearer ${userToken}` } }
      const res = await axios.get(`http://localhost:8000/mangas/${id}`, headers)
     return {manga: res.data}
    } catch (error) {
      console.log(error)
      return {manga: []}
    }
  })
  
  const chaptersData = createAsyncThunk('chapter', async ({id, currentPage}) => {
  
    try {
      const userToken = localStorage.getItem("token")
      const headers = { headers: { "authorization": `Bearer ${userToken}` } }
      const res =  await axios.get(`http://localhost:8000/chapters/?manga_id=${id}&page=${currentPage}`, headers)
        return {chapters: res.data}
    } catch (error) {
      
      return {chapters: []}
    }
  })

  const actions = {mangaData, chaptersData}
  export default actions