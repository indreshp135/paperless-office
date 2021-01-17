import {THEME,ROOM,CLASS} from './userTypes'

const initialState = {
    theme:false,
    roomID:null,
    classname:null,
    started:false
}

export default function (state=initialState,action) {
    switch(action.type){
        case THEME:
            return{
               ...state,
               theme:!state.theme,
            };
        case ROOM:
            return{
                ...state,
                roomID:action.payload.roomID,
                classname:action.payload.classname
            }
        case CLASS:
            return{
                ...state,
                started:!state.started
            }
        default:return state;
    }
}