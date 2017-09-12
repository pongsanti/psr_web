import React, {Component} from 'react';
import { connect } from 'react-redux';
import PageTitle from '../page_title';
import { Table, Button, ButtonGroup } from 'react-bootstrap';
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
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    this.props.dispatch(userGet());
  }
  
  pageBar () {
    return (
      <div className='page-bar'>
        <ul className="page-breadcrumb">
          <li>
              <a href="index.html">Home</a>
              <i className="fa fa-circle"></i>
          </li>
          <li>
              <a href="#">Blank Page</a>
              <i className="fa fa-circle"></i>
          </li>
          <li>
              <span>Page Layouts</span>
          </li>
        </ul>
        <div className='page-toolbar'>
          <ButtonGroup>
            <Button className='green btn-outline'>New User</Button>
          </ButtonGroup>          
        </div>
      </div>
    )
  }

  render () {
    const tbody = this.props.users.map((user, index) => (
      <tr key={user.id}>
        <td>{index + 1}</td>
        <td>{user.email}</td>
        <td>{user.display_name}</td>
        <td>{user.admin && 'Yes'}</td>
      </tr>
    ));

    console.log(this.props.users)
    return (
      <div>
        {this.pageBar()}
        <PageTitle header='Users' subHeader='users management' />
        <Table responsive striped hover bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Display Name</th>
              <th>Admin?</th>
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