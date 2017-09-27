import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Badge, Row, Col, Card, CardHeader, CardBlock, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Pagination from "react-js-pagination";
class ListarCatalogo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                rows: [],
                total: 0
            },
            modal: false,
            selectedId: 0,
            loading: false
        };
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.toggle = this.toggle.bind(this);
    }
    componentDidMount() {
        fetch(`${this.props.appData.endpoint}/activos/`).then((response) => {
            return response.json();
        }).then((response) => {
            this.setState({ data: response, loading: false, activePage: 1 });
        });
    }
    toggle(e, selectedId = 0) {
        this.setState({
            modal: !this.state.modal,
            selectedId
        });
    }
    handleDelete() {
        fetch(`${this.props.appData.endpoint}/activos/`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: `status=inactive&id=${this.state.selectedId}`
        }).then((response) => {
            return response.json();
        });
    }
    handlePageChange(pageNumber) {
        fetch(`${this.props.appData.endpoint}/activos/?pageNumber=${pageNumber}`).then((response) => {
            return response.json();
        }).then((response) => {
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
                            <Link to={`/catalogo/agregar/`}>
                                <Button color="success">
                                    <i className="fa fa-plus"></i>{'\u00A0'} Agregar
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
                            <i className="fa fa-align-justify"/> Listado de Activos del Catalogo
                        </CardHeader>
                        <CardBlock className="card-body">
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>id</th>
                                        <th>Tipo</th>
                                        <th>Codigo</th>
                                        <th>Nombre</th>
                                        <th>Marca</th>
                                        <th>Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.data.rows.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.RNUM}</td>
                                            <td>{item.IDACTIVO}</td>
                                            <td>{item.TIPOITEM}</td>
                                            <td>{item.CODIGO}</td>
                                            <td>{item.NOMBRE}</td>
                                            <td>{item.MARCA}</td>
                                            <td>
                                                <Link to={`/catalogo/ver/${item.IDACTIVO}/`}>
                                                    <Button outline color="info" size="sm"><i className="fa fa-eye"/></Button>
                                                </Link>
                                                <Link to={`/catalogo/editar/${item.IDACTIVO}/`}>
                                                    <Button outline color="warning" size="sm"><i className="fa fa-edit"/></Button>
                                                </Link>
                                                <Button onClick={(e) => this.toggle(e, item.IDACTIVO)} outline color="danger" size="sm"><i className="fa fa-trash"/></Button>
                                            </td>
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
                            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                              <ModalHeader toggle={this.toggle}>Eliminar Proveedor</ModalHeader>
                              <ModalBody>
                                Debido a que los proveedores estan asociados a ciertas ordenes, no es posible elimminar los proveedores.
                                Desea desactivar este Proveedor para que no pueda ser utilizado posteriormente?
                              </ModalBody>
                              <ModalFooter>
                                <Button color="primary" onClick={this.handleDelete}>Desactivar</Button>{' '}
                                <Button color="secondary" onClick={this.toggle}>Cancelar</Button>
                              </ModalFooter>
                            </Modal>
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
