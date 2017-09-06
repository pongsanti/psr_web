import React, {Component} from 'react';
import { Alert } from 'react-bootstrap';
import NotificationSystem from 'react-notification-system';
import { connect } from 'react-redux';
import { 
  loginPost,
  noti_push,
  noti_clear } from '../actions'
import SweetAlert from 'sweetalert-react';
import LaddaButton, {L, EXPAND_LEFT } from 'react-ladda'
import Form from 'react-formal';
import yup from 'yup';

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

var defaultStr = yup.string().default('')
var modelSchema = yup.object({
  email: defaultStr.required('Please enter email').email('Email is invalid'),
  password: defaultStr.required('Please enter password')
});

const mapStateToProps = state => {
  const {noti, login} = state;
  return {
    isFetching: login.isFetching,
    email: login.email,
    error: login.error,
    showNoti: noti.showNoti,
    notiMessage: noti.message
  }
}

class Login extends Component {
  constructor (props) {
    super(props)

    // Notification
    this._notificationSystem = null;

    this.state = {
      email: props.email,
      password: '',
      showError: false
    }
  }

  // Notification system
  _addNotification (message) {
    this._notificationSystem.addNotification({
      title: 'Sorry - Something went wrong.',
      message,
      level: 'error',
      position: 'tc',
    });
    this.props.dispatch(noti_clear());
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.state,
      email: nextProps.email,
      showError: nextProps.error != null
    })
    if (nextProps.showNoti) {
      this._addNotification(nextProps.notiMessage)
    }
  }

  onSubmit () {
    this.props.dispatch(loginPost({
      email: this.state.email,
      password: this.state.password
    }))
  }

  onEmailChange (value) {
    this.setState({
      email: value
    })
  }

  onPasswordChange (value) {
    this.setState({
      password: value
    })
  }

  form () {
    return (
      <Form className='login-form'
        schema={modelSchema}
        defaultValue={modelSchema.default()}
        onSubmit={this.onSubmit.bind(this)} >
        <div>
          <div className='form-group'>
            <label className='control-label visible-ie8 visible-ie9'>Email</label>
            <Form.Field className='form-control form-control-solid placeholder-no-fix' name='email' placeholder='Email'
              onChange={this.onEmailChange.bind(this)}
              value={this.state.email}/>
          </div>
          <div className='form-group'>
            <label className='control-label visible-ie8 visible-ie9'>Password</label>
            <Form.Field className='form-control form-control-solid placeholder-no-fix' type='password' name='password' placeholder='Password'
              onChange={this.onPasswordChange.bind(this)}
              value={this.state.password}/>
          </div>
          <Form.Message for={['email', 'password']}>
            { messages => (
              <Alert bsStyle='danger'>
                <ul>
                  {messages.map(msg => <li key={msg}>{msg}</li>)}
                </ul>
              </Alert>
            )}
          </Form.Message>          
        </div>
        <Form.Button type='submit' component={LaddaButton}
          className='btn green uppercase'
          loading={this.props.isFetching}
          data-style={EXPAND_LEFT}
          data-spinner-size={30}>Login</Form.Button>
    </Form>)
  }

  render () {
    return (
      <div>
        <NotificationSystem ref={(noti) => { this._notificationSystem = noti; }} />
        <div className='logo'>
          <img src={LOGO_IMG} />
        </div>       
        <div className='content'>
          <h3 className='form-title font-green'>Smart Track</h3>
          {this.form()}
          {/* <div className='alert alert-danger display-hide'>
            <button className='close' data-close='alert'></button>
            <span> Enter any email and password. </span>
          </div> */}
            {/* <label className='rememberme check mt-checkbox mt-checkbox-outline'>
                <input type='checkbox' name='remember' value='1' />Remember
                <span></span>
            </label> */}
            {/* <a href='javascript:;' id='forget-password' className='forget-password'>Forgot Password?</a> */}
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
        </div>
        <div className='copyright'> 2017 © Hatyai Pongsiri Forwarding Co.,LTD. </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Login);
