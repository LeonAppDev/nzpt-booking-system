import { handleActions } from 'redux-actions';
import { fromJS, Map } from 'immutable';
import { getHighTea } from './action';
import { GET_HIGHTEA, GET_HIGHTEA_SUCCESS } from './constant';

const initialState = fromJS({});

export default handleActions({
    [GET_HIGHTEA_SUCCESS]: (state: Map<any,any>, action: any) => {
        
       
        return state.set('hightea',action.payload);
    
    },
}, initialState);