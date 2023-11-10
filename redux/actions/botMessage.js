import { createAction } from "@reduxjs/toolkit";

const botMessage = createAction("add message", (message) => {
    return {
        payload: message
    }
})

export { botMessage }
