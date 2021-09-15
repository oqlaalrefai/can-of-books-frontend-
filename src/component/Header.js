import React from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './Header.css';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { withAuth0 } from '@auth0/auth0-react';

class Header extends React.Component {
  render() {
    const isAuth = this.props.auth0.isAuthenticated;
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>My Favorite Books</Navbar.Brand>
        <NavItem><Link to="/" className="nav-link">Home</Link></NavItem>
        {
          isAuth &&
          <NavItem><Link to="/profile" className="nav-link">My Profile</Link></NavItem>
        }
        {
          isAuth ? <LogoutButton /> : <LoginButton />
        }
      </Navbar>
    )
  }
}

export default withAuth0(Header);