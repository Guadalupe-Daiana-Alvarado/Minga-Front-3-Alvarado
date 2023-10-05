// aca va el reductor//
//Aquí definirás el reductor que gestionará el estado en Redux//
// reducers.js
import { SHOW_SUCCESS_ALERT, SHOW_ERROR_ALERT } from '../actions/DocuApiActions';

const initialState = {
    showSuccessAlert: false,
    showErrorAlert: false,
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_SUCCESS_ALERT:
            return {
                ...state,
                showSuccessAlert: true,
            };
        case SHOW_ERROR_ALERT:
            return {
                ...state,
                showErrorAlert: true,
            };
        default:
            return state;
    }
};

export default rootReducer;
