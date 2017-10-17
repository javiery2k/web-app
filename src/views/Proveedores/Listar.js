import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Row, Col, Card, CardHeader, CardBlock, Table, Button, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import Pagination from "react-js-pagination";

class ListarProveedores extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                rows: [],
                total: 0
            },
            loading: true
        };
        this.handlePageChange = this.handlePageChange.bind(this);
    }
    componentDidMount() {
        fetch(`${this.props.appData.endpoint}/proveedores/`).then(response => response.json()).then((response) => {
            this.setState({ data: response, loading: false, activePage: 1 });
        });
    }
    handlePageChange(pageNumber) {
        fetch(`${this.props.appData.endpoint}/proveedores/?pageNumber=${pageNumber}`).then(response => response.json()).then((response) => {
            this.setState({ data: response, loading: false, activePage: pageNumber });
        });
    }
    render() {
        if (this.state.loading === true) {
            return (
                <div className="loading">Loading</div>
            );
        }
        return (<div>
            <Row>
                <Col>
                    <Card>
                        <CardBlock className="card-body">
                            <Link to={`/proveedores/agregar/`}>
                                <Button color="success">
                                    <i className="fa fa-plus"/>{'\u00A0'} Nuevo Proveedor
                                </Button>
                            </Link>
                        </CardBlock>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>

                    <Card>
                        <CardHeader>
                            <i className="fa fa-align-justify"/> Gestionar Proveedores
                        </CardHeader>
                        <CardBlock className="card-body">
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Acciones</th>
                                        <th>Nombre</th>
                                        <th>Contato</th>
                                        <th>Email</th>
                                        <th>Razon Social</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.data.rows.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.rnum}</td>
                                            <td>
                                                <UncontrolledDropdown>
                                                    <DropdownToggle caret>
                                                      acciones
                                                    </DropdownToggle>
                                                    <DropdownMenu>
                                                        <Link to={`/proveedores/ver/${item.idproveedor}/`}>
                                                            <DropdownItem><i className="fa fa-eye"/> Ver</DropdownItem>
                                                        </Link>
                                                        <Link to={`/proveedores/editar/${item.idproveedor}/`}>
                                                            <DropdownItem><i className="fa fa-edit"/> Editar</DropdownItem>
                                                        </Link>
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </td>
                                            <td>{item.nombre}</td>
                                            <td>{item.nombre_contacto}</td>
                                            <td>{item.email_contacto}</td>
                                            <td>{item.razon_social}</td>
                                        </tr>))}
                                </tbody>
                            </Table>
                            <nav>
                                <Pagination
                                    activePage={this.state.activePage}
                                    itemsCountPerPage={10}
                                    totalItemsCount={this.state.data.total}
                                    pageRangeDisplayed={5}
                                    onChange={this.handlePageChange}
                                />
                            </nav>
                        </CardBlock>
                    </Card>
                </Col>
            </Row>
        </div>);
    }
}
ListarProveedores.propTypes = {
    appData: PropTypes.object
};
export default ListarProveedores;
