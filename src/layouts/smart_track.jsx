import React, {Component} from 'react';
import { connect } from 'react-redux';
import NotificationSystem from 'react-notification-system';
import addNoti from './noti'

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
import PageBar from './page_bar'

import UserList from '../components/users/user_list';

const mapStateToProps = state => {
  const {noti} = state;
  return {
    showNoti: noti.showNoti,
    notiObj: noti.notiObj
  }
}

class SmartTrack extends Component {
  constructor (props) {
    super(props);
  }

  // Notification system
  _addNotification (notiObj) {
    addNoti(this, notiObj);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.showNoti) {
      this._addNotification(nextProps.notiObj)
    }
  }  

  render () {
    return (
      <div className='page-wrapper'>
        <NotificationSystem ref={(noti) => { this._notificationSystem = noti; }} />
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
              <PageBar />
              <UserList />
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

export default connect(mapStateToProps)(SmartTrack);