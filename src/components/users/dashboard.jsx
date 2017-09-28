import React, {Component} from 'react';
import {ListGroup, ListGroupItem, Grid, Row, Col} from 'react-bootstrap';
import PageTitle from '../page_title';
import Map from '../maps/map';

class Dashboard extends Component {
  render () {
    return (
      <div>
        <PageTitle header='Dashboard' />
        <Grid>
          <Row>
            <Col md={9} style={{padding: 0}}>
              <Map />
            </Col>
            <Col md={3}>
              <ListGroup>
                <ListGroupItem href='#'>Item 1</ListGroupItem>
                <ListGroupItem href='#'>Item 2</ListGroupItem>
                <ListGroupItem href='#'>...</ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default Dashboard;