import { combineReducers } from 'redux';
import currentUser from './currentUser';
import errors from './errors';
import messages from './messages';
import userProfileImage from './userProfileImage';

export default combineReducers({
    currentUser,
    errors,
    messages,
    userProfileImage
});
