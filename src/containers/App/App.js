import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import Header from './../../components/Header/Header';
import Sidebar from './../../components/Sidebar/Sidebar';
import Breadcrumb from './../../components/Breadcrumb/Breadcrumb';
import Footer from './../../components/Footer/Footer';

import Dashboard from './../../views/Dashboard/Dashboard';
import OrdenesListar from './../../views/Ordenes/Listar';
import OrdenesAgregar from './../../views/Ordenes/Agregar';
import RequisicionesListar from './../../views/Requisiciones/Listar';
import RequisicionesAgregar from './../../views/Requisiciones/Agregar';
import ProveedoresListar from './../../views/Proveedores/Listar';
import ProveedoresAgregar from './../../views/Proveedores/Agregar';
import CatalogoListar from './../../views/Catalogo/Listar';
import CatalogoAgregar from './../../views/Catalogo/Agregar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appData: {}
    };
  }
  render() {
    return (
      <div className="app">
        <Header {...this.props} appData={this.state.appData}/>
        <div className="app-body">
          <Sidebar {...this.props} appData={this.state.appData}/>
          <main className="main">
            <Breadcrumb {...this.props} appData={this.state.appData}/>
            <div className="container-fluid">
              <Switch>
                <Route path="/dashboard" name="Dashboard" component={Dashboard}/>
                <Route path="/requisiciones/listar" name="Listado de Requisiciones" component={RequisicionesListar}/>
                <Route path="/requisiciones/agregar" name="Agregar Requisicion" component={RequisicionesAgregar}/>
                <Route path="/ordenes/listar" name="Listado de Ordenes" component={OrdenesListar}/>
                <Route path="/ordenes/agregar" name="Agregar Orden" component={OrdenesAgregar}/>
                <Route path="/proveedores/listar" name="Listado de Proveedores" component={ProveedoresListar}/>
                <Route path="/proveedores/agregar" name="Agregar Proveedor" component={ProveedoresAgregar}/>
                <Route path="/catalogo/listar" name="Listado de Productos" component={CatalogoListar}/>
                <Route path="/catalogo/agregar" name="Agregar Producto" component={CatalogoAgregar}/>
                <Redirect from="/" to="/dashboard"/>
              </Switch>
            </div>
          </main>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default App;
