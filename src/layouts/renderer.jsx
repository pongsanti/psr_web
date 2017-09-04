import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import SmartTrack from './smart_track';
import Login from './login';

const Renderer = {}

Renderer.unmount = () => {
  ReactDOM.unmountComponentAtNode(document.getElementById('root'))
}

Renderer.renderIndex = () => {
  Renderer.unmount();

  document.body.className = '';
  document.body.classList.add('page-header-fixed', 'page-sidebar-closed-hide-logo', 'page-content-white');
  ReactDOM.render(
    <BrowserRouter>
      <SmartTrack />
    </BrowserRouter>
    ,
    document.getElementById('root')
  )
}

Renderer.renderLogin = () => {
  Renderer.unmount();
  
  document.body.className = 'login';
  ReactDOM.render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
    ,
    document.getElementById('root')
  )
}

export default Renderer;