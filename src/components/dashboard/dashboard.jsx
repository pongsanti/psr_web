import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ListGroup, ListGroupItem, Grid, Row, Col} from 'react-bootstrap';
import PageTitle from '../page_title';
import Map from './map';
import TruckList from './truck_list';
import {locationGet} from '../../actions'

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

  render () {
    return (
      <div>
        <PageTitle header='Dashboard' />
        <Grid fluid>
          <Row>
            <Col md={9} style={{padding: 0}}>
              <Map location={this.state.location} />
            </Col>
            <Col md={3}>
              <TruckList
                locations={this.props.locations}
                onItemClick={this.onTruckItemClick.bind(this)} />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Dashboard);