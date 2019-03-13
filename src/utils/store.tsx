import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

import createReducer from './reducer';
//import rootSaga from './rootSaga';



export default function configStore(initialState = {})
{
  //  const sagaMiddleware = createSagaMiddleware();

    const middlewares = [
        thunkMiddleware,
   //     sagaMiddleware
    ];
    
  
    const store = createStore(createReducer(), initialState, composeWithDevTools(applyMiddleware(...middlewares)));
    //const store = createStore(createReducer(), initialState, applyMiddleware(...middlewares));
    //sagaMiddleware.run(rootSaga);
    return store;
}