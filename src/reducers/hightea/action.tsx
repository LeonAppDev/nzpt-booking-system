import  { createAction } from 'redux-actions';
import axios from 'axios'

import { getHighTeaAPI } from './remote'; 
import { GET_HIGHTEA, GET_HIGHTEA_SUCCESS, GET_HIGHTEA_FAILURE  } from './constant';

//export const getHighTea:any = createAction(GET_HIGHTEA);
export const getHighTeaSuccess:any = createAction(GET_HIGHTEA_SUCCESS);
export const getHighTeaFailure:any = createAction(GET_HIGHTEA_FAILURE);

//const authorization = 'Authorization: Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1NTE2NzU5NzgsImV4cCI6MTU4MzIxMTk3OCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.ChadzPK9WqwIcj0082Viu3v3LSViUl2WHZ52_T6Kqzs';
export const getHighTea:any = ()=> async (dispatch: any) => {
    
    try
    {   
        const response = await axios.get(getHighTeaAPI);
        console.log(response.data);
        
        const action = getHighTeaSuccess(response.data);
        dispatch(action);
    }
    catch(error)
    {
       console.log(error);
    }   
}