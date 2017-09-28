import React, {Component} from 'react';
import {ListGroup, ListGroupItem, Grid, Row, Col} from 'react-bootstrap';
import PageTitle from '../page_title';
import Map from './map';
import TruckList from './truck_list';

class Dashboard extends Component {
  render () {
    return (
      <div>
        <PageTitle header='Dashboard' />
        <Grid fluid>
          <Row>
            <Col md={9} style={{padding: 0}}>
              <Map />
            </Col>
            <Col md={3}>
              <TruckList />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default Dashboard;