import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Row, Col, Card, CardHeader, CardBlock, Table, Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import Pagination from "react-js-pagination";

class ListarCatalogo extends Component {
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
        fetch(`${this.props.appData.endpoint}/catalogo/`).then(response => response.json()).then((response) => {
            this.setState({
                data: {
                    ...this.state.data,
                    ...response
                },
                loading: false,
                activePage: 1
            });
        });
    }
    handlePageChange(pageNumber) {
        fetch(`${this.props.appData.endpoint}/catalogo/?pageNumber=${pageNumber}`).then(response => response.json()).then((response) => {
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
                        <CardHeader>
                            <i className="fa fa-align-justify"/> Gestionar Catalogo
                        </CardHeader>
                        <CardBlock className="card-body">
                            <Row>
                                <Col xs="12">
                                    <Link to={`/catalogo/agregar/`}>
                                        <Button color="success">
                                            <i className="fa fa-plus"/>{'\u00A0'} Nuevo Activo/Servicio
                                        </Button>
                                    </Link>
                                </Col>
                                <Col xs="12">
                                    <hr/>
                                </Col>
                            </Row>
                            <Table striped responsive size="sm">
                                <thead>
                                    <tr>
                                        <th width="2%">#</th>
                                        <th>Acciones</th>
                                        <th>Tipo</th>
                                        <th>Codigo</th>
                                        <th>Nombre</th>
                                        <th>Marca</th>
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
                                                        <Link to={`/catalogo/ver/${item.idcatalogo}/`}>
                                                            <DropdownItem>Ver</DropdownItem>
                                                        </Link>
                                                        <Link to={`/catalogo/editar/${item.idcatalogo}/`}>
                                                            <DropdownItem>Editar</DropdownItem>
                                                        </Link>
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </td>
                                            <td>{item.tipoitem}</td>
                                            <td>{item.codigo}</td>
                                            <td>{item.nombre}</td>
                                            <td>{item.marca}</td>

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
ListarCatalogo.propTypes = {
    appData: PropTypes.object
};
export default ListarCatalogo;
