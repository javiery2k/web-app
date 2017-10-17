import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cookie from 'react-cookies';
import { NavLink } from 'react-router-dom';

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.onLogout = this.onLogout.bind(this);
    }
    handleClick(e) {
        e.preventDefault();
        e.target.parentElement.classList.toggle('open');
    }
    onLogout() {
        cookie.remove('data');
        location.href = '/';
    }
    activeRoute(routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
    }
    render() {
        return (
            <div className="sidebar">
                <nav className="sidebar-nav">
                    <ul className="nav">
                        <li className="nav-item">
                            <NavLink to={'/dashboard'} className="nav-link"><i className="fa fa-home"/>
                                Dashboard
                            </NavLink>
                        </li>
                        <li className="nav-title">
                          Menu de Opciones
                        </li>
                        <li className={this.activeRoute("/requisiciones")}>
                            <a className="nav-link nav-dropdown-toggle" onClick={this.handleClick.bind(this)}>
                                <i className="icon-docs"/> Requisicion
                            </a>
                            <ul className="nav-dropdown-items">
                                <li className="nav-item">
                                    <NavLink to={'/requisiciones/listar'} className="nav-link">
                                        Gestionar
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to={'/requisiciones/agregar'} className="nav-link">
                                        Agregar
                                    </NavLink>
                                </li>
                            </ul>
                        </li>
                        <li className={this.activeRoute("/catalogo")}>
                            <a className="nav-link nav-dropdown-toggle" onClick={this.handleClick.bind(this)}>
                                <i className="icon-notebook"/> Catalogo
                            </a>
                            <ul className="nav-dropdown-items">
                                <li className="nav-item">
                                    <NavLink to={'/catalogo/listar'} className="nav-link">
                                        Gestionar
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to={'/catalogo/agregar'} className="nav-link">
                                        Crear Activo / Servicio
                                    </NavLink>
                                </li>
                            </ul>
                        </li>
                        <li className={this.activeRoute("/objeto_gasto")}>
                            <a className="nav-link nav-dropdown-toggle" onClick={this.handleClick.bind(this)}>
                                <i className="icon-tag"/> Objeto de Gasto
                            </a>
                            <ul className="nav-dropdown-items">
                                <li className="nav-item">
                                    <NavLink to={'/objeto_gasto/listar'} className="nav-link">
                                    Gestionar</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to={'/objeto_gasto/agregar'} className="nav-link">
                                    Nuevo Objeto</NavLink>
                                </li>
                            </ul>
                        </li>
                        <li className={this.activeRoute("/proveedores")}>
                            <a className="nav-link nav-dropdown-toggle" onClick={this.handleClick.bind(this)}>
                                <i className="icon-notebook"/> Proveedores
                            </a>
                            <ul className="nav-dropdown-items">
                                <li className="nav-item">
                                    <NavLink to={'/proveedores/listar'} className="nav-link">
                                        Gestionar
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to={'/proveedores/agregar'} className="nav-link">
                                        Crear Proveedor
                                    </NavLink>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <div className="nav-link" onClick={this.onLogout}>
                                <i className="fa fa-sign-out"/> Logout
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}
Sidebar.propTypes = {
    location: PropTypes.object
};
export default Sidebar;
