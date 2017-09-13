import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PageTitle from '../page_title';
import { Table, Button, ButtonGroup, Label } from 'react-bootstrap';
import StPagination from '../st_pagination';
import StTableHeader from '../st_table_header';
import StTableHeaderGroup from '../st_table_header_group';
import { userGet, user_header_click } from '../../actions'

const mapStateToProps = state => {
  const {user} = state;
  return {
    users: user.users,
    pager: user.pager,
    sortField: user.sort.field
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
          {/* <li>
              <a href="index.html">Home</a>
              <i className="fa fa-circle"></i>
          </li>
          <li>
              <a href="#">Blank Page</a>
              <i className="fa fa-circle"></i>
          </li> */}
          <li>
              <span>Users List</span>
          </li>
        </ul>
        <div className='page-toolbar'>
          <ButtonGroup>
            <Link to={this.props.match.url + '/new'}>
              <Button className='green btn-outline'>New User</Button>
            </Link>
          </ButtonGroup>          
        </div>
      </div>
    )
  }

  onTableHeaderClick (field, direction) {
    const sortObj = {
      field, direction
    }
    this.props.dispatch(user_header_click(sortObj));
    this.props.dispatch(userGet());
  }

  render () {
    const tbody = this.props.users.map((user, index) => (
      <tr key={user.id}>
        <td>{index + 1}</td>
        <td>{user.email}</td>
        <td>{user.display_name}</td>
        <td>{user.admin && <Label bsStyle='info'>Yes</Label>}</td>
        <td>{user.created_at}</td>
        <td>
          <ButtonGroup>
            <Button className='green'><i className='fa fa-cog' /></Button>
            <Button><i className='fa fa-trash' /></Button>
          </ButtonGroup>  
        </td>
      </tr>
    ));

    return (
      <div>
        {this.pageBar()}
        <PageTitle header='Users Management' />
        <Table responsive striped hover bordered>
          <thead>
            <StTableHeaderGroup currentSortField={this.props.sortField}>
              <th>#</th>
              <StTableHeader header='Email' fieldName='email'
                onClick={this.onTableHeaderClick.bind(this)} />
              <StTableHeader header='Display Name' fieldName='display_name'
                onClick={this.onTableHeaderClick.bind(this)} />
              <StTableHeader header='Admin?' fieldName='admin'
                onClick={this.onTableHeaderClick.bind(this)} />
              <StTableHeader header='Created At' fieldName='created_at'
                onClick={this.onTableHeaderClick.bind(this)} />                
              <th></th>
            </StTableHeaderGroup>
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