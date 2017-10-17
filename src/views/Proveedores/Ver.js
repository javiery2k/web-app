import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Card, CardBlock, FormGroup, Label } from "reactstrap";

class VerProveedor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: {},
            loading: true
        };
    }

    componentDidMount() {
        const id = this.props.match.params.id || null;
        if (id) {
            fetch(`${this.props.appData.endpoint}/proveedores/${id}/`).then(response => response.json()).then((response) => {
                this.setState({
                    item: response.rows[0],
                    loading: false
                });
            });
        }
    }
    render() {
        if (this.state.loading === true) {
            return (
                <div className="loading">Loading</div>
            );
        }
        const item = this.state.item;
        return (
            <div className="animated fadeIn view-data">
                <Row>
                    <Col>
                        <Card>
                            <CardBlock className="card-body">
                                <Link to={`/proveedores/editar/${item.idproveedor}`}>
                                    <Button color="success">
                                        <i className="fa fa-edit"/>{'\u00A0'} Editar
                                    </Button>
                                </Link>
                                <Link to={`/proveedores/listar/`}>
                                    <Button color="info">
                                        <i className="fa fa-list-alt"/>{'\u00A0'} Listado
                                    </Button>
                                </Link>
                            </CardBlock>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        <Card>
                            <CardBlock className="card-body">
                                <Row>
                                    <Col xs="12" md="6">
                                        <h6>Información General</h6>
                                        <Row>
                                            <Col xs="12">
                                                <FormGroup>
                                                    <Label>id:</Label>
                                                    <div className="custom-view">{item.idproveedor}</div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12">
                                                <FormGroup>
                                                    <Label>Fecha de Creación:</Label>
                                                    <div className="custom-view">{item.fecha}</div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12">
                                                <FormGroup>
                                                    <Label>Nombre:</Label>
                                                    <div className="custom-view">{item.nombre}</div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12" md="12">
                                                <FormGroup>
                                                    <Label>Website:</Label>
                                                    <div className="custom-view">{item.website}</div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12">
                                                <FormGroup>
                                                    <Label>Giro Comercial:</Label>
                                                    <div className="custom-view">{item.giro_comercial}</div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12" md="12">
                                                <FormGroup>
                                                    <Label>Descripcion:</Label>
                                                    <div className="custom-view">{item.descripcion}</div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs="12" md="6">
                                        <h6>Información Fiscal</h6>
                                        <Row>
                                            <Col xs="12">
                                                <FormGroup>
                                                    <Label>Nombre o Razon Social:</Label>
                                                    <div className="custom-view">{item.razon_social}</div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12" md="12">
                                                <FormGroup>
                                                    <Label>RUC:</Label>
                                                    <div className="custom-view">{item.ruc}</div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12">
                                                <FormGroup>
                                                    <Label>Direccion:</Label>
                                                    <div className="custom-view">{item.direccion}</div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12" md="6">
                                                <FormGroup>
                                                    <Label>Ciudad:</Label>
                                                    <div className="custom-view">{item.ciudad}</div>
                                                </FormGroup>
                                            </Col>
                                            <Col xs="12" md="6">
                                                <FormGroup>
                                                    <Label>Pais:</Label>
                                                    <div className="custom-view">{this.props.appData.countries[item.pais]}</div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <h6>Información de Contacto</h6>
                                        <Row>
                                            <Col xs="12">
                                                <FormGroup>
                                                    <Label>Nombre Contacto:</Label>
                                                    <div className="custom-view">{item.nombre_contacto}</div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12">
                                                <FormGroup>
                                                    <Label>Email:</Label>
                                                    <div className="custom-view">{item.email_contacto}</div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12" md="6">
                                                <FormGroup>
                                                    <Label>Telefono:</Label>
                                                    <div className="custom-view">{item.telefono}</div>
                                                </FormGroup>
                                            </Col>
                                            <Col xs="12" md="6">
                                                <FormGroup>
                                                    <Label>FAX:</Label>
                                                    <div className="custom-view">{item.fax}</div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </CardBlock>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}
VerProveedor.propTypes = {
    appData: PropTypes.object,
    match: PropTypes.object
};
export default VerProveedor;
