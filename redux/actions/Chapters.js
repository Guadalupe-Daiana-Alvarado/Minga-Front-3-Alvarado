//M01-store//
// actions//
import { createAction } from "@reduxjs/toolkit"

// Acción para despachar los datos del capítulo
const setChapterData = createAction("chapterdata",
    (info) => {
        return {
            payload: info
        }
    })
export default setChapterData
