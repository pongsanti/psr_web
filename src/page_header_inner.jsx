import React, {Component} from 'react';
import PageLogo from './page_logo'

class PageHeaderInner extends Component {
  render () {
    return (
      <div className='page-header-inner'>
        <PageLogo />
        <a href='javascript:;' className='menu-toggler responsive-toggler' data-toggle='collapse' data-target='.navbar-collapse'>
          <span></span>
        </a>
        <div className='top-menu'>
          <ul className='nav navbar-nav pull-right'>
            <li className='dropdown dropdown-extended dropdown-notification' id='header_notification_bar'>
            </li>
            <li className='dropdown dropdown-extended dropdown-index' id='header_inbox_bar'>
            </li>
            <li className='dropdown dropdown-extended dropdown-tasks' id='header_task_bar'>
            </li>
            <li className='dropdown dropdown-user'>
            </li>
            <li className='dropdown dropdown-quick-sidebar-toggler'>
              <a href='javascript:;' className='dropdown-toggle'>
                <i className="icon-logout"></i>
              </a>              
            </li>            
          </ul>
        </div>
      </div>
    )
  }
}

export default PageHeaderInner;
