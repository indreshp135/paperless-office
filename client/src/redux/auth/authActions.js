import axios from 'axios';
import { BACKEND } from '../../config';
import * as type from './authTypes';

export const login = ({name,password}) => async(dispatch) =>{
  
    const config = {
        headers: {
          'Content-Type': 'application/json'
        }
    };
    
    const body = JSON.stringify({ name, password });
    await axios.post(`${BACKEND}/users/login`,body,config)
    .then(async(res)=>{
      if(res.data.success)
        await dispatch({
        type:type.LOGIN_SUCCESS,
        payload:res.data
      })
      else{
        dispatch({
          type: type.LOGIN_FAIL
      }); 
      }
    })
    .catch((err) => {
        dispatch({
            type: type.LOGIN_FAIL
        });        
    });
}

export const register = ({name,password})=>async(dispatch)=>{
    // Headers
    const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
    
      // Request body
      const body = JSON.stringify({ name,password });
      await axios.post(`${BACKEND}/users`, body, config)
        .then(async(res)=>{
            await dispatch({
                type: type.REGISTER_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
          dispatch({
            type: type.REGISTER_FAIL,
            payload:err.response.data
          });
        });
}