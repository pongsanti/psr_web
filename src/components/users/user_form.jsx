import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { ButtonGroup, Button, Alert, FormGroup, ControlLabel, Checkbox } from 'react-bootstrap';
import Form from 'react-formal';
import LaddaButton, {S, EXPAND_LEFT } from 'react-ladda'
import PageTitle from '../page_title';
import Stations from './stations';
import FormAlert from '../st_form_alert';
import { userPost, userPatch } from '../../actions';
import getModelSchema from './user_form_schema';

const mapStateToProps = state => {
  const {user} = state;
  return {
    isFetching: user.isFetching,
    curUser: user.curUser,
  }
}

class UserForm extends Component {
  constructor (props) {
    super(props)

    let user = {
      admin: false
    }

    // Initialize edit user fields
    if (props.curUser !== null) {
      const {email, display_name, admin} = props.curUser;
      user = {
        email, display_name, admin
      }
    }

    this.state = {
      user
    };
  }
  
  pageBar (edit) {
    return (
      <div className='page-bar'>
        <ul className="page-breadcrumb">
          <li>
            <Link to='/users'>Users List</Link>
            <i className="fa fa-circle"></i>
          </li>
          <li>
            <span>{edit? 'Edit User' : 'New User'}</span>
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

  formDispatchFetch () {
    const edit = this.edit();
    return edit? userPatch : userPost
  }

  onSubmit () {
    const {dispatch, history} = this.props
    dispatch(this.formDispatchFetch()(this.state.user))
    .then(
      () => history.push('/users'),
      (error) => {/* failure, do not naviagate page. */});
  }

  formMessage (field) {
    return (
      <FormAlert field={field} />
    )
  }

  edit () {
    return this.props.curUser !== null;
  }

  formModel (edit) {
    return edit ? editModelSchema : createModelSchema;
  }

  form () {
    const edit = this.edit();
    const formSchema = getModelSchema(edit);

    return (
      <Form
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

          { !edit && 
            <div>
              <FormGroup>
                <ControlLabel>Password</ControlLabel>
                {this.formMessage('password')}
                <Form.Field className='form-control form-control-solid placeholder-no-fix'
                  type='password' name='password' placeholder='Password' />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Confirm Password</ControlLabel>
                {this.formMessage('confirm_password')}
                <Form.Field className='form-control form-control-solid placeholder-no-fix'
                  type='password' name='confirm_password' placeholder='Confirm password' />
              </FormGroup>
            </div>
          }

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
    const edit = this.edit();
    return (
      <div>
        {!edit && this.pageBar(edit)}
        <PageTitle header={edit? 'Edit User Details' : 'New User'} subHeader='' />
        <div className='portlet light bordered'>
          {this.form()}
        </div>
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps)(UserForm));
