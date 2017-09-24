import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, FormControl, ControlLabel, Col } from 'react-bootstrap';
import LaddaButton, {XS, EXPAND_LEFT } from 'react-ladda';

import { user_search_change, userGet } from '../../actions';

const mapStateToProps = state => {
  const {user} = state;
  return {
    isFetching: user.isFetching,
    search: user.search,
  }
}

class UserSearch extends Component {
  constructor (props) {
    super(props)

    const {search} = props

    this.state = {
      email: search.email || '',
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.search);
  }  
  
  onEmailChange (event) {
    this.setState({
      email: event.target.value
    });
  }

  onSubmit (event) {
    event.preventDefault();
    this.search(this.state);
  }

  onClearClick () {
    this.search({email: ''});
  }

  search (searchObj) {
    const {dispatch} = this.props;
    dispatch(user_search_change(searchObj));
    dispatch(userGet());
  }

  form () {
    return (
      <Form horizontal onSubmit={this.onSubmit.bind(this)}>
        <FormGroup>
          <Col componentClass={ControlLabel} md={1} >Email</Col>
          <Col md={2}>
            <FormControl type='text'
              value={this.state.email}
              placeholder="Search by email"
              onChange={this.onEmailChange.bind(this)} />
          </Col>
          <Col md={3}>
            <LaddaButton
              className='btn green'
              loading={this.props.isFetching}
              data-style={EXPAND_LEFT}
              data-size={XS}
              data-spinner-size={30}>Search</LaddaButton>
            <LaddaButton
              type='button'
              className='btn'
              loading={this.props.isFetching}
              data-style={EXPAND_LEFT}
              data-size={XS}
              data-spinner-size={30}
              onClick={this.onClearClick.bind(this)}>Clear</LaddaButton>              
          </Col>
        </FormGroup>
      </Form>
    )
  }

  render () {
    return (
      <div className='portlet light bordered'>
        {this.form()}
      </div>
    )
  }
}

export default connect(mapStateToProps)(UserSearch);
