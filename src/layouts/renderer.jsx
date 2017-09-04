import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import { BrowserRouter } from 'react-router-dom';
import SmartTrack from './smart_track';
import Login from './login';
// store
import configureStore from '../store/configureStore'

const store = configureStore()

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
      <Provider store={store}>
        <BrowserRouter>
          <SmartTrack />
        </BrowserRouter>
      </Provider>
      ,
      this.rootNode()
    );
  }

  renderLogin () {
    this.unmount();
    
    this.documentBody().className = 'login';
    ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
      ,
      this.rootNode()
    );
  }
}

export default Renderer;