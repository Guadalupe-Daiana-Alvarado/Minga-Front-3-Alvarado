//aca  va la accion//
//Aquí definirás las acciones que cambiarán el estado en Redux.//
// actions.js

export const SHOW_SUCCESS_ALERT = 'SHOW_SUCCESS_ALERT';
export const SHOW_ERROR_ALERT = 'SHOW_ERROR_ALERT';

export const showSuccessAlertAction = () => ({
    type: SHOW_SUCCESS_ALERT,
});

export const showErrorAlertAction = () => ({
    type: SHOW_ERROR_ALERT,
});
