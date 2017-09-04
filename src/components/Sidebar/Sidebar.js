import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';

class Sidebar extends Component {

  handleClick(e) {
    e.preventDefault();
    e.target.parentElement.classList.toggle('open');
  }

  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1
      ? 'nav-item nav-dropdown open'
      : 'nav-item nav-dropdown';
  }

  render() {
    return (
      <div className="sidebar">
        <nav className="sidebar-nav">
          <ul className="nav">
            <li className="nav-item">
              <NavLink to={'/dashboard'} className="nav-link" activeClassName="active"><i className="fa fa-info"/>
                Dashboard
              </NavLink>
            </li>
            <li className="nav-title">
              Menu de Opciones
            </li>
            <li className={this.activeRoute("/requisiciones")}>
              <a className="nav-link nav-dropdown-toggle" onClick={this.handleClick.bind(this)}><i className="fa fa-folder"/>
                Requisicion</a>
              <ul className="nav-dropdown-items">
                <li className="nav-item">
                  <NavLink to={'/requisiciones/listar'} className="nav-link" activeClassName="active"><i className="fa fa-list-alt"/>
                    Listado</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/requisiciones/agregar'} className="nav-link" activeClassName="active"><i className="fa fa-plus"/>
                    Agregar</NavLink>
                </li>
              </ul>
            </li>
            <li className={this.activeRoute("/ordenes")}>
              <a className="nav-link nav-dropdown-toggle" onClick={this.handleClick.bind(this)}><i className="fa fa-folder"/>
                Ordenes</a>
              <ul className="nav-dropdown-items">
                <li className="nav-item">
                  <NavLink to={'/ordenes/listar'} className="nav-link" activeClassName="active"><i className="fa fa-list-alt"/>
                    Listado</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/ordenes/agregar'} className="nav-link" activeClassName="active"><i className="fa fa-plus"/>
                    Agregar</NavLink>
                </li>
              </ul>
            </li>
            <li className={this.activeRoute("/catalogo")}>
              <a className="nav-link nav-dropdown-toggle" onClick={this.handleClick.bind(this)}><i className="fa fa-folder"/>
                Catalogo</a>
              <ul className="nav-dropdown-items">
                <li className="nav-item">
                  <NavLink to={'/catalogo/listar'} className="nav-link" activeClassName="active"><i className="fa fa-list-alt"/>
                    Listado</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/catalogo/agregar'} className="nav-link" activeClassName="active"><i className="fa fa-plus"/>
                    Agregar</NavLink>
                </li>
              </ul>
            </li>
            <li className={this.activeRoute("/proveedores")}>
              <a className="nav-link nav-dropdown-toggle" onClick={this.handleClick.bind(this)}><i className="fa fa-folder"/>
                Proveedores</a>
              <ul className="nav-dropdown-items">
                <li className="nav-item">
                  <NavLink to={'/proveedores/listar'} className="nav-link" activeClassName="active"><i className="fa fa-list-alt"/>
                    Listado</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/proveedores/agregar'} className="nav-link" activeClassName="active"><i className="fa fa-plus"/>
                    Agregar</NavLink>
                </li>
              </ul>
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
