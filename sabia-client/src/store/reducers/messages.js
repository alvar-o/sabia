import { LOAD_MESSAGES, REMOVE_MESSAGE, ADD_MESSAGE } from "../actionTypes";

export default (state = [], action) => {
    switch(action.type) {
        case LOAD_MESSAGES:
            return [ ...action.messages ];
        case REMOVE_MESSAGE:
            return state.filter(msg => msg._id !== action.id);
        case ADD_MESSAGE:
            return [ action.message, ...state ]
        default:
            return state;
    }
}