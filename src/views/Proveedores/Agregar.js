import React, { Component } from 'react';
import validate from 'validate.js';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import qs from 'qs';
import { Row, Col, Button, Card, CardHeader, CardBlock, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon } from "reactstrap";


class AgregarProveedor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            attributes: {
                nombre: '',
                website: '',
                giro_comercial: '',
                descripcion: '',
                razon_social: '',
                ruc: '',
                direccion: '',
                ciudad: '',
                pais: '',
                nombre_contacto: '',
                email_contacto: '',
                telefono: '',
                fax: '',
                status: 'activo',
                fecha: ''
            },
            errors: {},
            type: 'add'
        };
        this.constraints = {
            nombre: {
                presence: {
                    message: '^Ingrese el nombre.'
                }
            },
            nombre_contacto: {
                presence: {
                    message: '^Ingrese el nombre contacto.'
                }
            },
            email_contacto: {

                presence: {
                    message: '^Ingrese el email.'
                },
                email: {
                    message: '^Ingrese un email valido.'
                }
            },
            razon_social: {
                presence: {
                    message: '^Ingrese la razon social.'
                }
            },
            ruc: {
                presence: {
                    message: '^Ingrese el RUC.'
                }
            }
        };

        this.handleValidForm = this.handleValidForm.bind(this);
        this.handleErrorForm = this.handleErrorForm.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const id = this.props.match.params.id || null;
        if (id) {
            fetch(`${this.props.appData.endpoint}/proveedores/${id}/`).then(response => response.json()).then((response) => {
                this.setState({
                    attributes: {
                        ...this.state.attributes,
                        ...response.rows[0]
                    },
                    type: 'edit'
                });
            });
        }
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            attributes: {
                ...this.state.attributes,
                [name]: value
            }
        });
    }
    handleValidForm() {
        fetch(`${this.props.appData.endpoint}/proveedores/`, {
            method: "POST",
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: qs.stringify(this.state.attributes)
        }).then(response => response.json()).then((response) => {
            if (response.status === 'ok') {
                this.props.history.push(`/proveedores/ver/${response.id}/`);
            }
        });
    }
    handleErrorForm(errors) {
        const Obj = {};
        Object.keys(errors).map((key) => {
            Obj[key] = errors[key][0];
            return true;
        });
        this.setState({
            errors: Obj
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        validate.async(this.state.attributes, this.constraints).then(() => {
            this.handleValidForm();
        }, (errors) => {
            this.handleErrorForm(errors);
        });
    }
    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col>
                        <Card>
                            <CardBlock className="card-body">
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
                            <CardHeader>
                                <i className="fa fa-edit"/>{this.state.type === 'edit' ? 'Actualizar Registro' : 'Nuevo Registro'}
                            </CardHeader>
                            <CardBlock className="card-body">
                                <Form className="form-horizontal" onSubmit={this.handleSubmit}>
                                    <Row>
                                        <Col xs="12" md="6">
                                            <h6>Información General</h6>
                                            <Row>
                                                <Col xs="12">
                                                    <FormGroup>
                                                        <Label>Nombre</Label>
                                                        <Input
                                                            className={this.state.errors.nombre ? 'is-invalid' : ''}
                                                            value={this.state.attributes.nombre}
                                                            onChange={this.handleInputChange}
                                                            type="text"
                                                            name="nombre"/>
                                                        <span className="error-message">{this.state.errors.nombre}</span>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs="12" md="12">
                                                    <FormGroup>
                                                        <Label>Website</Label>
                                                        <Input
                                                            className={this.state.errors.website ? 'is-invalid' : ''}
                                                            value={this.state.attributes.website}
                                                            onChange={this.handleInputChange}
                                                            type="text"
                                                            name="website"/>
                                                        <span className="error-message">{this.state.errors.website}</span>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs="12">
                                                    <FormGroup>
                                                        <Label>Giro Comercial</Label>
                                                        <Input
                                                            className={this.state.errors.giro_comercial ? 'is-invalid' : ''}
                                                            value={this.state.attributes.giro_comercial}
                                                            onChange={this.handleInputChange}
                                                            type="text"
                                                            name="giro_comercial"/>
                                                        <span className="error-message">{this.state.errors.giro_comercial}</span>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs="12" md="12">
                                                    <FormGroup>
                                                        <Label>Descripcion</Label>
                                                        <Input
                                                            rows="6"
                                                            className={this.state.errors.descripcion ? 'is-invalid' : ''}
                                                            value={this.state.attributes.descripcion}
                                                            onChange={this.handleInputChange}
                                                            type="textarea"
                                                            name="descripcion"/>
                                                        <span className="error-message">{this.state.errors.descripcion}</span>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col xs="12" md="6">
                                            <h6>Información Fiscal</h6>
                                            <Row>
                                                <Col xs="12">
                                                    <FormGroup>
                                                        <Label>Nombre o Razon Social</Label>
                                                        <Input
                                                            className={this.state.errors.razon_social ? 'is-invalid' : ''}
                                                            value={this.state.attributes.razon_social}
                                                            onChange={this.handleInputChange}
                                                            type="text"
                                                            name="razon_social"/>
                                                        <span className="error-message">{this.state.errors.razon_social}</span>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs="12" md="12">
                                                    <FormGroup>
                                                        <Label>RUC</Label>
                                                        <Input
                                                            className={this.state.errors.ruc ? 'is-invalid' : ''}
                                                            value={this.state.attributes.ruc}
                                                            onChange={this.handleInputChange}
                                                            type="text"
                                                            name="ruc"/>
                                                        <span className="error-message">{this.state.errors.ruc}</span>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs="12">
                                                    <FormGroup>
                                                        <Label>Direccion</Label>
                                                        <InputGroup>
                                                            <Input
                                                                className={this.state.errors.direccion ? 'is-invalid' : ''}
                                                                value={this.state.attributes.direccion}
                                                                onChange={this.handleInputChange}
                                                                type="text"
                                                                name="direccion"/>
                                                            <InputGroupAddon><i className="fa fa-map-marker"/></InputGroupAddon>
                                                        </InputGroup>
                                                        <span className="error-message">{this.state.errors.direccion}</span>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs="12" md="6">
                                                    <FormGroup>
                                                        <Label>Ciudad</Label>
                                                        <Input
                                                            className={this.state.errors.ciudad ? 'is-invalid' : ''}
                                                            value={this.state.attributes.ciudad}
                                                            onChange={this.handleInputChange}
                                                            type="text"
                                                            name="ciudad"/>
                                                        <span className="error-message">{this.state.errors.ciudad}</span>
                                                    </FormGroup>
                                                </Col>
                                                <Col xs="12" md="6">
                                                    <FormGroup>
                                                        <Label>Pais</Label>
                                                        <Input
                                                            value={this.state.attributes.pais}
                                                            onChange={this.handleInputChange}
                                                            type="select"
                                                            name="pais">
                                                            <option value/>
                                                            {Object.keys(this.props.appData.countries).map(index =>
                                                                <option key={index} value={index}>{this.props.appData.countries[index]}</option>
                                                            )}
                                                        </Input>

                                                        <span className="error-message">{this.state.errors.pais}</span>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <h6>Información de Contacto</h6>
                                            <Row>
                                                <Col xs="12">
                                                    <FormGroup>
                                                        <Label>Nombre Contacto</Label>
                                                        <Input
                                                            className={this.state.errors.nombre_contacto ? 'is-invalid' : ''}
                                                            value={this.state.attributes.nombre_contacto}
                                                            onChange={this.handleInputChange}
                                                            type="text"
                                                            name="nombre_contacto"/>
                                                        <span className="error-message">{this.state.errors.nombre_contacto}</span>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs="12">
                                                    <FormGroup>
                                                        <Label>Email</Label>
                                                        <Input
                                                            className={this.state.errors.email_contacto ? 'is-invalid' : ''}
                                                            value={this.state.attributes.email_contacto}
                                                            onChange={this.handleInputChange}
                                                            type="text"
                                                            name="email_contacto"/>
                                                        <span className="error-message">{this.state.errors.email_contacto}</span>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs="12" md="6">
                                                    <FormGroup>
                                                        <Label>Telefono</Label>
                                                        <Input
                                                            className={this.state.errors.telefono ? 'is-invalid' : ''}
                                                            value={this.state.attributes.telefono}
                                                            onChange={this.handleInputChange}
                                                            type="text"
                                                            name="telefono"/>
                                                        <span className="error-message">{this.state.errors.telefono}</span>
                                                    </FormGroup>
                                                </Col>
                                                <Col xs="12" md="6">
                                                    <FormGroup>
                                                        <Label>FAX</Label>
                                                        <Input
                                                            className={this.state.errors.fax ? 'is-invalid' : ''}
                                                            value={this.state.attributes.fax}
                                                            onChange={this.handleInputChange}
                                                            type="text"
                                                            name="fax"/>
                                                        <span className="error-message">{this.state.errors.fax}</span>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <div className="form-actions">
                                        <Button type="submit" color="primary">Guardar</Button>
                                        <Link to="/proveedores/listar/">
                                            <Button color="secondary">Cancelar</Button>
                                        </Link>
                                    </div>
                                </Form>
                            </CardBlock>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}
AgregarProveedor.propTypes = {
    appData: PropTypes.object,
    match: PropTypes.object,
    history: PropTypes.object
};
export default AgregarProveedor;
