import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ListGroup, ListGroupItem} from 'react-bootstrap';

class TruckList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      active_serial_sim: null
    }
  }

  onItemClick (loc) {
    this.setState({
      active_serial_sim: loc.serial_sim
    })

    if (this.props.onItemClick) {
      this.props.onItemClick(loc);
    }
  }

  item (location) {
    return (
      <ListGroupItem 
        href='#'
        key={location.serial_sim}
        header={<h2>{location.license_plate}</h2>}
        onClick={this.onItemClick.bind(this, location)}
        active={location.serial_sim === this.state.active_serial_sim}>
        <span>{location.brand} {location.color}</span> <br/>
        <span>Last updated: {location.datetime}</span>
      </ListGroupItem>);
  }

  items (locations) {
    const items = locations.map(loc => (this.item(loc)));
    return (
      <ListGroup>
        {items}
      </ListGroup>);
  }

  render () {
    const {locations} = this.props
    return (
      locations && this.items(locations)
    )
  }
}

TruckList.propTypes = {
  locations: PropTypes.array,
  onItemClick: PropTypes.func,
}

export default TruckList;
