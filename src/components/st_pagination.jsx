import React, {Component} from 'react';
import { Pagination } from 'react-bootstrap';
import PropTypes from 'prop-types';

class StPagination extends Component {
  render() {
    
    const {pager} = this.props;

    return (
      <Pagination bsSize='small'
        first last next prev
        items={pager.total_pages}
        activePage={pager.current_page}
        onSelect={() => {}} />
    )
  }
}

StPagination.propTypes = {
  pager: PropTypes.object.isRequired,
}

export default StPagination;
