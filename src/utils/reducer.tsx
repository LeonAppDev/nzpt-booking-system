import { combineReducers } from 'redux-immutable';

import highTeaReducer from '../reducers/hightea/reducer';

export default function createReducer() {

    return combineReducers({
        hightea: highTeaReducer
    });
}