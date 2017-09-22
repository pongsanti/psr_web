import React, {Component} from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, FormControl, ControlLabel, Col } from 'react-bootstrap';
import LaddaButton, {XS, EXPAND_LEFT } from 'react-ladda';

import {stationGet, userStationGet, userStationPatch} from '../../actions';

const mapStateToProps = state => {
  const {station, user_station} = state;
  return {
    isFetching: station.isFetching && user_station.isFetching,
    stations: station.stations,
    user_stations: user_station.stations,
  }
}

class Stations extends Component {
  constructor (props) {
    super(props)

    const {stations, user_stations} = props
    this.state = {
      stations: stations.map(this.selectOptions),
      values: user_stations.map(this.selectOptions),
    }
  }

  componentWillMount () {
    const {dispatch} = this.props
    dispatch(stationGet())
    .then(() => dispatch(userStationGet()))
  }

  componentWillReceiveProps (nextProps) {
    const {stations, user_stations} = nextProps

    this.setState({
      stations: stations.map(this.selectOptions),
      values: user_stations.map(this.selectOptions)
    })
  }

  selectOptions (station) {
    return { value: station.id, label: station.name }
  }

  onSelectChange (val) {
    this.setState({
      values: val
    })
  }

  onSubmit (event) {
    event.preventDefault();

    console.log(this.state.values);
  }

  render () {
    return (
      <div>
        <Form horizontal onSubmit={this.onSubmit.bind(this)}>
          <FormGroup>
            <Col componentClass={ControlLabel} md={2} >User's stations</Col>
            <Col md={10}>
              <Select
                name="stations"
                multi={true}
                options={this.state.stations}
                value={this.state.values}
                onChange={this.onSelectChange.bind(this)}
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col mdOffset={2} md={10}>
              <LaddaButton
                className='btn green'
                loading={this.props.isFetching}
                data-style={EXPAND_LEFT}
                data-size={XS}
                data-spinner-size={30}>Submit</LaddaButton>
            </Col>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Stations);
