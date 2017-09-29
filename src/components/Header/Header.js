import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Nav, NavItem, NavLink, NavbarToggler, NavbarBrand } from 'reactstrap';

class Header extends Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false
        };
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    sidebarToggle(e) {
        e.preventDefault();
        document.body.classList.toggle('sidebar-hidden');
    }

    sidebarMinimize(e) {
        e.preventDefault();
        document.body.classList.toggle('sidebar-minimized');
    }

    mobileSidebarToggle(e) {
        e.preventDefault();
        document.body.classList.toggle('sidebar-mobile-show');
    }

    asideToggle(e) {
        e.preventDefault();
        document.body.classList.toggle('aside-menu-hidden');
    }

    render() {
        return (
            <header className="app-header navbar">
                <NavbarToggler className="d-lg-none" onClick={this.mobileSidebarToggle}>&#9776;</NavbarToggler>
                <NavbarBrand/>
                <NavbarToggler className="d-md-down-none" onClick={this.sidebarMinimize}>&#9776;</NavbarToggler>
                <Nav className="ml-auto" navbar>
                    <NavItem className="px-3">
                        <div className="nav-link">
                            <img src={`img/avatars/${this.props.appData.uid}.jpg`} className="img-avatar"/>
                        </div>
                    </NavItem>
                </Nav>
            </header>
        );
    }
}

Header.propTypes = {
    appData: PropTypes.object
};
export default Header;
