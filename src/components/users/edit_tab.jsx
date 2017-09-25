import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Tabs, Tab } from 'react-bootstrap';
import UserForm from './user_form';
import Stations from './stations';
import Trucks from './trucks';

const mapStateToProps = state => {
  const {user} = state;
  return {
    curUser: user.curUser
  }
}

class EditTab extends Component {
  constructor (props) {
    super(props)

    this.state = {
      key: 1
    }
  }

  handleSelect (key) {
    this.setState({key});
  }

  pageBar () {
    const {curUser} = this.props;
    return (
      <div className='page-bar'>
        <ul className="page-breadcrumb">
          <li>
            <Link to='/users'>Users List</Link>
            <i className="fa fa-circle"></i>
          </li>
          <li>
            { curUser &&
              <span>Edit User - {curUser.display_name} ({curUser.email})</span>
            }
          </li>
        </ul>
      </div>
    )
  }

  render () {
    return(
      <div>
        {this.pageBar()}
        <Tabs activeKey={this.state.key}
          id='user_detail_tab'
          onSelect={this.handleSelect.bind(this)}
          mountOnEnter={true}
          unmountOnExit={true}>
          <Tab eventKey={1} title='Details'><UserForm /></Tab>
          <Tab eventKey={2} title='Stations'><Stations /></Tab>
          <Tab eventKey={3} title='Trucks'><Trucks /></Tab>        
        </Tabs>
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps)(EditTab));
