import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PageTitle from '../page_title';
import { Table, Button, ButtonGroup, Label } from 'react-bootstrap';
import StPagination from '../st_pagination';
import StTableHeader from '../st_table_header';
import StTableHeaderGroup from '../st_table_header_group';
import StConfirmDialog from '../st_confirm_dialog';
import { userGet, user_header_click,
  userDelete, user_edit,
  user_new,
  user_page_change, user_page_size_change } from '../../actions'

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
    
    this.state = {
      showConfirmDialog: false,
      deleteId: ''
    }
  }

  componentDidMount () {
    this.getUsers();
  }

  getUsers () {
    const {dispatch} = this.props;
    dispatch(userGet());
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
            <Button onClick={this.onNewUserClick.bind(this)} className='green btn-outline'>New User</Button>
          </ButtonGroup>          
        </div>
      </div>
    )
  }

  onNewUserClick () {
    const {dispatch, history} = this.props;
    dispatch(user_new());
    history.push('/users/new');
  }

  onTableHeaderClick (field, direction) {
    const sortObj = {
      field, direction
    }
    this.props.dispatch(user_header_click(sortObj));
    this.props.dispatch(userGet());
  }

  onEditClick (user) {
    const {dispatch, history} = this.props;
    dispatch(user_edit(user));
    history.push('/users/edit');
  }

  onDeleteClick (id) {
    this.setState({
      showConfirmDialog: true,
      deleteId: id
    });
  }

  onDeleteConfirm () {
    const {dispatch} = this.props;
    dispatch(userDelete(this.state.deleteId))
    .then(this.closeModal.bind(this))
    .then(this.getUsers.bind(this));
  }

  onDeleteConfirmClose () {
    this.closeModal();
  }

  closeModal () {
    this.setState({
      showConfirmDialog: false
    })
  }

  onPageSizeClick (value) {
    const {dispatch} = this.props
    dispatch(user_page_size_change(value));
    dispatch(userGet());
  }

  onPageSelect (value) {
    const {dispatch} = this.props
    dispatch(user_page_change(value));
    dispatch(userGet());
  }

  render () {
    const tbody = this.props.users.map((user, index) => (
      <tr key={user.id}>
        <td>{user.email}</td>
        <td>{user.display_name}</td>
        <td>{user.admin && <Label bsStyle='info'>Yes</Label>}</td>
        <td>{user.created_at}</td>
        <td>
          <ButtonGroup>
            <Button className='green' onClick={this.onEditClick.bind(this, user)}><i className='fa fa-cog' /></Button>
            <Button onClick={this.onDeleteClick.bind(this, user.id)}><i className='fa fa-trash' /></Button>
          </ButtonGroup>  
        </td>
      </tr>
    ));

    return (
      <div>
        <StConfirmDialog show={this.state.showConfirmDialog}
          onConfirmClick={this.onDeleteConfirm.bind(this)}
          onCloseClick={this.onDeleteConfirmClose.bind(this)} />
        {this.pageBar()}
        <PageTitle header='Users Management' />
        <Table responsive striped hover bordered>
          <thead>
            <StTableHeaderGroup currentSortField={this.props.sortField}>
              <StTableHeader header='Email' fieldName='email'
                onClick={this.onTableHeaderClick.bind(this)} />
              <StTableHeader header='Display Name' fieldName='display_name'
                onClick={this.onTableHeaderClick.bind(this)} />
              <StTableHeader header='Admin?' fieldName='admin'
                onClick={this.onTableHeaderClick.bind(this)} />
              <StTableHeader header='Created At' fieldName='created_at'
                onClick={this.onTableHeaderClick.bind(this)} />                
              <th>Actions</th>
            </StTableHeaderGroup>
          </thead>
          <tbody>
            {tbody}
          </tbody>          
        </Table>
        <StPagination pager={this.props.pager}
          onPageSelect={this.onPageSelect.bind(this)}
          onPageSizeClick={this.onPageSizeClick.bind(this)} />
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps)(UserList));