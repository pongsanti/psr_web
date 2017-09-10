import React, {Component} from 'react';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class PageSidebar extends Component {
  render () {
    return (
        <Navbar.Collapse className='page-sidebar'
          style={{paddingTop: '20px'}}>
          <Nav className='page-sidebar-menu'>
            <LinkContainer to='/' exact>
              <NavItem eventKey={1} href='#'>
                <i className='icon-home'></i>
                <span className='title'>Dashboard</span>
              </NavItem>
            </LinkContainer>
            <LinkContainer to='/users'>
              <NavItem eventKey={2}>
                <i className='icon-user'></i>
                <span className='title'>User</span>
              </NavItem>
            </LinkContainer>

          </Nav>
        </Navbar.Collapse>
    )
  }
}

export default PageSidebar;
