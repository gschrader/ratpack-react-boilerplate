import React, {Component, PropTypes} from 'react';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem, Modal, NavBrand} from 'react-bootstrap';
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

                <Navbar toggleNavKey={0}>
                    <NavBrand>
                        <Link to="/" query={{}}>
                            Ratpack React Boilerplate
                        </Link>
                    </NavBrand>
                    <Nav right eventKey={1}>
                        <LinkContainer to="/monitor" query={{}}>
                            <NavItem eventKey={2}>Monitor</NavItem>
                        </LinkContainer>
                        {name ?
                            <NavDropdown eventKey={4} title={name} id="user-menu">
                                <MenuItem eventKey={5} onSelect={ event=>this.onLogoutClick(event)}>Log out</MenuItem>
                            </NavDropdown>
                            : <div/>}
                    </Nav>


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
