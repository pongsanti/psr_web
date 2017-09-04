import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import SmartTrack from './smart_track';
import Login from './login';

class Renderer {
  rootNode () {
    return document.getElementById('root');
  }

  documentBody () {
    return document.body
  }

  unmount () {
    ReactDOM.unmountComponentAtNode(this.rootNode());
  }

  renderIndex () {
    this.unmount();

    this.documentBody().className = '';
    this.documentBody().classList.add('page-header-fixed', 'page-sidebar-closed-hide-logo', 'page-content-white');
    ReactDOM.render(
      <BrowserRouter>
        <SmartTrack />
      </BrowserRouter>
      ,
      this.rootNode()
    );
  }

  renderLogin () {
    this.unmount();
    
    this.documentBody().className = 'login';
    ReactDOM.render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
      ,
      this.rootNode()
    );
  }
}

export default Renderer;