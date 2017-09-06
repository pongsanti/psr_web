import React, {Component} from 'react';
import { connect } from 'react-redux';
import { loginPost } from '../actions'
import SweetAlert from 'sweetalert-react';
import LaddaButton, {L, EXPAND_LEFT } from 'react-ladda'

// css
import '../assets/global/plugins/font-awesome/css/font-awesome.css';
import '../assets/global/plugins/simple-line-icons/simple-line-icons.css';
import '../assets/global/plugins/bootstrap/css/bootstrap.css';
import '../assets/global/plugins/bootstrap-switch/css/bootstrap-switch.css';

import '../assets/global/plugins/ladda/ladda.min.css';
import '../assets/global/css/components.css';
import '../assets/global/css/plugins.css';

import '../assets/pages/css/login.css';

import 'sweetalert/dist/sweetalert.css';

import LOGO_IMG from '../assets/images/logo.png';

const mapStateToProps = state => {
  const {login} = state;
  return {
    isFetching: login.isFetching,
    email: login.email,
    error: login.error
  }
}

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: props.email,
      password: '',
      showError: false
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.state,
      email: nextProps.email,
      showError: nextProps.error != null
    })
  }

  onSubmit () {
    this.props.dispatch(loginPost({
      email: this.state.email,
      password: this.state.password
    }))
  }

  onEmailChange (event) {
    this.setState({
      email: event.target.value
    })
  }

  onPasswordChange (event) {
    this.setState({
      password: event.target.value
    })
  }

  render () {
    return (
      <div>
        <div className='logo'>
          <img src={LOGO_IMG} />
        </div>       
        <div className='content'> 
          <form className='login-form'>           
            <h3 className='form-title font-green'>Sign In</h3>
            <div className='alert alert-danger display-hide'>
              <button className='close' data-close='alert'></button>
              <span> Enter any email and password. </span>
            </div>
            <div className='form-group'>
              <label className='control-label visible-ie8 visible-ie9'>Email</label>
              <input className='form-control form-control-solid placeholder-no-fix' type='text' autoComplete='off' placeholder='Email' name='email'
                onChange={this.onEmailChange.bind(this)}
                value={this.state.email} /></div>
            <div className='form-group'>
              <label className='control-label visible-ie8 visible-ie9'>Password</label>
              <input className='form-control form-control-solid placeholder-no-fix' type='password' autoComplete='off' placeholder='Password' name='password'
                onChange={this.onPasswordChange.bind(this)}
                value={this.state.password} /></div>
            <div className=''>
              <LaddaButton className='btn green uppercase'
                loading={this.props.isFetching}
                onClick={this.onSubmit.bind(this)}
                data-style={EXPAND_LEFT}
                data-spinner-size={30}
              >Login</LaddaButton>
                {/* <label className='rememberme check mt-checkbox mt-checkbox-outline'>
                    <input type='checkbox' name='remember' value='1' />Remember
                    <span></span>
                </label> */}
                {/* <a href='javascript:;' id='forget-password' className='forget-password'>Forgot Password?</a> */}
            </div>
            <SweetAlert
              show={this.state.showError}
              title='Sorry - Something went wrong.'
              type='error'
              text={this.props.error}
              onConfirm={() => this.setState({ showError: false })}
              confirmButtonColor='#DD6B55'
            />            
            {/* <div className='login-options'>
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
            </div> */}
            {/* <div className='create-account'>
              <p>
                  <a href='javascript:;' id='register-btn' className='uppercase'>Create an account</a>
              </p>
            </div> */}
          </form>          
        </div>
        <div className='copyright'> 2017 © Hatyai Pongsiri Forwarding Co.,LTD. </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Login);
