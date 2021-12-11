import { apiCall } from "../../services/api";
import { addError, removeError } from "./errors";
import { LOAD_MESSAGES, REMOVE_MESSAGE, ADD_MESSAGE } from "../actionTypes";
import { setProfileImage } from "./user";

export const loadMessages = messages => ({
    type: LOAD_MESSAGES,
    messages
})

export const remove = id => ({
    type: REMOVE_MESSAGE,
    id
})

export const add = message => ({
    type: ADD_MESSAGE,
    message
})

export const fetchMessages = username => {
    return dispatch => {
        const url = !username ? '/api/messages' : `/api/users/${username}`;
        return apiCall('GET', url)
            .then(data => {
                if (username) dispatch(setProfileImage(data.profileImageUrl))
                let messages = !username ? data : data.messages
                dispatch(loadMessages(messages));
                dispatch(removeError())
                return true
            })
            .catch(error => {
                dispatch(loadMessages([]))
                dispatch(addError(error))
                return false;
            });
    }
}

export const postMessage = text => {
    return (dispatch, getState) => {
        const username = getState().currentUser.user.username;
        return apiCall('POST', `/api/users/${username}/messages`, { text })
            .then(message => dispatch(add(message)))
            .catch(error => dispatch(addError(error)))
    }
}

export const removeMessage = (username, message_id) => {
    return dispatch => {
        return apiCall('DELETE', `/api/users/${username}/messages/${message_id}`)
            .then(() => dispatch(remove(message_id)))
            .catch(error => dispatch(addError(error)))
    }
}