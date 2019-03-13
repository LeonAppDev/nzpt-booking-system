import { takeEvery, put, call } from 'redux-saga/effects';
import axios from 'axios';

import { GET_HIGHTEA, GET_HIGHTEA_SUCCESS, GET_HIGHTEA_FAILURE } from './constant';
import { getHighTeaAPI } from './remote';

export function* HighTeaWatcher( action: any): IterableIterator<any> {
    
    try
    {
        console.log('Saga');
        const highTeaOrders = yield call(axios.get, getHighTeaAPI);
        yield put({type: GET_HIGHTEA_SUCCESS, payload: highTeaOrders });
    }
    catch(error)
    {
        yield put({type: GET_HIGHTEA_FAILURE, payload: error });
    }
}

export function* fetchHighTea(): IterableIterator<any>
{
    yield takeEvery(GET_HIGHTEA, HighTeaWatcher);
}

export default [
    fetchHighTea()
];