import { combineReducers } from 'redux';
import userReducer from './userStates/userReducer'
import authReducer from './auth/authReducer';
//combineReducer
export default combineReducers({
    user:userReducer,
    auth:authReducer
});