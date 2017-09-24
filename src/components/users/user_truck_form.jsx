import React, {Component} from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Button, Form, FormGroup, FormControl, ControlLabel, Col } from 'react-bootstrap';
import LaddaButton, {S, EXPAND_LEFT } from 'react-ladda';
import {truckGet} from '../../actions';

const mapStateToProps = state => {
  const {truck} = state;
  return {
    isFetching: truck.isFetching,
    trucks: truck.trucks,
  }
}

class UserTruckForm extends Component {
  constructor (props) {
    super(props);

    this.state = {
      trucks: props.trucks.map(this.selectOptions),
      truck: null
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

  onSubmit () {

  }

  render () {
    return (
      <div className='portlet light bordered'>
        <form onSubmit={this.onSubmit.bind(this)}>
          <FormGroup>
            <ControlLabel>Truck</ControlLabel>
            <Select         
              name="trucks"
              options={this.state.trucks}
              value={this.state.truck}
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
    )
  }
}

export default connect(mapStateToProps)(UserTruckForm);
