import React, {Component} from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, FormControl, ControlLabel, Col } from 'react-bootstrap';
import LaddaButton, {S, EXPAND_LEFT } from 'react-ladda';
import PageTitle from '../page_title';
import {stationGet, userStationGet, userStationPatch,
  noti_add, user_station_reset} from '../../actions';
import Noti from '../../layouts/noti'

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

  componentWillUnmount () {
    this.props.dispatch(user_station_reset());
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

  patchPayload (option) {
    return option.value
  }

  onSelectChange (val) {
    this.setState({
      values: val
    })
  }

  onSubmit (event) {
    event.preventDefault();

    const {dispatch} = this.props
    const payload = { stations: this.state.values.map(this.patchPayload) }
    dispatch(userStationPatch(payload))
    .then(() => dispatch(noti_add(Noti.notiSuccess('User stations updated'))));
  }

  render () {
    return (
      <div>
        <PageTitle header="Edit User's stations" subHeader='' />
        <div className='portlet light bordered'>
          <form onSubmit={this.onSubmit.bind(this)}>
            <FormGroup>
              <ControlLabel>Stations</ControlLabel>
              <Select                
                name="stations"
                multi={true}
                options={this.state.stations}
                value={this.state.values}
                onChange={this.onSelectChange.bind(this)}
              />
            </FormGroup>
            <FormGroup>
              <LaddaButton
                className='btn green'
                loading={this.props.isFetching}
                data-style={EXPAND_LEFT}
                data-size={S}
                data-spinner-size={30}>Submit</LaddaButton>
            </FormGroup>
          </form>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Stations);
