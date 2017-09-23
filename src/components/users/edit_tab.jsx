import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Tabs, Tab } from 'react-bootstrap';
import UserForm from './user_form';
import Stations from './stations';

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
    return (
      <div className='page-bar'>
        <ul className="page-breadcrumb">
          <li>
            <Link to='/users'>Users List</Link>
            <i className="fa fa-circle"></i>
          </li>
          <li>
            <span>Edit User</span>
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
          <Tab eventKey={3} title='Trucks'>Tab 3 content</Tab>        
        </Tabs>
      </div>
    )
  }
}

export default EditTab;
