import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom'
import { ButtonGroup, Button, Alert, FormGroup, ControlLabel, Checkbox } from 'react-bootstrap';
import Form from 'react-formal';
import LaddaButton, {S, EXPAND_LEFT } from 'react-ladda'
import PageTitle from '../page_title';
import FormAlert from '../st_form_alert';
import { userPost } from '../../actions';
import formSchema from './user_form_schema';

class UserForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: {
        admin: false
      }
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

  onAdminChange () {
    this.setState({
      user: {
        ...this.state.user,
        admin: !this.state.user.admin
      }
    })
  }

  onSubmit () {
    this.props.dispatch(userPost(this.state.user))
    .then(() => this.props.history.push('/users'))
  }

  formMessage (field) {
    return (
      <FormAlert field={field} />
    )
  }

  form () {
    return (
      <Form className='login-form'
        schema={formSchema}
        defaultValue={formSchema.default()}
        value={this.state.user}
        onChange={this.onFormChange.bind(this)}
        onSubmit={this.onSubmit.bind(this)} >
        <div>
          <FormGroup>
            <ControlLabel>Display Name</ControlLabel>
            {this.formMessage('display_name')}
            <Form.Field className='form-control form-control-solid placeholder-no-fix'
              name='display_name' placeholder='Display Name' />
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
          <FormGroup>
            <Checkbox className='mt-checkbox'
              checked={this.state.user.admin}
              onChange={this.onAdminChange.bind(this)}>Admin</Checkbox>
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

export default withRouter(connect()(UserForm));
