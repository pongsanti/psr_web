import React, {Component} from 'react';
import { connect } from 'react-redux';
import PageTitle from '../page_title';
import {Table, Pagination} from 'react-bootstrap';
import { userGet } from '../../actions'

const mapStateToProps = state => {
  const {user} = state;
  return {
    users: user.users
  }
}

class UserList extends Component {
  componentDidMount () {
    this.props.dispatch(userGet());
  }

  render () {
    return (
      <div>
        <PageTitle header='Users' subHeader='users management' />
        <Table responsive striped hover bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Display Name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Table cell</td>
              <td>Table cell</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Table cell</td>
              <td>Table cell</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Table cell</td>
              <td>Table cell</td>
            </tr>
          </tbody>          
        </Table>
        <Pagination
          bsSize="medium"
          items={10}
          activePage={1}
          onSelect={() => {}} />
      </div>
    )
  }
}

export default connect(mapStateToProps)(UserList);