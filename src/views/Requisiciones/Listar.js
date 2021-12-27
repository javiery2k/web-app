import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Row, Col, Card, CardHeader, CardBlock, Table, Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import Pagination from "react-js-pagination";

class ListarRequisiciones extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                rows: [],
                total: 0
            },
            loading: false
        };
        this.handlePageChange = this.handlePageChange.bind(this);
    }
    componentDidMount() {
        fetch(`${this.props.appData.endpoint}/requisiciones/`).then(response => response.json()).then((response) => {
            this.setState({ data: response, loading: false, activePage: 1 });
        });
    }
    handlePageChange(pageNumber) {
        fetch(`${this.props.appData.endpoint}/requisiciones/?pageNumber=${pageNumber}`).then(response => response.json()).then((response) => {
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
                            <Link to={`/requisiciones/agregar/`}>
                                <Button color="success">
                                    <i className="fa fa-plus"/>{'\u00A0'} Nueva Requisicion
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
                            <i className="fa fa-align-justify"/> Gestionar Requisiciones
                        </CardHeader>
                        <CardBlock className="card-body">
                            <Table responsive>
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
                                            <td className="numeral">{`${index + 1}`}</td>
                                            <td>
                                                <UncontrolledDropdown>
                                                    <DropdownToggle caret>
                                                      acciones
                                                    </DropdownToggle>
                                                    <DropdownMenu>
                                                        <Link to={`/requisiciones/ver/${item.idrequisiciones}/`}>
                                                            <DropdownItem>Ver</DropdownItem>
                                                        </Link>
                                                        <Link to={`/requisiciones/editar/${item.idrequisiciones}/`}>
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
ListarRequisiciones.propTypes = {
    appData: PropTypes.object
};
export default ListarRequisiciones;
