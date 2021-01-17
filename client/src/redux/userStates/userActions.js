import {THEME,ROOM,CLASS} from './userTypes'

export const changeTheme = ()=>{
    return{
        type:THEME
    }
}

export const room =(data)=>{
    return{
        type:ROOM,
        payload:data
    }
}

export const classs = ()=>{
    return{
        type:CLASS,  
    }
}

