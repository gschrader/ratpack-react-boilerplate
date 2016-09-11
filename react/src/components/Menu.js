import React, {Component, PropTypes} from 'react';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router';

export default class Header extends Component {
    onLogoutClick(event) {
        event.preventDefault();
        this.props.handleLogout();
    }

    render() {
        const {name} = this.props;
        const pathname = this.props.location.pathname;
        const isLoginPage = pathname.indexOf('login') > -1;

        return (
            !isLoginPage &&
            <div>

                <Navbar>
                    <Navbar.Header>
                        <LinkContainer to={{pathname: '/'}}>
                            <Navbar.Brand>
                                <Link to="/">Ratpack React Boilerplate</Link>
                            </Navbar.Brand>
                        </LinkContainer>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight>
                            <LinkContainer to="/monitor">
                                <NavItem>Monitor</NavItem>
                            </LinkContainer>
                            {name ?
                                <NavDropdown title={name} id="user-menu">
                                    <MenuItem onSelect={this.props.handleLogout}>Log out</MenuItem>
                                </NavDropdown>
                                : <NavItem/>}
                        </Nav>

                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

Header.propTypes = {
    name: PropTypes.string,
    handleLogout: PropTypes.func.isRequired
};

Header.contextTypes = {
    location: React.PropTypes.object
};
