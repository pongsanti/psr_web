import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { ButtonGroup, Button, Alert, FormGroup, ControlLabel } from 'react-bootstrap';
import Form from 'react-formal';
import yup from 'yup';
import LaddaButton, {S, EXPAND_LEFT } from 'react-ladda'
import PageTitle from '../page_title';
import FormAlert from '../st_form_alert';

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

  formMessage (field) {
    return (
      <FormAlert field={field} />
    );
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
          <FormGroup>
            <ControlLabel>Display Name</ControlLabel>
            {this.formMessage('displayName')}
            <Form.Field className='form-control form-control-solid placeholder-no-fix'
              name='displayName' placeholder='Display Name' />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Email</ControlLabel>
            {this.formMessage('email')}
            <Form.Field className='form-control form-control-solid placeholder-no-fix'
              name='email' placeholder='Email' />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Password</ControlLabel>
            {this.formMessage('password')}
            <Form.Field className='form-control form-control-solid placeholder-no-fix'
              type='password' name='password' placeholder='Password' />
          </FormGroup>
        </div>
        <Form.Button type='submit' component={LaddaButton}
          className='btn green'
          loading={this.props.isFetching}
          data-style={EXPAND_LEFT}
          data-size={S}
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
