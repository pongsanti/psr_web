import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './login';
import SmartTrack from './smart_track';
import * as storage from './storage';

class App extends Component {
  
  loggedInRoutes () {
    return (
      <Switch>
        <Route component={SmartTrack} />
      </Switch>
    )
  }

  notLoggedInRoutes () {
    return (
      <Switch>
        <Route component={Login} />
      </Switch>
    )
  }

  routes () {
    return (storage.isLoggedIn()) ?
      this.loggedInRoutes() :
      this.notLoggedInRoutes();
  }

  render () {
    return (
      <div>
        {this.routes()}
      </div>
    )
  }
}

export default App;
