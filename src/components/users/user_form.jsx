import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { ButtonGroup, Button, Alert } from 'react-bootstrap';
import Form from 'react-formal';
import yup from 'yup';
import LaddaButton, {L, EXPAND_LEFT } from 'react-ladda'
import PageTitle from '../page_title';

var defaultStr = yup.string().default('')
var modelSchema = yup.object({
  displayName: defaultStr.required('Please enter display name'),
  email: defaultStr.required('Please enter email').email('Email is invalid'),
  password: defaultStr.required('Please enter password').min(8, 'Password too short (8)')
});

class UserForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: {}
    }
  }

  pageBar () {
    return (
      <div className='page-bar'>
        <ul className="page-breadcrumb">
          <li>
            <Link to='/users'>Users List</Link>
            <i className="fa fa-circle"></i>
          </li>
          <li>
            <span>New User</span>
          </li>
        </ul>
      </div>
    )
  }

  onFormChange (value) {
    this.setState({
      user: value
    })
  }

  onSubmit () {

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
          <Form.Message for={['email', 'displayName', 'password']}>
            { messages => (
              <Alert bsStyle='danger'>
                <ul>
                  {messages.map(msg => <li key={msg}>{msg}</li>)}
                </ul>
              </Alert>
            )}
          </Form.Message>
          <div className='form-group'>
            <label className='control-label visible-ie8 visible-ie9'>Display Name</label>
            <Form.Field className='form-control form-control-solid placeholder-no-fix'
              name='displayName' placeholder='Display Name' />
          </div>              
          <div className='form-group'>
            <label className='control-label visible-ie8 visible-ie9'>Email</label>
            <Form.Field className='form-control form-control-solid placeholder-no-fix'
              name='email' placeholder='Email' />
          </div>
          <div className='form-group'>
            <label className='control-label visible-ie8 visible-ie9'>Password</label>
            <Form.Field className='form-control form-control-solid placeholder-no-fix'
              type='password' name='password' placeholder='Password' />
          </div>         
        </div>
        <Form.Button type='submit' component={LaddaButton}
          className='btn green uppercase'
          loading={this.props.isFetching}
          data-style={EXPAND_LEFT}
          data-spinner-size={30}>Submit</Form.Button>
    </Form>)
  }  

  render () {
    return (
      <div>
        {this.pageBar()}
        <PageTitle header='New User' subHeader='' />
        <div className='portlet light bordered'>
          {this.form()}
        </div>
      </div>
    )
  }
}

export default UserForm;
