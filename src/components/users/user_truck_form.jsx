import React, {Component} from 'react';
import moment from 'moment';
import yup from 'yup';
import { connect } from 'react-redux';
import Select from 'react-select';
import DatePicker from 'react-datetime';
import Form from 'react-formal';
import { Button, FormGroup, FormControl, ControlLabel, Col } from 'react-bootstrap';
import LaddaButton, {S, EXPAND_LEFT } from 'react-ladda';
import FormAlert from '../st_form_alert';
import {truckGet, userTruckPost} from '../../actions';

const defaultStr = yup.string().default('')
const formSchema = yup.object({
  truck: yup.object({
    value: yup.number()
  }).required('Please select truck'),
  start_at: yup.date().required('Please select start date'),
});

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
      user_truck_form: {},
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

  formMessage (field) {
    return (
      <FormAlert field={field} />
    )
  }
  
  onEndAtChange (value) {
    this.setState({
      end_at: value
    })
  }

  formatDateTime (dt) {
    return dt.format('YYYY-MM-DD HH:mm:ss')
  }

  onFormChange (value) {
    this.setState({
      user_truck_form: value
    })
  }

  onSubmit () {
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
        <Form
          schema={formSchema}
          defaultValue={formSchema.default()}
          onChange={this.onFormChange.bind(this)}
          onSubmit={this.onSubmit.bind(this)}>
          <FormGroup>
            <ControlLabel>Truck</ControlLabel>
            {this.formMessage('truck')}
            <Form.Field
              type={Select}
              name='truck'
              options={this.state.trucks} />
            {/* <Select         
              name='trucks'
              options={this.state.trucks}
              value={this.state.truck}
              onChange={this.onSelectChange.bind(this)}
            /> */}
          </FormGroup>
          <FormGroup>
            <ControlLabel>Start at</ControlLabel>
            {this.formMessage('start_at')}
            <Form.Field
              type={DatePicker}
              name='start_at'
              timeFormat='HH:mm:ss'
            />
          </FormGroup>
          {/*<FormGroup>
            <ControlLabel>End at</ControlLabel>
            <DatePicker
              timeFormat='HH:mm:ss'
              value={this.state.end_at}
              onChange={this.onEndAtChange.bind(this)}
            />
          </FormGroup>           */}
          <FormGroup>
              <Form.Button
                type='submit'
                component={LaddaButton}
                className='btn green'
                loading={this.props.isFetching}
                data-style={EXPAND_LEFT}
                data-size={S}
                data-spinner-size={30}>Submit</Form.Button>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

export default connect(mapStateToProps)(UserTruckForm);
