import React, {Component} from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';

import {stationGet} from '../../actions';

const mapStateToProps = state => {
  const {station} = state;
  return {
    isFetching: station.isFetching,
    stations: station.stations,
  }
}

class Stations extends Component {
  constructor (props) {
    super(props)

    const {stations} = props
    this.state = {
      stations: stations.map(this.selectOptions),
      values: []
    }
  }

  componentWillMount () {
    this.props.dispatch(stationGet())
  }

  componentWillReceiveProps (nextProps) {
    const {stations} = nextProps

    this.setState({
      stations: stations.map(this.selectOptions)
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

  render () {
    return (
      <div>
        <h3>Stations</h3>
        <Select
          name="stations"
          multi={true}
          options={this.state.stations}
          value={this.state.values}
          onChange={this.onSelectChange.bind(this)}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps)(Stations);
