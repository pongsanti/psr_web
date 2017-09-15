import React, {Component} from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

class StConfirmDialog extends Component {
  constructor (props) {
    super(props)

    this.state = {
      show: props.show
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.state,
      show: nextProps.show
    })
  }

  close () {
    if (this.props.onCloseClick) {
      this.props.onCloseClick();
    }
    
    this.setState({
      show: false
    });
  }

  onConfirm () {
    if (this.props.onConfirmClick) {
      this.props.onConfirmClick();
    }
  }

  render () {
    return (
      <Modal show={this.state.show}>
        <Modal.Header>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Are you sure?
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.close.bind(this)}>Close</Button>
          <Button className='green' onClick={this.onConfirm.bind(this)}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

StConfirmDialog.propTypes = {
  show: PropTypes.bool.isRequired,
  onConfirmClick: PropTypes.func,
  onCloseClick: PropTypes.func
}

export default StConfirmDialog;
