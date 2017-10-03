import React, {Component} from 'react';
import LOGO_IMG from '../assets/images/head.png';

class PageLogo extends Component {
  render () {
    return (
      <div className='page-logo'>
        <a href='javascript:;'>
          <img src={LOGO_IMG} className='logo-default' style={{marginTop: '12px'}}/>
        </a>
        {/* <div className='menu-toggler sidebar-toggler'>
          <span></span>
        </div>         */}
      </div>
    )  
  }
}

export default PageLogo;
