import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const api = 'http://localhost:8000';  
const myMangas = createAsyncThunk('myMangas', async () => {
  
  try {
    const userToken = localStorage.getItem("token")
    const headers = { headers: { "authorization": `Bearer ${userToken}` } }
    let res = await axios.get(api + '/mangas/me',headers)
    console.log(res)
    return {mangas:res.data.mangas}

  } catch (error) {
    console.log(error)
    return {mangas:[]}
  }
})

const mangaDelete =createAsyncThunk('mangaDelete', async ({id}) => {
  try {
    const userToken = localStorage.getItem("token")
    const headers = { headers: { "authorization": `Bearer ${userToken}` } }
    let res = await axios.delete(api + '/mangas/'+ id ,headers)
    return {delete:id}
  } catch (error) {
    return {mangas:[]}
  }
})

const mangaUpdate =createAsyncThunk('mangaUpdate', async ({id,data}) => {
  try {
    const userToken = localStorage.getItem("token")
    const headers = { headers: { "authorization": `Bearer ${userToken}` } }
    let res = await axios.put(api + '/mangas/'+ id, data ,headers)
    return {data:res.data.manga}
  } catch (error) {
    alert('No se actualizo el manga')
    
  }
})

const actions = {myMangas,mangaUpdate,mangaDelete}

export default actions