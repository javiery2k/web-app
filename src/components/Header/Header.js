import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {
    Badge,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Nav,
    NavItem,
    NavLink,
    NavbarToggler,
    NavbarBrand,
    DropdownToggle
} from 'reactstrap';

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
                            <img src={'https://s.gravatar.com/avatar/035e30f83e96379e1567fc976230c8e0?s=80'} className="img-avatar"/>
                        </div>
                    </NavItem>
                </Nav>
            </header>
        );
    }
}

export default Header;
