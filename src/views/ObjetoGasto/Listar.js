import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Row, Col, Card, CardHeader, CardBlock, Table, Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import Pagination from "react-js-pagination";

class ListarObjetosGasto extends Component {
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
        fetch(`${this.props.appData.endpoint}/objeto_gasto/`).then(response => response.json()).then((response) => {
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
        fetch(`${this.props.appData.endpoint}/objeto_gasto/?pageNumber=${pageNumber}`).then(response => response.json()).then((response) => {
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
                            <i className="fa fa-align-justify"/> Gestionar Objetos de Gasto
                        </CardHeader>
                        <CardBlock className="card-body">
                            <Row>
                                <Col xs="12">
                                    <Link to={`/objeto_gasto/agregar/`}>
                                        <Button color="success">
                                            <i className="fa fa-plus"/>{'\u00A0'} Agregar
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
                                        <th className="numeral">#</th>
                                        <th className="text-center">Acciones</th>
                                        <th className="text-center">Codigo</th>
                                        <th>Nombre</th>
                                        <th>Descripcion</th>
                                    </tr>
                                </thead>
                                {this.state.data.rows &&
                                <tbody>
                                    {this.state.data.rows.map((item, index) => (
                                        <tr key={index}>
                                            <td className="numeral">{`${index + 1}`}</td>
                                            <td className="text-center">
                                                <UncontrolledDropdown size="sm">
                                                    <DropdownToggle caret>
                                                      acciones
                                                    </DropdownToggle>
                                                    <DropdownMenu>
                                                        <Link to={`/objeto_gasto/ver/${item.idobjeto_gasto}/`}>
                                                            <DropdownItem>Ver</DropdownItem>
                                                        </Link>
                                                        <Link to={`/objeto_gasto/editar/${item.idobjeto_gasto}/`}>
                                                            <DropdownItem>Editar</DropdownItem>
                                                        </Link>
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </td>
                                            <td className="text-center">{item.codigo}</td>
                                            <td>{item.nombre}</td>
                                            <td>{item.descripcion}</td>

                                        </tr>))}
                                </tbody>}
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
ListarObjetosGasto.propTypes = {
    appData: PropTypes.object
};
export default ListarObjetosGasto;
