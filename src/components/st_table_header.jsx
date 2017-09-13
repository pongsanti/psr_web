import React, { Component } from 'react';
import PropTypes from 'prop-types';

class StTableHeader extends Component {
  constructor (props) {
    super(props);

    this.state = {
      direction: null
    }
  }

  sortIconClass () {
    const direction = this.state.direction;
    return direction? `fa fa-sort-${direction}` : '';
  }

  onClick () {
    const nextDirection = this.state.direction === 'asc' ? 'desc' : 'asc';
    this.setState({
      direction: nextDirection
    })

    if (this.props.onClick) {
      this.props.onClick(this.props.fieldName, nextDirection);
    }
  }

  showSortIcon () {
    return this.props.fieldName === this.props.currentSortField
  }

  render () {
    return (
      <th>
        <span>
          <a href='javascript:;' onClick={this.onClick.bind(this)}>{this.props.header}</a> {' '}
          {this.showSortIcon() && <i className={this.sortIconClass()} />}
        </span>
      </th>
    )
  }
}

StTableHeader.propTypes = {
  header: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  currentSortField: PropTypes.string,
}

export default StTableHeader;
