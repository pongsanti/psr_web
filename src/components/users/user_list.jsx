import React, {Component} from 'react';
import { connect } from 'react-redux';
import PageTitle from '../page_title';
import { Table } from 'react-bootstrap';
import StPagination from '../st_pagination';
import { userGet } from '../../actions'

const mapStateToProps = state => {
  const {user} = state;
  return {
    users: user.users,
    pager: user.pager
  }
}

class UserList extends Component {
  componentDidMount () {
    this.props.dispatch(userGet());
  }
  
  render () {
    const tbody = this.props.users.map((user, index) => (
      <tr key={user.id}>
        <td>{index + 1}</td>
        <td>{user.email}</td>
        <td>{user.display_name}</td>
      </tr>
    ));

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
            {tbody}
          </tbody>          
        </Table>
        <StPagination pager={this.props.pager} />
      </div>
    )
  }
}

export default connect(mapStateToProps)(UserList);