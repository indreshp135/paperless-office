import * as type from './authTypes';

const initialState = {
    token:sessionStorage.getItem('token'),
    isAuthenticated:null,
    user:null,
    registerMessage:null,
    resend:false
};

export default function(state=initialState, action){
    switch(action.type){
        case type.LOGIN_SUCCESS:
            sessionStorage.setItem('token', action.payload.message.token);
            return {
            ...state,
            ...action.payload.message,
            isAuthenticated: true,
            registerMessage:null,
            };
        case type.REGISTER_SUCCESS:
            return{
                ...state,
                registerMessage:action.payload.msg
            };
        case type.LOGIN_FAIL:
        case type.LOGOUT_SUCCESS:
            sessionStorage.removeItem('token');
            return {
            ...state,
            token: null,
            user: null,
            isAuthenticated: false,
            registerMessage:null,
            };
        case type.REGISTER_FAIL:
            sessionStorage.removeItem('token');
            return {
            ...state,
            token: null,
            user: null,
            isAuthenticated: false,
            registerMessage:null,
            resend:action.payload.resend
            };
        case type.PROFILE_CHANGE:
            return{
                ...state,
                user:{...state.user,photo:action.payload}
            }
        case type.JOIN_CLASS:
            return{
                ...state,
                user:{...state.user,classroom:action.payload}
            }
        case type.TABLE:
            return {
                ...state,
                user:{...state.user,timetable:action.payload.data}
            }
        default:
            return state;
    }
}