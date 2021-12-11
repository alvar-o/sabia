import { SET_PROFILE_IMAGE } from "../actionTypes";

export default (state = null, action) => {
    switch (action.type) {
        case SET_PROFILE_IMAGE:
            if (!action.url) return null
            return action.url
        default:
            return state;
    }
}