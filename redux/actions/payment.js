import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const api = 'http://localhost:8000';

export const payment = createAsyncThunk ('payment', async (data) =>{
  try {
    let res = await axios.post (api + 'payments/create-order',data)
    console.log(res)
  } catch (error) {
    console.log(error)
  }
})