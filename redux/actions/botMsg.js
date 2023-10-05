import { createAction } from "@reduxjs/toolkit";

const botMsg = createAction("set msg", (msg) => {
    return {
        payload: msg
    }
})

export { botMsg }