import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Card, CardHeader, CardBlock, FormGroup, Label } from "reactstrap";

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
                    <Col xs="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-list"/>{'\u00A0'} <span>Detalles.</span>
                            </CardHeader>
                            <CardBlock className="card-body">
                                <Row>
                                    <Col xs="12">
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
                                    </Col>
                                    <Col xs="12">
                                        <hr/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12" md="6">
                                        <h6>Información General</h6>
                                        <hr/>
                                        <Row>
                                            <Col xs="12">
                                                <FormGroup>
                                                    <Label>id:</Label>
                                                    <div>{item.idproveedor}</div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12">
                                                <FormGroup>
                                                    <Label>Fecha de Creación:</Label>
                                                    <div>{item.fecha}</div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12">
                                                <FormGroup>
                                                    <Label>Nombre:</Label>
                                                    <div>{item.nombre}</div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12" md="12">
                                                <FormGroup>
                                                    <Label>Website:</Label>
                                                    <div>{item.website}</div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12">
                                                <FormGroup>
                                                    <Label>Giro Comercial:</Label>
                                                    <div>{item.giro_comercial}</div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12" md="12">
                                                <FormGroup>
                                                    <Label>Descripcion:</Label>
                                                    <div>{item.descripcion}</div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs="12" md="6">
                                        <h6>Información Fiscal</h6>
                                        <hr/>
                                        <Row>
                                            <Col xs="12">
                                                <FormGroup>
                                                    <Label>Nombre o Razon Social:</Label>
                                                    <div>{item.razon_social}</div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12" md="12">
                                                <FormGroup>
                                                    <Label>RUC:</Label>
                                                    <div>{item.ruc}</div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12">
                                                <FormGroup>
                                                    <Label>Direccion:</Label>
                                                    <div>{item.direccion}</div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12" md="6">
                                                <FormGroup>
                                                    <Label>Ciudad:</Label>
                                                    <div>{item.ciudad}</div>
                                                </FormGroup>
                                            </Col>
                                            <Col xs="12" md="6">
                                                <FormGroup>
                                                    <Label>Pais:</Label>
                                                    <div>{this.props.appData.countries[item.pais]}</div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <h6>Información de Contacto</h6>
                                        <hr/>
                                        <Row>
                                            <Col xs="12">
                                                <FormGroup>
                                                    <Label>Nombre Contacto:</Label>
                                                    <div>{item.nombre_contacto}</div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12">
                                                <FormGroup>
                                                    <Label>Email:</Label>
                                                    <div>{item.email_contacto}</div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12" md="6">
                                                <FormGroup>
                                                    <Label>Telefono:</Label>
                                                    <div>{item.telefono}</div>
                                                </FormGroup>
                                            </Col>
                                            <Col xs="12" md="6">
                                                <FormGroup>
                                                    <Label>FAX:</Label>
                                                    <div>{item.fax}</div>
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
