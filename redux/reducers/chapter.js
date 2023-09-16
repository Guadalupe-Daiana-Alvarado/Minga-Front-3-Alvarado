// m01-store//
// Importe aqui  el tipo de acción
//reducers//
import { setChapterData } from '../actions/Chapters';
import { createReducer } from '@reduxjs/toolkit';

// Estado inicial
const initialState = {
    number: [],
    title: [""]
};

// Reductor para cargar los estados globales number y title
const chaptersReducer = createReducer(initialState, (action) =>
    action.addCase(setChapterData, (state, action) => {
        console.log(action.payload)

        // aca se estan guardando los nuevos  valores  a los estados//
        const newEstado = {
            ...state,
            number: action.payload,
            title: action.payload,
        };
        return newEstado
    })
);

export default chaptersReducer


