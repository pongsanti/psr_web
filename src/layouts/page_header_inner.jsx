import React, {Component} from 'react';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import PageLogo from './page_logo'

import {logoutDelete} from '../actions'

const mapStateToProps = state => {
  const {login} = state;
  return {
    user: login.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logoutDelete())
  }
}

class PageHeaderInner extends Component {

  onLogoutSelect () {
    this.props.logout()
    .then(() => this.props.history.push('/'));
  }

  render () {
    const displayName = this.props.user.display_name;
    const {email} = this.props.user;

    return (
      <div className='page-header-inner'>
        <PageLogo />
        <a href='javascript:;' className='menu-toggler responsive-toggler' data-toggle='collapse' data-target='.navbar-collapse'>
          <span></span>
        </a>
        <div className='top-menu'>
          <Nav pullRight navbar className='pull-right'>
            <NavDropdown eventKey={3}
              title={<span className='username username-hide-on-mobile'>{displayName} ({email})<i className="fa fa-angle-down"></i></span>}
              id='user-dropdown'
              className='dropdown-user'
              noCaret>
              <MenuItem eventKey={3.1} onSelect={this.onLogoutSelect.bind(this)}>Logout</MenuItem>
            </NavDropdown>
          </Nav>
          {/* <ul className='nav navbar-nav pull-right'>
            <li className='dropdown dropdown-extended dropdown-notification' id='header_notification_bar'>
            </li>
            <li className='dropdown dropdown-extended dropdown-index' id='header_inbox_bar'>
            </li>
            <li className='dropdown dropdown-extended dropdown-tasks' id='header_task_bar'>
            </li>
            <li className='dropdown dropdown-user'>
              <a href="javascript:;" className="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
                <span className="username username-hide-on-mobile">Nick</span>
                <i className="fa fa-angle-down"></i>
              </a>        
            </li>
            <li className='dropdown dropdown-quick-sidebar-toggler'>
              <a href='javascript:;' className='dropdown-toggle'>
                <i className="icon-logout"></i>
              </a>              
            </li>
          </ul> */}
        </div>
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PageHeaderInner));
