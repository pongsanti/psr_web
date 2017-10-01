import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ListGroup, ListGroupItem} from 'react-bootstrap';

import {userTruckStationGet} from '../../actions'

const mapStateToProps = state => {
  const {uts} = state;
  return {
    isFetching: uts.isFetching,
    uts: uts.uts,
  }  
}

class UserTruckStation extends Component {
  constructor (props) {
    super(props)
  }

  componentWillMount () {
    if (this.props.user_truck_id) {
      this.props.dispatch(userTruckStationGet(this.props.user_truck_id));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user_truck_id !== this.props.user_truck_id) {
      nextProps.dispatch(userTruckStationGet(nextProps.user_truck_id));
    }
  }

  items () {
    return this.props.uts.map(uts => (
      <ListGroupItem>
        <h4>{uts.station_name}</h4>
        Arr: {uts.arrived_at} <br/>
        Dep: {uts.departed_at}
      </ListGroupItem>
    ))
  }

  render () {
    const items = this.items()
    const empty = items.length === 0;
    return (
      <ListGroup>
        {empty && <ListGroupItem bsStyle='info'>No Data</ListGroupItem>}
        {items}
      </ListGroup>
    )
  }
}

UserTruckStation.propTypes = {
  user_truck_id: PropTypes.number,
}

export default connect(mapStateToProps)(UserTruckStation);
