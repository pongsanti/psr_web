import React, {Component} from 'react';
import { Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loginPost, noti_reset } from '../actions'

// import SweetAlert from 'sweetalert-react';
import LaddaButton, {L, EXPAND_LEFT } from 'react-ladda'
import Form from 'react-formal';
import yup from 'yup';
import FormAlert from '../components/st_form_alert';

// css
import '../assets/global/plugins/font-awesome/css/font-awesome.css';
import '../assets/global/plugins/simple-line-icons/simple-line-icons.css';
import '../assets/global/plugins/bootstrap/css/bootstrap.css';
import '../assets/global/plugins/bootstrap-switch/css/bootstrap-switch.css';

import '../assets/global/plugins/ladda/ladda.min.css';
import '../assets/global/css/components.css';
import '../assets/global/css/plugins.css';

import '../assets/pages/css/login-5.css';

import LOGO_IMG from '../assets/images/logo.png';

var defaultStr = yup.string().default('')
var modelSchema = yup.object({
  email: defaultStr.required('Please enter email').email('Email is invalid'),
  password: defaultStr.required('Please enter password')
});

const mapStateToProps = state => {
  const {login} = state;
  return {
    isFetching: login.isFetching,
    user: login.user,
    error: login.error,
  }
}

class Login extends Component {
  constructor (props) {
    super(props)

    const {user} = props
    // Notification
    this.state = {
      showError: false,
      user: {
        email: user.email 
      }
    }
  }

  componentWillMount () {
    document.body.className = '';
    document.body.className = 'login';
    document.body.style.backgroundColor = '#fff';
  }

  componentWillReceiveProps(nextProps) {
    const {dispatch} = this.props

    this.setState({
      ...this.state,
      showError: nextProps.error != null
    })
  }

  onSubmit () {
    this.props.dispatch(loginPost({
      email: this.state.user.email,
      password: this.state.user.password
    }))
    .then(() => this.props.history.push('/dashboard'))
  }

  onFormChange (value) {
    this.setState({
      user: value
    })
  }

  form () {
    return (
      <Form className='login-form'
        schema={modelSchema}
        defaultValue={modelSchema.default()}
        value={this.state.user}
        onChange={this.onFormChange.bind(this)}
        onSubmit={this.onSubmit.bind(this)} >
        <div>
          <FormAlert field={['email', 'password']} />
        </div>
        <div>
          <div className='form-group'>
            <Form.Field className='form-control form-control-solid placeholder-no-fix'
              name='email' placeholder='Email' />
          </div>
          <div className='form-group'>
            <Form.Field className='form-control form-control-solid placeholder-no-fix'
              type='password' name='password' placeholder='Password' />
          </div>
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
      <div className='user-login-5'>
        <div className='row bs-reset'>
          <div className='col-md-6 bs-reset mt-login-5-bsfix'>
            <div className='login-bg' >
              <img className='login-logo' src={LOGO_IMG} />
            </div>
          </div>
          <div className='col-md-6 login-container bs-reset mt-login-5-bsfix'>
            <div className='login-content'>
              <h1>Smart Track</h1>
              <p> Lorem ipsum dolor sit amet, coectetuer adipiscing elit sed diam nonummy et nibh euismod aliquam erat volutpat. Lorem ipsum dolor sit amet, coectetuer adipiscing. </p>
              {this.form()}
            </div>
            <div className='login-footer'>
              <div className='row bs-reset'>
                <div className='col-xs-4 bs-reset'>
                  <ul className='login-social'>
                    <li>
                      <a href='javascript:;'>
                        <i className='icon-social-facebook'></i>
                      </a>
                    </li>
                    <li>
                      <a href='javascript:;'>
                        <i className='icon-social-twitter'></i>
                      </a>
                    </li>
                    <li>
                      <a href='javascript:;'>
                        <i className='icon-social-dribbble'></i>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className='col-xs-8 bs-reset'>
                  <div className='login-copyright text-right'>
                    <p>Copyright &copy; 2017 © Hatyai Pongsiri Forwarding Co.,LTD.</p>
                  </div>
                </div>
              </div>
            </div>            
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps)(Login));
