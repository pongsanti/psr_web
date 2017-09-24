import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Table, Button, ButtonGroup, Label } from 'react-bootstrap';
import PageTitle from '../page_title';
import UserTruckForm from './user_truck_form';
import {userTruckGet} from '../../actions';

const mapStateToProps = state => {
  const {user_truck} = state;
  return {
    isFetching: user_truck.isFetching,
    user_trucks: user_truck.trucks,
  }
}

class Trucks extends Component {
  componentDidMount () {
    this.getUserTrucks();
  }

  getUserTrucks () {
    const {dispatch} = this.props;
    dispatch(userTruckGet());
  }

  onDeleteClick (id) {

  }

  render () {
    const tbody = this.props.user_trucks.map((utruck, index) => (
      <tr key={utruck.user_truck_id}>
        <td>{utruck.license_plate}</td>
        <td>{utruck.brand}</td>
        <td>{utruck.color}</td>
        <td>{utruck.start_at}</td>
        <td>{utruck.end_at}</td>
        <td>
          <ButtonGroup>
            <Button onClick={this.onDeleteClick.bind(this, utruck.user_truck_id)}><i className='fa fa-trash' /></Button>
          </ButtonGroup>  
        </td>
      </tr>
    ));

    return (
      <div>
      <PageTitle header="Edit User's trucks" subHeader='' />
      <UserTruckForm />
      <Table responsive striped hover bordered>
        <thead>
          <tr>
            <th>License Plate</th>
            <th>Brand</th>
            <th>Color</th>
            <th>Start at</th>
            <th>End at</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tbody}
        </tbody>
      </Table>
    </div>
    )
  }
}

export default connect(mapStateToProps)(Trucks);
