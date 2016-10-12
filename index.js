import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { queryReducer } from './app/reducers/reducer.js';
import thunkMiddleware from 'redux-thunk';

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware
)(createStore);

class Main extends React.Component {
  render() {
    return (
      <div>
        <p>Hello react!</p>
      </div>
    );
  }
}


ReactDOM.render(
  <Provider store={createStoreWithMiddleware(queryReducer)} >
    <Main />
  </Provider>,
  document.getElementById('example')
);
