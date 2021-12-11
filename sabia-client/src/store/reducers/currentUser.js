import { SET_CURRENT_USER } from "../actionTypes";

export default (state = { isAuthenticated: false, user: {} }, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                isAuthenticated: !!Object.keys(action.user).length,
                user: action.user
            }
        default:
            return state;
    }
}