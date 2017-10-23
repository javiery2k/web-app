import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import validate from 'validate.js';
import qs from 'qs';
import Select from 'react-select';
import { Row, Col, Button, Card, CardHeader, CardBlock, Form, FormGroup, Label, Input, Table } from "reactstrap";

class AgregarRequisicion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            autocomplete: [],
            attributes: {
                idusuario: props.appData.user.idusuario,
                nombre: '',
                descripcion: '',
                items: []
            },
            errors: {},
            type: 'add'
        };
        this.constraints = {
            nombre: {
                presence: {
                    message: '^Ingrese el nombre para esta requicion.'
                }
            },
            'cantidad[]': {
                presence: {
                    message: '^Ingrese el nombre para esta requicion.'
                }
            }
        };
        this.handleValidForm = this.handleValidForm.bind(this);
        this.handleErrorForm = this.handleErrorForm.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputDynamicChange = this.handleInputDynamicChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.loadOptions = this.loadOptions.bind(this);
        this.createUI = this.createUI.bind(this);
        this.addClick = this.addClick.bind(this);
        this.removeClick = this.removeClick.bind(this);
    }
    componentDidMount() {
        const id = this.props.match.params.id || null;
        if (id) {
            fetch(`${this.props.appData.endpoint}/catalogo/${id}/`).then(response => response.json()).then((response) => {
                this.setState({
                    attributes: {
                        ...this.state.attributes,
                        ...response.rows[0]
                    },
                    errors: {},
                    type: 'edit'
                });
            });
        }
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
    handleInputDynamicChange(event) {
        const target = event.target;
        const index = target.dataset.index;
        const items = this.state.attributes.items.slice();
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        items[index] = {
            ...items[index],
            [name]: value
        };

        this.setState({
            attributes: {
                ...this.state.attributes,
                items
            }
        });
    }
    handleAutocompleteChange(data, index) {
        const autocomplete = this.state.autocomplete.slice();
        const items = this.state.attributes.items.slice();
        autocomplete[index] = {
            ...autocomplete[index],
            [data.field]: data
        };

        items[index] = {
            ...items[index],
            [data.field]: data.value,
            codigo: (data.codigo) ? data.codigo : (items[index].codigo || "")
        };

        if (data) {
            this.setState({
                autocomplete,
                attributes: {
                    ...this.state.attributes,
                    items
                }
            });
        }
    }
    addClick() {
        const items = this.state.attributes.items.slice();
        items[this.state.count] = {
            cantidad: "",
            idcatalogo: "",
            idmedida: "",
            codigo: ""
        };
        this.setState({
            attributes: {
                ...this.state.attributes,
                items
            },
            count: this.state.count + 1
        });
    }
    removeClick(i) {
        const items = this.state.attributes.items.slice();
        items.splice(i, 1);
        this.setState({
            count: this.state.count - 1,
            items
        });
    }
    createUI() {
        const uiItems = [];
        for (let i = 0; i < this.state.count; i += 1) {
            uiItems.push(
                <tr key={i}>
                    <td className="text-left">
                        <Button type="button" color="danger" onClick={() => this.removeClick(i)}>
                            <i className="fa fa-close"/>
                        </Button>
                    </td>
                    <td>
                        <Row>
                            <Col xs="12" md="12">
                                <Input
                                    value={this.state.attributes.items[i] ? this.state.attributes.items[i].cantidad : ''}
                                    onChange={this.handleInputDynamicChange}
                                    data-index={i}
                                    name="cantidad"
                                    type="text"/>
                            </Col>
                        </Row>
                    </td>
                    <td>
                        <Row>
                            <Col xs="12" md="12">
                                <Select.Async
                                    className="form-control"
                                    placeholder="Seleccione..."
                                    searchPromptText="Escriba para buscar..."
                                    loadingPlaceholder="Cargando..."
                                    cache={false}
                                    name="idcatalogo"
                                    value={this.state.autocomplete[i] ? this.state.autocomplete[i].idcatalogo : ''}
                                    onChange={e => this.handleAutocompleteChange(e, i)}
                                    loadOptions={e => this.loadOptions(e, 'catalogo')}
                                />
                            </Col>
                        </Row>
                    </td>
                    <td>
                        <Row>
                            <Col xs="12" md="12">
                                <Select.Async
                                    className="form-control"
                                    placeholder="Seleccione..."
                                    searchPromptText="Escriba para buscar..."
                                    loadingPlaceholder="Cargando..."
                                    cache={false}
                                    name="idmedida"
                                    value={this.state.autocomplete[i] ? this.state.autocomplete[i].idmedida : ''}
                                    onChange={e => this.handleAutocompleteChange(e, i)}
                                    loadOptions={e => this.loadOptions(e, 'medidas')}
                                />
                            </Col>
                        </Row>
                    </td>
                    <td>
                        <Row>
                            <Col xs="12" md="12">
                                <Input
                                    value={this.state.attributes.items[i] ? this.state.attributes.items[i].codigo : ''}
                                    readOnly
                                    name="codigo"
                                    type="text"/>
                            </Col>
                        </Row>
                    </td>
                </tr>
            );
        }
        return uiItems || null;
    }
    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col>
                        <Card>
                            <CardBlock className="card-body">
                                <Link to={`/requisiciones/listar/`}>
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
                                            <FormGroup>
                                                <Label>Creado por:</Label>
                                                <div>{`${this.props.appData.user.nombre} ${this.props.appData.user.apellido1}`}</div>
                                            </FormGroup>
                                        </Col>
                                        <Col xs="12" md="6">
                                            <FormGroup>
                                                <Label>Unidad Gestora:</Label>
                                                <div>{this.props.appData.user.cargo}</div>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12" md="12">
                                            <FormGroup>
                                                <Label>Nombre Requisicion:</Label>
                                                <Input
                                                    className={this.state.errors.nombre ? 'is-invalid' : ''}
                                                    value={this.state.attributes.nombre}
                                                    onChange={this.handleInputChange}
                                                    type="text"
                                                    name="nombre"/>
                                                <span className="invalid-color">{this.state.errors.nombre}</span>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12" md="12">
                                            <FormGroup>
                                                <Label>Observaciones:</Label>
                                                <Input
                                                    rows="4"
                                                    className={this.state.errors.descripcion ? 'is-invalid' : ''}
                                                    value={this.state.attributes.descripcion}
                                                    onChange={this.handleInputChange}
                                                    type="textarea"
                                                    name="descripcion"/>
                                                <span className="invalid-color">{this.state.errors.descripcion}</span>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12" md="12">
                                            <h6>Detalles</h6>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <CardBlock className="card-body">
                                            <Table responsive size="sm">
                                                <thead className="text-center">
                                                    <tr>
                                                        <td width="2%"/>
                                                        <td width="10%">cantidad</td>
                                                        <td width="25%">activo</td>
                                                        <td width="25%">unidad</td>
                                                        <td width="5%">objeto gasto</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.createUI()}
                                                </tbody>
                                            </Table>
                                            <Table responsive size="sm">
                                                <tbody>
                                                    <tr>
                                                        <td className="text-left">
                                                            <Button type="button" onClick={this.addClick.bind(this)} color="info">
                                                                <i className="fa fa-plus"/>
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </CardBlock>
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

AgregarRequisicion.propTypes = {
    appData: PropTypes.object,
    match: PropTypes.object,
    history: PropTypes.object
};
export default AgregarRequisicion;
