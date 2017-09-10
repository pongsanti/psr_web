import React, {Component} from 'react';
import { Pagination } from 'react-bootstrap';
import PropTypes from 'prop-types';

class StPagination extends Component {
  render() {
    
    const {pager} = this.props;

    return (
      <Pagination bsSize="medium"
        first
        last
        items={pager.total}
        activePage={pager.current_page}
        onSelect={() => {}} />
    )
  }
}

StPagination.propTypes = {
  pager: PropTypes.object.isRequired,
}

export default StPagination;
