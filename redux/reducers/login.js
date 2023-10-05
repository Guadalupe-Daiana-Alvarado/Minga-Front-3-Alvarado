import { createReducer } from "@reduxjs/toolkit";
import { login } from "../actions/login";

const initialState = {
  user: {role: -1},
  token: ''
};

export const loginReducer = createReducer(initialState, (builder) => {
  return builder.addCase(login.fulfilled, (state, action) => {
      return {...state,user:action.payload.user, token:action.payload.token}
    })
    // Otros casos de reducción pueden agregarse aquí si es necesario
   
});
