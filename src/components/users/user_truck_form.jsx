import React, {Component} from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import Select from 'react-select';
import DatePicker from 'react-datetime';
import Form from 'react-formal';
import { Button, FormGroup, FormControl, ControlLabel, Col, Row } from 'react-bootstrap';
import LaddaButton, {S, EXPAND_LEFT } from 'react-ladda';
import FormAlert from '../st_form_alert';
import {truckGet, userTruckPost} from '../../actions';
import formSchema from './user_truck_form_schema';

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

  formatDateTime (dt) {
    return dt.format('YYYY-MM-DD HH:mm:ss')
  }

  onFormChange (value) {
    this.setState({
      user_truck_form: value
    })
  }

  onSubmit () {
    const form_values = this.state.user_truck_form;
    const postData = {
      ...form_values,
      start_at: this.formatDateTime(form_values.start_at),
      end_at: this.formatDateTime(form_values.end_at),
    }
    
    const {dispatch} = this.props
    dispatch(userTruckPost(postData));
  }

  mapFieldOptionToFormValue (option) {
    return option? option.value : null;
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
            {this.formMessage('truck_id')}
            <Form.Field
              type={Select}
              name='truck_id'
              options={this.state.trucks}
              clearable={false}
              mapFromValue={this.mapFieldOptionToFormValue.bind(this)} />
          </FormGroup>
          <Row>
            <Col sm={6} md={6}>
              <FormGroup>
                <ControlLabel>Start at</ControlLabel>
                {this.formMessage('start_at')}
                <Form.Field
                  type={DatePicker}
                  name='start_at'
                  timeFormat='HH:mm:ss'
                  alsoValidates='end_at'
                />
              </FormGroup>
            </Col>
            <Col sm={6} md={6}>
              <FormGroup>
                <ControlLabel>End at</ControlLabel>
                {this.formMessage('end_at')}
                <Form.Field
                  type={DatePicker}
                  name='end_at'
                  timeFormat='HH:mm:ss'
                  alsoValidates='start_at'
                />
              </FormGroup>
            </Col>
          </Row>
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
