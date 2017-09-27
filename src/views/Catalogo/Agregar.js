import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import validate from 'validate.js';
import qs from 'qs';
import { Alert, Row, Col, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Card, CardHeader, CardFooter, CardBlock, Form, FormGroup, FormText, Label, Input, InputGroup, InputGroupAddon, InputGroupButton } from "reactstrap";
class AgregarProveedor extends Component {
    constructor(props) {
        super(props);
        const type = (this.props.match.params.id) ? 'edit' : 'add';
        this.defaultFields = {
            tipoitem: 'activo',
            codigo: '',
            nombre: '',
            marca: '',
            descripcion: ''
        }
        this.state = {
            message: false,
            modified_id: '',
            attributes: this.defaultFields,
            errors: {},
            type: 'add'
        };
        this.constraints = {
            codigo: {
                presence: {
                    message: '^Ingrese el codigo.'
                }
            },
            nombre: {
                presence: {
                    message: '^Ingrese el nombre.'
                }
            },
            marca: {
                presence: {
                    message: '^Ingrese la marca.'
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
            fetch(`${this.props.appData.endpoint}/activos/${id}/`).then((response) => {
                return response.json();
            }).then((response) => {
                this.setState({
                    attributes: {
                        ...this.state.attributes,
                        ...this.lowerCaseObj(response.rows[0])
                    },
                    type: 'edit'
                });
            });
        }
    }
    componentWillReceiveProps() {
        this.setState({
            message: false,
            modified_id: '',
            attributes: { ...this.defaultFields },
            errors: {},
            type: 'add'
        });
    }
    lowerCaseObj(obj) {
        var ret = {};
        var keys = Object.keys(Object(obj));

        for (var i = 0; i < keys.length; i++) {
            ret[keys[i].toLowerCase()] = (obj[keys[i]]) || '';
        }
        return ret;
    }
    handleInputChange(event) {
        const target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            attributes: {
                ...this.state.attributes,
                [name]: value
            }
        });
    }
    handleValidForm() {
        fetch(`${this.props.appData.endpoint}/activos/`, {
                method: "POST",
                headers: {
                    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                },
                body: qs.stringify(this.state.attributes)
            })
            .then((response) => {
                return response.json();
            }).then((response) => {
                let attributes = { ...this.defaultFields }
                if (this.state.type == 'edit') {
                    attributes = { ...this.state.attributes }
                }
                this.setState({
                    errors: {},
                    modified_id: response.id,
                    message: true,
                    attributes
                });

                setTimeout(() => {
                    this.setState({
                        message: false
                    });
                }, 3000);
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
            this.handleValidForm()
        }, (errors) => {
            this.handleErrorForm(errors);
        });
    }
    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12">
                        {this.state.message && this.state.type === 'add' &&
                        <Alert color="success">
                            <strong>Nuevo!</strong> El registro fue agregado correctamente en el sistema con el id #  {this.state.modified_id}.
                        </Alert>}

                        {this.state.message && this.state.type === 'edit' &&
                        <Alert color="success">
                            <strong>Actualizado!</strong> El registro fue actualizado correctamente en el sistema con el id #  {this.state.modified_id}.
                        </Alert>}
                        <Card>
                            <CardHeader>
                                <i className="fa fa-edit"/>{this.state.type === 'edit' ? 'Actualizar Registro' : 'Nuevo Registro'}
                            </CardHeader>
                            <CardBlock className="card-body">
                                <Form className="form-horizontal" onSubmit={this.handleSubmit}>
                                    <Row>
                                      <Col xs="12" md="6">
                                          <FormGroup>
                                              <Label htmlFor="codigo">Codigo</Label>
                                              <Input
                                                  className={this.state.errors.codigo ? 'is-invalid' : ''}
                                                  value={this.state.attributes.codigo}
                                                  onChange={this.handleInputChange}
                                                  type="text"
                                                  name="codigo"/>
                                              <span className="error-message">{this.state.errors.codigo}</span>
                                          </FormGroup>
                                      </Col>
                                      <Col xs="12" md="6">
                                          <FormGroup>
                                              <Label htmlFor="nombre">Nombre</Label>
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
                                      <Col xs="12" md="6">
                                          <FormGroup>
                                              <Label htmlFor="marca">Marca</Label>
                                              <Input
                                                  className={this.state.errors.marca ? 'is-invalid' : ''}
                                                  value={this.state.attributes.marca}
                                                  onChange={this.handleInputChange}
                                                  type="text"
                                                  name="marca"/>
                                              <span className="error-message">{this.state.errors.marca}</span>
                                          </FormGroup>
                                      </Col>
                                    </Row>
                                    <Row>
                                      <Col xs="12" md="12">
                                          <FormGroup>
                                              <Label htmlFor="textarea-input">Descripcion</Label>
                                              <Input
                                                  rows="10"
                                                  className={this.state.errors.descripcion ? 'is-invalid' : ''}
                                                  value={this.state.attributes.descripcion}
                                                  onChange={this.handleInputChange}
                                                  type="textarea"
                                                  name="descripcion"/>
                                          </FormGroup>
                                      </Col>
                                    </Row>

                                    <div className="form-actions">
                                        <Button type="submit" color="primary">Guardar</Button>
                                        <Link to="/catalogo/listar/">
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

export default AgregarProveedor;
