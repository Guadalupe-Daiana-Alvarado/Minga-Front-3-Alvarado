import { createReducer } from "@reduxjs/toolkit";
import { botMessage } from "../actions/botMessage.js";
import { botMsg } from "../actions/botMsg.js";

const initialState = { //Creamos un objeto initialState que contiene la estructura inicial del estado de la aplicación. En este caso, estamos configurando messages como un arreglo que contiene un mensaje de bienvenida y msg como una cadena vacía.
    messages: [{ value: "Hi, there! I'm Mingabot 🙂 How can I help you? Type '!help' to display my command list", id: "bot" }],
    msg: ""
};

const botReducer = createReducer(initialState, (builder) => //Estamos creando un reductor llamado botReducer utilizando la función createReducer. Este reductor tomará el initialState como punto de partida.
    builder
        .addCase(botMessage, (state, action) => {
            const nuevoEstado = {
                ...state,
                messages: [...state.messages, action.payload]
            };
            return nuevoEstado;
        })
        .addCase(botMsg, (state, action) => {
            const nuevoEstado = {
                ...state,
                msg: action.payload
            };
            return nuevoEstado;
        })
);

export { botReducer };
