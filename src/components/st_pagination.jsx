import React, {Component} from 'react';
import { Pagination, ButtonGroup, Button, Grid, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

class StPagination extends Component {

  onSelect (value) {
    if (this.props.onPageSelect) {
      this.props.onPageSelect(value);
    }
  }

  pageSizeClick (value) {
    if (this.props.onPageSizeClick) {
      this.props.onPageSizeClick(value);
    }
  }

  render() {
    
    const {pager} = this.props;

    const prev = pager.prev_page !== null
    const next = pager.next_page !== null
    const current_page = pager.current_page
    const page_size = pager.limit_value

    return (
      <Grid>
        <Row>
          <Col md={4}>
            <Pagination bsSize='small'
              first last
              prev={prev}
              next={next}
              items={pager.total_pages}
              activePage={current_page}
              onSelect={this.onSelect.bind(this)} />
          </Col>
          <Col md={4}>
            Displays: {' '}
            <ButtonGroup>
              <Button active={page_size === 5} onClick={this.pageSizeClick.bind(this, 5)}>5</Button>
              <Button active={page_size === 10} onClick={this.pageSizeClick.bind(this, 10)}>10</Button>
              <Button active={page_size === 15} onClick={this.pageSizeClick.bind(this, 15)}>15</Button>
            </ButtonGroup>
            {' '} items
          </Col>
          <Col md={4}>
            Total: {pager.total} items
          </Col>
        </Row>
      </Grid>
    )
  }
}

StPagination.propTypes = {
  pager: PropTypes.object.isRequired,
  onPageSelect: PropTypes.func,
  onPageSizeClick: PropTypes.func,
}

export default StPagination;
