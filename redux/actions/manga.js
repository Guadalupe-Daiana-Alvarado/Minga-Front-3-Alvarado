// actions/manga.js

// Definir el tipo de acción
export const SET_MANGA = 'SET_MANGA';

// Crear la acción para despachar los datos del manga
export const setManga = (mangaData) => ({
  type: SET_MANGA,
  payload: mangaData,
});
