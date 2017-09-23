import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import NotificationSystem from 'react-notification-system';
import Login from './login';
import SmartTrack from './smart_track';
import * as storage from './storage';
import {noti_reset} from '../actions';

import 'react-select/dist/react-select.css';

const mapStateToProps = state => {
  const {noti} = state;
  return {
    noti_obj: noti.noti,
    noti_clear: noti.clear,
  }
}

class App extends Component {
  
  componentDidMount () {
    this._notificationSystem = this.refs.notificationSystem;
  }

  componentWillReceiveProps(nextProps) {
    const {dispatch} = this.props

    if (nextProps.noti_obj) {
      this._notificationSystem.addNotification(nextProps.noti_obj);
      dispatch(noti_reset());
    }

    if (nextProps.noti_clear) {
      this._notificationSystem.clearNotifications();
      dispatch(noti_reset());  
    }
  }
  
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
        <NotificationSystem ref='notificationSystem' />
        {this.routes()}
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps)(App));
