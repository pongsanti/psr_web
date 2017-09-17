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
    return (
      <Grid>
        <Row>
          <Col md={4}>
            <div>
            <Pagination bsSize='small'
              first last
              prev={prev}
              next={next}
              items={pager.total_pages}
              activePage={pager.current_page}
              onSelect={this.onSelect.bind(this)} />
            </div>
          </Col>
          <Col md={4}>
            Page Size: {' '}
            <ButtonGroup>
              <Button onClick={this.pageSizeClick.bind(this, 5)}>5</Button>
              <Button onClick={this.pageSizeClick.bind(this, 10)}>10</Button>
              <Button onClick={this.pageSizeClick.bind(this, 15)}>15</Button>
            </ButtonGroup>
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
