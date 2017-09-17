import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ButtonGroup, Button, Alert, FormGroup, ControlLabel, Checkbox } from 'react-bootstrap';
import Form from 'react-formal';
import LaddaButton, {S, EXPAND_LEFT } from 'react-ladda'

import PageTitle from '../page_title';
import FormAlert from '../st_form_alert';
import changePasswordModelSchema from './change_password_form_schema';

import { changePasswordPost } from '../../actions'

const mapStateToProps = state => {
  const {change_password} = state;
  return {
    isFetching: change_password.isFetching
  }
}

class ChangePassword extends Component {
  constructor (props) {
    super(props)

    this.state = {
      change_password_model: {}
    }
  }

  pageBar () {
    return (
      <div className='page-bar'>
        <ul className="page-breadcrumb">
          <li>
            <span>Change Password</span>
          </li>
        </ul>
      </div>
    )
  }

  formMessage (field) {
    return (
      <FormAlert field={field} />
    )
  }

  onFormChange (value) {
    this.setState({
      change_password_model: value
    });
  }

  onSubmit () {
    const {dispatch, history} = this.props
    dispatch(changePasswordPost(this.state.change_password_model))
    .then(
      () => history.push('/dashboard'),
      (error) => {/* failure, do not naviagate page. */});
  }  

  form () {
    return (
      <Form className='login-form'
        schema={changePasswordModelSchema}
        defaultValue={changePasswordModelSchema.default()}
        value={this.state.change_password_model}
        onChange={this.onFormChange.bind(this)}
        onSubmit={this.onSubmit.bind(this)} >
        <div>
          <FormGroup>
            <ControlLabel>Current Password</ControlLabel>
            {this.formMessage('old_password')}
            <Form.Field className='form-control form-control-solid placeholder-no-fix'
              type='password' name='old_password' placeholder='Your password' />
          </FormGroup>
          <FormGroup>
            <ControlLabel>New Password</ControlLabel>
            {this.formMessage('new_password')}
            <Form.Field className='form-control form-control-solid placeholder-no-fix'
              type='password' name='new_password' placeholder='New password' />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Confirm New Password</ControlLabel>
            {this.formMessage('confirm_new_password')}
            <Form.Field className='form-control form-control-solid placeholder-no-fix'
              type='password' name='confirm_new_password' placeholder='Confirm new password' />
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
        <PageTitle header='Change Password' subHeader='' />
        <div className='portlet light bordered'>
          {this.form()}
        </div>        
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps)(ChangePassword));
