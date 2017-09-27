import React, { Component } from 'react';
import validate from 'validate.js';
import { Link } from 'react-router-dom';
import qs from 'qs';
import { Alert, Row, Col, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Card, CardHeader, CardFooter, CardBlock, Form, FormGroup, FormText, Label, Input, InputGroup, InputGroupAddon, InputGroupButton } from "reactstrap";
class AgregarProveedor extends Component {
    constructor(props) {
        super(props);
        this.defaultFields = {
            nombre_contacto: '',
            cargo_contacto: '',
            email_contacto: '',
            direccion: '',
            ciudad: '',
            pais: '',
            telefono: '',
            url: '',
            descripcion: '',
            status: 'active',
            codigo: '',
            tipo_licencia: '',
            ruc: '',
            fax: '',
            dv: ''
        };

        this.state = {
            message: false,
            modified_id: '',
            attributes: { ...this.defaultFields },
            errors: {},
            type: 'add'
        };
        this.constraints = {
            nombre_contacto: {
                presence: {
                    message: '^Ingrese el nombre.'
                }
            },
            cargo_contacto: {
                presence: {
                    message: '^Ingrese el cargo.'
                }
            },
            email_contacto: {
                presence: {
                    message: '^Ingrese el email.'
                }
            },
            direccion: {
                presence: {
                    message: '^Ingrese la direccion.'
                }
            },
            ciudad: {
                presence: {
                    message: '^Ingrese la ciudad.'
                }
            },
            pais: {
                presence: {
                    message: '^Ingrese el pais.'
                }
            },
            telefono: {
                presence: {
                    message: '^Ingrese el telefono.'
                }
            },
            url: {
                presence: {
                    message: '^Ingrese la url.'
                }
            },
            descripcion: {
                presence: {
                    message: '^Ingrese la descripcion.'
                }
            },
            status: {
                presence: {
                    message: '^Ingrese el status.'
                }
            },
            codigo: {
                presence: {
                    message: '^Ingrese el codigo.'
                }
            },
            tipo_licencia: {
                presence: {
                    message: '^Ingrese el tipo de licencia.'
                }
            },
            ruc: {
                presence: {
                    message: '^Ingrese el RUC.'
                }
            },
            fax: {
                presence: {
                    message: '^Ingrese el FAX.'
                }
            },
            dv: {
                presence: {
                    message: '^Ingrese el DV.'
                }
            },
        };

        this.handleValidForm = this.handleValidForm.bind(this);
        this.handleErrorForm = this.handleErrorForm.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const id = this.props.match.params.id || null;
        if (id) {
            fetch(`${this.props.appData.endpoint}/proveedores/${id}/`).then((response) => {
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
        fetch(`${this.props.appData.endpoint}/proveedores/`, {
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
                                              <Label>Nombre</Label>
                                              <Input
                                                  className={this.state.errors.nombre_contacto ? 'is-invalid' : ''}
                                                  value={this.state.attributes.nombre_contacto}
                                                  onChange={this.handleInputChange}
                                                  type="text"
                                                  name="nombre_contacto"/>
                                              <span className="error-message">{this.state.errors.nombre_contacto}</span>
                                          </FormGroup>
                                      </Col>
                                      <Col xs="12" md="6">
                                          <FormGroup>
                                              <Label>Cargo</Label>
                                              <Input
                                                  className={this.state.errors.cargo_contacto ? 'is-invalid' : ''}
                                                  value={this.state.attributes.cargo_contacto}
                                                  onChange={this.handleInputChange}
                                                  type="text"
                                                  name="cargo_contacto"/>
                                              <span className="error-message">{this.state.errors.cargo_contacto}</span>
                                          </FormGroup>
                                      </Col>
                                    </Row>

                                    <Row>
                                      <Col xs="12" md="6">
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
                                      <Col xs="12" md="6">
                                          <FormGroup>
                                              <Label>Direccion</Label>
                                              <Input
                                                  className={this.state.errors.direccion ? 'is-invalid' : ''}
                                                  value={this.state.attributes.direccion}
                                                  onChange={this.handleInputChange}
                                                  type="text"
                                                  name="direccion"/>
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
                                                  className={this.state.errors.pais ? 'is-invalid' : ''}
                                                  value={this.state.attributes.pais}
                                                  onChange={this.handleInputChange}
                                                  type="text"
                                                  name="pais"/>
                                              <span className="error-message">{this.state.errors.pais}</span>
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
                                              <Label>Url</Label>
                                              <Input
                                                  className={this.state.errors.url ? 'is-invalid' : ''}
                                                  value={this.state.attributes.url}
                                                  onChange={this.handleInputChange}
                                                  type="text"
                                                  name="url"/>
                                              <span className="error-message">{this.state.errors.url}</span>
                                          </FormGroup>
                                      </Col>
                                    </Row>


                                    <Row>
                                      <Col xs="12" md="6">
                                          <FormGroup>
                                              <Label>Descripcion</Label>
                                              <Input
                                                  className={this.state.errors.descripcion ? 'is-invalid' : ''}
                                                  value={this.state.attributes.descripcion}
                                                  onChange={this.handleInputChange}
                                                  type="text"
                                                  name="descripcion"/>
                                              <span className="error-message">{this.state.errors.descripcion}</span>
                                          </FormGroup>
                                      </Col>
                                      <Col xs="12" md="6">
                                          <FormGroup>
                                              <Label>Codigo</Label>
                                              <Input
                                                  className={this.state.errors.codigo ? 'is-invalid' : ''}
                                                  value={this.state.attributes.codigo}
                                                  onChange={this.handleInputChange}
                                                  type="text"
                                                  name="codigo"/>
                                              <span className="error-message">{this.state.errors.codigo}</span>
                                          </FormGroup>
                                      </Col>
                                    </Row>


                                    <Row>
                                      <Col xs="12" md="6">
                                          <FormGroup>
                                              <Label>Tipo Licencia</Label>
                                              <Input
                                                  className={this.state.errors.tipo_licencia ? 'is-invalid' : ''}
                                                  value={this.state.attributes.tipo_licencia}
                                                  onChange={this.handleInputChange}
                                                  type="text"
                                                  name="tipo_licencia"/>
                                              <span className="error-message">{this.state.errors.tipo_licencia}</span>
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

                                    <Row>
                                      <Col xs="12" md="6">
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
                                      <Col xs="12" md="6">
                                          <FormGroup>
                                              <Label>DV</Label>
                                              <Input
                                                  className={this.state.errors.dv ? 'is-invalid' : ''}
                                                  value={this.state.attributes.dv}
                                                  onChange={this.handleInputChange}
                                                  type="text"
                                                  name="dv"/>
                                              <span className="error-message">{this.state.errors.dv}</span>
                                          </FormGroup>
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

export default AgregarProveedor;
