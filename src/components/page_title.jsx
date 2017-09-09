import React, {Component} from 'react';

class PageTitle extends Component {
  render () {
    return (
      <h1 className='page-title'>{this.props.header}
        <small>{this.props.subHeader}</small>
      </h1>
    )
  }
}

export default PageTitle;
