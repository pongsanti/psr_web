import React, {Component} from 'react';

class PageBar extends Component {
  render () {
    return (
      <div className='page-bar'>
        <ul className="page-breadcrumb">
          <li>
              <a href="index.html">Home</a>
              <i className="fa fa-circle"></i>
          </li>
          <li>
              <a href="#">Blank Page</a>
              <i className="fa fa-circle"></i>
          </li>
          <li>
              <span>Page Layouts</span>
          </li>
      </ul>
      </div>
    )
  }
}

export default PageBar;
