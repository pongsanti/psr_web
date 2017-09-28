import React, {Component} from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';

class TruckList extends Component {
  render () {
    return (
      <ListGroup>
        <ListGroupItem href='#'>Item 1</ListGroupItem>
        <ListGroupItem href='#'>Item 2</ListGroupItem>
        <ListGroupItem href='#'>...</ListGroupItem>
      </ListGroup>
    )
  }
}

export default TruckList;
