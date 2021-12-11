import { apiCall } from "../../services/api";
import { SET_CURRENT_USER } from "../actionTypes";
import { addError, removeError } from "./errors";

export const setCurrentUser = user => {
    return ({
        type: SET_CURRENT_USER,
        user
    })
}

export const authUser = (type, userData) => {
    return dispatch => {
        return apiCall('POST', `/api/auth/${type}`, userData)
            .then(({ token, error, ...user }) => {
                if (error) throw error;
                localStorage.setItem('jwtToken', token);
                dispatch(setCurrentUser(user));
                dispatch(removeError())
                return true
            })
            .catch(error => {
                dispatch(addError(error))
                return false
            })
    }
} 

export const logout = () => {
    return dispatch => {
        localStorage.clear();
        dispatch(setCurrentUser({}));
    }
}