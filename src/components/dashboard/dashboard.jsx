import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ListGroup, ListGroupItem, Grid, Row, Col} from 'react-bootstrap';
import PageTitle from '../page_title';
import Map from './map';
import TruckList from './truck_list';
import UserTruckStation from './user_truck_station';
import {locationGet} from '../../actions';

const mapStateToProps = state => {
  const {location} = state;
  return {
    isFetching: location.isFetching,
    locations: location.locations,
  }  
}

class Dashboard extends Component {
  constructor (props) {
    super(props)

    this.state = {
      location: null,
      mouse_hover_location: null,
    }
  }

  componentWillMount () {
    this.props.dispatch(locationGet());
  }

  onTruckItemClick (location) {
    this.setState({
      location: location
    })
  }

  onTruckMouseEnter (location) {
    this.setState({
      mouse_hover_location: location
    })
  }

  onTruckMouseLeave () {
    this.setState({
      mouse_hover_location: null
    })
  }

  render () {
    const user_truck_id = this.state.location ? this.state.location.user_truck_id : null;

    return (
      <div>
        <PageTitle header='Dashboard' />
        <Grid fluid>
          <Row>
            <Col md={6} style={{padding: 0}}>
              <Map locations={this.props.locations} 
                hoverLocation={this.state.mouse_hover_location} />
            </Col>
            <Col md={3}>
              <UserTruckStation user_truck_id={user_truck_id} />
            </Col>
            <Col md={3}>
              <TruckList
                locations={this.props.locations}
                onItemClick={this.onTruckItemClick.bind(this)} 
                onItemMouseEnter={this.onTruckMouseEnter.bind(this)}
                onItemMouseLeave={this.onTruckMouseLeave.bind(this)}/>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Dashboard);