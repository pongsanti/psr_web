import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './layouts/app';

const component = () => {
  var element = document.createElement('div');
  element.id = 'root';
  return element; 
}

document.body.appendChild(component());
document.body.classList.add('page-header-fixed', 'page-sidebar-closed-hide-logo', 'page-content-white');

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
  ,
  document.getElementById('root')
)