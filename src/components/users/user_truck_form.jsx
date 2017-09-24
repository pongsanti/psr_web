import React, {Component} from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import Select from 'react-select';
import DatePicker from 'react-datetime';
import { Button, FormGroup, FormControl, ControlLabel, Col } from 'react-bootstrap';
import LaddaButton, {S, EXPAND_LEFT } from 'react-ladda';
import {truckGet, userTruckPost} from '../../actions';

const mapStateToProps = state => {
  const {truck, user_truck} = state;
  return {
    isFetching: truck.isFetching && user_truck.isFetching,
    trucks: truck.trucks,
  }
}

class UserTruckForm extends Component {
  constructor (props) {
    super(props);

    this.state = {
      trucks: props.trucks.map(this.selectOptions),
      truck: '',
      start_at: moment(),
      end_at: moment(),
    }
  }

  selectOptions (truck) {
    return { value: truck.id, label: `${truck.license_plate} ${truck.brand} ${truck.color}` }
  }

  componentWillMount () {
    this.props.dispatch(truckGet());
  }

  componentWillReceiveProps (nextProps) {
    const {trucks} = nextProps

    this.setState({
      trucks: trucks.map(this.selectOptions),
    })
  }  

  onSelectChange (value) {
    this.setState({ truck: value })
  }

  onStartAtChange (value) {
    this.setState({
      start_at: value
    })
  }

  onEndAtChange (value) {
    this.setState({
      end_at: value
    })
  }

  formatDateTime (dt) {
    return dt.format('YYYY-MM-DD HH:mm:ss')
  }

  onSubmit (event) {
    event.preventDefault();

    const {truck, start_at, end_at} = this.state
    const {dispatch} = this.props

    const postData = {
      truck_id: truck.value,
      start_at: this.formatDateTime(start_at),
      end_at: this.formatDateTime(end_at),
    }
    dispatch(userTruckPost(postData));
  }

  render () {
    return (
      <div className='portlet light bordered'>
        <form onSubmit={this.onSubmit.bind(this)}>
          <FormGroup>
            <ControlLabel>Truck</ControlLabel>
            <Select         
              name='trucks'
              options={this.state.trucks}
              value={this.state.truck}
              onChange={this.onSelectChange.bind(this)}
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Start at</ControlLabel>
            <DatePicker
              timeFormat='HH:mm:ss'
              value={this.state.start_at}
              onChange={this.onStartAtChange.bind(this)}
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>End at</ControlLabel>
            <DatePicker
              timeFormat='HH:mm:ss'
              value={this.state.end_at}
              onChange={this.onEndAtChange.bind(this)}
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
    )
  }
}

export default connect(mapStateToProps)(UserTruckForm);
