import es6promise from 'es6-promise';
es6promise.polyfill();
import 'isomorphic-fetch';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import App from './layouts/app';
import configureStore from './store/configureStore'

const component = () => {
  var element = document.createElement('div');
  element.id = 'root';
  return element; 
}
document.body.appendChild(component());

// store
const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./layouts/app', () => {
    ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>,
      document.getElementById('root'),
    )
  })
}
