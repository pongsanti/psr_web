import React, {Component} from 'react';
import PageTitle from '../page_title';
import Map from '../maps/map';

class Dashboard extends Component {
  render () {
    return (
      <div>
        <PageTitle header='Dashboard' />
        <Map />
      </div>
    )
  }
}

export default Dashboard;