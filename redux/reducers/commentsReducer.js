import commentAction from "../actions/commentsAction";
import createComment from "../actions/createCommentAction";
import deleteAction from "../actions/deleteAction";
import editComment from "../actions/editComment";

const initialState = {
    comments: [],
    error: null
}

const commentReducer = (state = initialState, action) => {
    switch (action.type) {
        case commentAction.pending.type:
            return {
                ...state,
                error: null
            };
        case commentAction.fulfilled.type:
            return {
                ...state,
                comments: action.payload.comments,
                error: null
            };
        case commentAction.rejected.type:
            return {
                ...state,
                error: action.payload.error
            };
        case createComment.pending.type:
            return {
                ...state,
                error: null
            };
        case createComment.fulfilled.type:
            return {
                ...state,
                comments: [action.payload.comments].concat(state.comments),
                error: null
            };
        case createComment.rejected.type:
            return {
                ...state,
                error: action.payload.error
            };
        case editComment.pending.type:
            return {
                ...state,
                error: null
            };
        case editComment.fulfilled.type:
            return {
                ...state,
                comments: state.comments.map((comment) => comment._id === action.payload.comments._id ? action.payload.comments : comment),
                error: null
            };
        case editComment.rejected.type:
            return {
                ...state,
                error: action.payload.error
            };
        case deleteAction.pending.type:
            return {
                ...state,
                error: null
            };
        case deleteAction.fulfilled.type:
            return {
                ...state,
                comments: state.comments.filter((comment) => comment._id != action.payload.comments._id),
                error: null
            };
        case deleteAction.rejected.type:
            return {
                ...state,
                error: action.payload.error
            };
        default:
            return state;
    }
}

export default commentReducer;
