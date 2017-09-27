import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Container } from 'reactstrap';

import Environment from './../../../config/Initialize';

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
import ProveedoresVer from './../../views/Proveedores/Ver';
import CatalogoListar from './../../views/Catalogo/Listar';
import CatalogoAgregar from './../../views/Catalogo/Agregar';
import CatalogoVer from './../../views/Catalogo/Ver';

import * as Api from './../../helper/Api';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appData: {
                endpoint: Environment.endpoint
            },
            loading: true
        };
    }
    componentDidMount() {
        Api.login().then((appData) => {
            this.setState({ loading: false });
        });
    }
    render() {
        if (this.state.loading === true) {
            return (
                <div  className="loading">Loading</div>
            );
        }
        return (
            <div className="app">
                <Header {...this.props} appData={this.state.appData}/>
                <div className="app-body">
                    <Sidebar {...this.props} appData={this.state.appData}/>
                    <main className="main">
                        <Breadcrumb {...this.props} appData={this.state.appData}/>
                        <div className="container-fluid">
                            <Switch>
                                <Route path="/dashboard/" render={routeProps => <Dashboard {...routeProps} appData={this.state.appData}/>} />
                                <Route path="/requisiciones/listar/" render={routeProps => <RequisicionesListar {...routeProps} appData={this.state.appData}/>} />
                                <Route path="/requisiciones/agregar/" render={routeProps => <RequisicionesAgregar {...routeProps} appData={this.state.appData}/>} />
                                <Route path="/ordenes/listar/" render={routeProps => <OrdenesListar {...routeProps} appData={this.state.appData}/>} />
                                <Route path="/ordenes/agregar/" render={routeProps => <OrdenesAgregar {...routeProps} appData={this.state.appData}/>} />
                                <Route path="/proveedores/listar/" render={routeProps => <ProveedoresListar {...routeProps} appData={this.state.appData}/>} />
                                <Route path="/proveedores/agregar/" render={routeProps => <ProveedoresAgregar {...routeProps} appData={this.state.appData}/>} />
                                <Route path="/proveedores/editar/:id" render={routeProps => <ProveedoresAgregar {...routeProps} appData={this.state.appData}/>} />
                                <Route path="/proveedores/ver/:id" render={routeProps => <ProveedoresVer {...routeProps} appData={this.state.appData}/>} />
                                <Route path="/catalogo/listar/" render={routeProps => <CatalogoListar {...routeProps} appData={this.state.appData}/>} />
                                <Route path="/catalogo/agregar/" render={routeProps => <CatalogoAgregar {...routeProps} appData={this.state.appData}/>} />
                                <Route path="/catalogo/editar/:id" render={routeProps => <CatalogoAgregar {...routeProps} appData={this.state.appData}/>} />
                                <Route path="/catalogo/ver/:id" render={routeProps => <CatalogoVer {...routeProps} appData={this.state.appData}/>} />
                            </Switch>
                        </div>
                    </main>
                </div>
                <Footer {...this.props} appData={this.state.appData}/>
            </div>
        );
    }
}

export default App;
