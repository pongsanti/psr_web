import React, { Component } from 'react';
import PropTypes from 'prop-types';

import StTableHeader from './st_table_header';

class StTableHeaderGroup extends Component {
  updateChildComponentProp (component) {
    if (component.type === StTableHeader) {
      return React.cloneElement(component, {currentSortField: this.props.currentSortField})
    } else {
      return component;
    }
  }

  render () {
    return (
      <tr>
        {React.Children.map(this.props.children, this.updateChildComponentProp.bind(this))}
      </tr>
    );
  }
}

StTableHeaderGroup.propTypes = {
  currentSortField: PropTypes.string.isRequired
}

export default StTableHeaderGroup;
