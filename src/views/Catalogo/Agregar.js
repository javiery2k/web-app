import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import validate from 'validate.js';
import qs from 'qs';
import Select from 'react-select';
import { Row, Col, Button, Card, CardHeader, CardBlock, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from "reactstrap";
import ObjetoGastoAgregar from './../ObjetoGasto/Agregar';

class AgregarCatalogo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            attributes: {
                tipoitem: 'activo',
                codigo: '',
                nombre: '',
                marca: '',
                descripcion: '',
                idobjeto_gasto: ''
            },
            autocomplete: {
                idobjeto_gasto: ""
            },
            errors: {},
            type: 'add',
            modal: false
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
            idobjeto_gasto: {
                presence: {
                    message: '^Ingrese el Objeto de Gasto.'
                }
            }
        };

        this.closeModal = this.closeModal.bind(this);
        this.toggle = this.toggle.bind(this);
        this.handleValidForm = this.handleValidForm.bind(this);
        this.handleErrorForm = this.handleErrorForm.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.loadOptions = this.loadOptions.bind(this);
        this.handleAutocompleteChange = this.handleAutocompleteChange.bind(this);
    }
    componentDidMount() {
        const id = this.props.match.params.id || null;
        if (id) {
            fetch(`${this.props.appData.endpoint}/catalogo/${id}/`).then(response => response.json()).then((response) => {
                fetch(`${this.props.appData.endpoint}/objeto_gasto/${response.rows[0].idobjeto_gasto}/`).then(response2 => response2.json()).then((response2) => {
                    this.setState({
                        attributes: {
                            ...this.state.attributes,
                            ...response.rows[0]
                        },
                        autocomplete: {
                            idobjeto_gasto: {
                                value: response2.rows[0] ? response2.rows[0].idobjeto_gasto : '',
                                label: response2.rows[0] ? `${response2.rows[0].codigo} - ${response2.rows[0].nombre}` : ''
                            }
                        },
                        errors: {},
                        type: 'edit'
                    });
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
        fetch(`${this.props.appData.endpoint}/catalogo/`, {
            method: "POST",
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: qs.stringify(this.state.attributes)
        }).then(response => response.json()).then((response) => {
            if (response.status === 'ok') {
                this.props.history.push(`/catalogo/ver/${response.id}/`);
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
    loadOptions(search, table) {
        if (!search) {
            return Promise.resolve({ options: [] });
        }
        return fetch(`${this.props.appData.endpoint}/autocomplete/${table}?q=${search}`).then(response => response.json()).then(response => ({ options: response.rows }));
    }
    handleAutocompleteChange(event, name) {
        this.setState({
            attributes: {
                ...this.state.attributes,
                [name]: (event === null) ? null : event.value
            },
            autocomplete: {
                ...this.state.autocomplete,
                [name]: event
            }
        });
    }
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }
    closeModal(response = '') {
        this.toggle();
        if (response.id) {
            this.setState({
                attributes: {
                    ...this.state.attributes,
                    idobjeto_gasto: response.id
                },
                autocomplete: {
                    idobjeto_gasto: {
                        value: response.id,
                        label: `${response.codigo} - ${response.nombre}`
                    }
                }
            });
        }
    }
    render() {
        return (
            <div>
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
                                        <Col xs="12" md="6">
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
                                        <Col xs="12" md="6">
                                            <FormGroup>
                                                <Label>Marca</Label>
                                                <Input
                                                    className={this.state.errors.marca ? 'is-invalid' : ''}
                                                    value={this.state.attributes.marca}
                                                    onChange={this.handleInputChange}
                                                    type="text"
                                                    name="marca"/>
                                            </FormGroup>
                                        </Col>
                                        <Col xs="12" md="6">
                                            <FormGroup>
                                                <Label>Tipo</Label>
                                                <Input
                                                    value={this.state.attributes.tipoitem}
                                                    onChange={this.handleInputChange}
                                                    type="select"
                                                    name="tipoitem">
                                                    <option value="activo">Activo</option>
                                                    <option value="bien">Servicio</option>
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12" md="6">
                                            <FormGroup>
                                                <Label>Objeto de Gasto</Label>
                                                <Select.Async
                                                    className="form-control"
                                                    placeholder="Seleccione..."
                                                    searchPromptText="Escriba para buscar..."
                                                    loadingPlaceholder="Cargando..."
                                                    cache={false}
                                                    name="idobjeto_gasto"
                                                    value={this.state.autocomplete.idobjeto_gasto}
                                                    onChange={e => this.handleAutocompleteChange(e, 'idobjeto_gasto')}
                                                    loadOptions={e => this.loadOptions(e, 'objeto_gasto')}
                                                />
                                                <Button onClick={this.toggle} type="button" color="info">
                                                    <i className="fa fa-plus"/>
                                                </Button>
                                                <div className="error-message">{this.state.errors.idobjeto_gasto}</div>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12" md="12">
                                            <FormGroup>
                                                <Label htmlFor="descripcion">Descripcion</Label>
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
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Nuevo Objeto de Gasto</ModalHeader>
                    <ModalBody>
                        <ObjetoGastoAgregar closeModal={this.closeModal} isModal {...this.props}/>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

AgregarCatalogo.propTypes = {
    appData: PropTypes.object,
    match: PropTypes.object,
    history: PropTypes.object
};
export default AgregarCatalogo;
