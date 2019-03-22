import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { fromJS } from 'immutable';

import logo from './logo.svg';
import './App.css';
import RouterComponent from './router';
import AppointList from './pages/AppointList';
import configStore from './utils/store';
import { getHighTea } from './reducers/hightea/action';

const initialState = fromJS({});
const initialStore = configStore(initialState);


function renderApp(Router: typeof React.Component) {
    return (
            
            <Provider store={initialStore}>           
              <AppointList />
           </Provider>
           
           )

}

const App = () => renderApp(RouterComponent);
      

export default App;
