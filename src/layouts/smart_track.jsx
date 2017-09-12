import React, {Component} from 'react';
import { connect } from 'react-redux';
import NotificationSystem from 'react-notification-system';
import { Switch, Route, withRouter } from 'react-router-dom'

// css
import '../assets/global/plugins/font-awesome/css/font-awesome.css';
import '../assets/global/plugins/simple-line-icons/simple-line-icons.css';
import '../assets/global/plugins/bootstrap/css/bootstrap.css';
import '../assets/global/plugins/bootstrap-switch/css/bootstrap-switch.css';

import '../assets/global/css/components.css';
import '../assets/global/css/plugins.css';

import '../assets/layouts/layout/css/layout.css';
import '../assets/layouts/layout/css/themes/darkblue.css';
import '../assets/layouts/layout/css/custom.css';

import PageHeaderInner from './page_header_inner'
import PageSidebar from './page_sidebar'

import UserList from '../components/users/user_list';
import UserForm from '../components/users/user_form';
import Dashboard from '../components/users/dashboard';

const mapStateToProps = state => {
  const {noti} = state;
  return {
    
  }
}

class SmartTrack extends Component {
  constructor (props) {
    super(props);
  }

  componentWillMount () {
    document.body.className = '';
    document.body.classList.add('page-header-fixed', 'page-sidebar-closed-hide-logo', 'page-content-white');
  }

  initNotificationObj (noti) {
    global.st_noti = noti;
  }

  componentWillReceiveProps(nextProps) {
    
  }  

  render () {
    return (
      <div className='page-wrapper'>
        <NotificationSystem ref={this.initNotificationObj} />
        <div className='page-header navbar navbar-fixed-top'>
          <PageHeaderInner />
        </div>
        <div className='clearfix'></div>
        <div className='page-container'>
          <div className='page-sidebar-wrapper'>
            <PageSidebar />
          </div>
          <div className='page-content-wrapper'>
            <div className='page-content'>
              <Switch>
                <Route exact path='/dashboard' component={Dashboard} />
                <Route exact path='/users' component={UserList} />
                <Route exact path='/users/new' component={UserForm} />
              </Switch>
            </div>
          </div>
        </div>
        <div className='page-footer'>
          <div className='page-footer-inner'> 2016 &copy; Metronic Theme By
            {/* <a target='_blank' href='http://keenthemes.com'>Keenthemes</a> &nbsp;|&nbsp;
            <a href='http://themeforest.net/item/metronic-responsive-admin-dashboard-template/4021469?ref=keenthemes' title='Purchase Metronic just for 27$ and get lifetime updates for free' target='_blank'>Purchase Metronic!</a> */}
          </div>
          <div className='scroll-to-top'>
            <i className='icon-arrow-up'></i>
          </div>          
        </div>
      </div>

    )
  }
}

export default withRouter(connect(mapStateToProps)(SmartTrack));
