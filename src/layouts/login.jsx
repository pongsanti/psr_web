import React, {Component} from 'react';
// css
import '../assets/global/plugins/font-awesome/css/font-awesome.css';
import '../assets/global/plugins/simple-line-icons/simple-line-icons.css';
import '../assets/global/plugins/bootstrap/css/bootstrap.css';
import '../assets/global/plugins/bootstrap-switch/css/bootstrap-switch.css';

import '../assets/global/css/components.css';
import '../assets/global/css/plugins.css';

import '../assets/pages/css/login.css';

class Login extends Component {
  render () {
    return (
      <div>
        <div className='logo'>

        </div>
        <div className='content'>
          <form className='login-form'>
            <h3 className='form-title font-green'>Sign In</h3>
            <div className='alert alert-danger display-hide'>
              <button className='close' data-close='alert'></button>
              <span> Enter any username and password. </span>
            </div>
            <div className='form-group'>
              <label className='control-label visible-ie8 visible-ie9'>Username</label>
              <input className='form-control form-control-solid placeholder-no-fix' type='text' autoComplete='off' placeholder='Username' name='username' /> </div>
            <div className='form-group'>
              <label className='control-label visible-ie8 visible-ie9'>Password</label>
              <input className='form-control form-control-solid placeholder-no-fix' type='password' autoComplete='off' placeholder='Password' name='password' /> </div>
            <div className='form-actions'>
                <button type='submit' className='btn green uppercase'>Login</button>
                <label className='rememberme check mt-checkbox mt-checkbox-outline'>
                    <input type='checkbox' name='remember' value='1' />Remember
                    <span></span>
                </label>
                <a href='javascript:;' id='forget-password' className='forget-password'>Forgot Password?</a>
            </div>
            <div className='login-options'>
              <h4>Or login with</h4>
              <ul className='social-icons'>
                <li>
                <a className='social-icon-color facebook' data-original-title='facebook' href='javascript:;'></a>
                </li>
                <li>
                  <a className='social-icon-color twitter' data-original-title='Twitter' href='javascript:;'></a>
                </li>
                <li>
                  <a className='social-icon-color googleplus' data-original-title='Goole Plus' href='javascript:;'></a>
                </li>
                <li>
                  <a className='social-icon-color linkedin' data-original-title='Linkedin' href='javascript:;'></a>
                </li>
              </ul>
            </div>
            <div className='create-account'>
              <p>
                  <a href='javascript:;' id='register-btn' className='uppercase'>Create an account</a>
              </p>
            </div>
          </form>          
        </div>
        <div className='copyright'> 2017 © Metronic. Admin Dashboard Template. </div>
      </div>
    )
  }
}

export default Login;
