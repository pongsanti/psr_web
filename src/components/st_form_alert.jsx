import React, {Component} from 'react';
import { Alert } from 'react-bootstrap';
import Form from 'react-formal';
import PropTypes from 'prop-types';

class StFormAlert extends Component {
  render () {
    return (
      <Form.Message for={[this.props.field]}>
        { messages => (
          <Alert bsStyle='danger'>
            <ul>
              {messages.map(msg => <li key={msg}><strong>{msg}</strong></li>)}
            </ul>
          </Alert>
        )}
      </Form.Message>
    )
  }
}

StFormAlert.propTypes = {
  field: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]).isRequired
}

export default StFormAlert;
