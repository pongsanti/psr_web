import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ListGroup, ListGroupItem} from 'react-bootstrap';

class TruckList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      active_user_truck_id: null
    }
  }

  onItemClick (loc) {
    this.setState({
      active_user_truck_id: loc.user_truck_id
    })

    if (this.props.onItemClick) {
      this.props.onItemClick(loc);
    }
  }

  onEnterItem(loc) {
    if (this.props.onItemMouseEnter) {
      this.props.onItemMouseEnter(loc);
    }
  }

  onLeaveItem(loc) {
    if (this.props.onItemMouseLeave) {
      this.props.onItemMouseLeave(loc);
    }
  }

  itemStyle (loc) {
    return loc.datetime ? '' : 'warning';
  }

  item (location) {
    return (
      <ListGroupItem
        bsStyle={this.itemStyle(location)}
        href='#'
        key={location.user_truck_id}
        header={<h2>{location.license_plate}</h2>}
        onClick={this.onItemClick.bind(this, location)}
        onMouseEnter={this.onEnterItem.bind(this, location)}
        onMouseLeave={this.onLeaveItem.bind(this, location)}
        active={location.user_truck_id === this.state.active_user_truck_id}>
        <span>{location.brand} {location.color}</span> <br/>
        <span>Last updated: {location.datetime || 'N/A'}</span>
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
  onItemMouseEnter: PropTypes.func,
  onItemMouseLeave: PropTypes.func,  
}

export default TruckList;
