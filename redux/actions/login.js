import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const api = 'http://localhost:8000';
// Acción asincrónica para iniciar sesión
export const login = createAsyncThunk('login', async (data) => {
  
  try {
    let res = await axios.post(api + '/auth/signin', data)
    localStorage.setItem('token', res.data.token);
    let user = JSON.stringify(res.data.user);
    localStorage.setItem('user', user);
    
    return res.data


  } catch (error) {
    console.log("error",error)
  }
})

