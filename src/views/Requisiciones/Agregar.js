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
            catalogo: [],
            value: "",
            attributes: {
                idusuario: props.appData.user.idusuario,
                nombre: '',
                descripcion: ''
            },
            errors: {},
            type: 'add'
        };
        this.constraints = {
            nombre: {
                presence: {
                    message: '^Ingrese el nombre para esta requicion.'
                }
            }
        };
        this.handleValidForm = this.handleValidForm.bind(this);
        this.handleErrorForm = this.handleErrorForm.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getOptions = this.getOptions.bind(this);
        this.createUI = this.createUI.bind(this);
        this.addClick = this.addClick.bind(this);
        this.removeClick = this.removeClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
    getOptions(input, table) {
        if (!input) {
            return Promise.resolve({ options: [] });
        }
        return fetch(`${this.props.appData.endpoint}/autocomplete/${table}?q=${input}`).then(response => response.json()).then(response => ({ options: response.rows }));
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
    handleChange(event, i, table = '') {
        const catalogo = this.state.catalogo.slice();
        let value;
        let name;
        if (table === 'catalogo' || table === 'medidas') {
            value = event;
            name = table;
        } else {
            const target = event.target;
            value = target.type === 'checkbox' ? target.checked : target.value;
            name = target.name;
        }

        catalogo[i] = {
            ...catalogo[i],
            [name]: value
        };
        this.setState({ catalogo });
    }
    addClick() {
        const catalogo = this.state.catalogo.slice();
        catalogo[this.state.count] = {
            cantidad: 1,
            unidad: "",
            catalogo: "",
            medidas: ""
        };
        this.setState({
            catalogo,
            count: this.state.count + 1
        });
    }
    removeClick(i) {
        const catalogo = this.state.catalogo.slice();
        catalogo.splice(i, 1);
        this.setState({
            count: this.state.count - 1,
            catalogo
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
                                    value={this.state.catalogo[i] ? this.state.catalogo[i].cantidad : ''}
                                    onChange={e => this.handleChange(e, i)}
                                    type="text"
                                    name="cantidad"/>
                            </Col>
                        </Row>
                    </td>
                    <td>
                        <Row>
                            <Col xs="12" md="12">
                                <Select.Async
                                    className="form-control"
                                    cache={false}
                                    name="catalogo"
                                    value={this.state.catalogo[i] ? this.state.catalogo[i].catalogo : ''}
                                    onChange={e => this.handleChange(e, i, 'catalogo')}
                                    loadOptions={e => this.getOptions(e, 'catalogo')}
                                />
                            </Col>
                        </Row>
                    </td>
                    <td>
                        <Row>
                            <Col xs="12" md="12">
                                <Input
                                    value={this.state.catalogo[i] ? this.state.catalogo[i].unidad : ''}
                                    onChange={e => this.handleChange(e, i)}
                                    type="text"
                                    name="unidad"/>
                            </Col>
                        </Row>
                    </td>
                    <td>
                        <Row>
                            <Col xs="12" md="12">
                                <Select.Async
                                    className="form-control"
                                    cache={false}
                                    name="medidas"
                                    value={this.state.catalogo[i] ? this.state.catalogo[i].medidas : ''}
                                    onChange={e => this.handleChange(e, i, 'medidas')}
                                    loadOptions={e => this.getOptions(e, 'medidas')}
                                />
                            </Col>
                        </Row>
                    </td>
                    <td>
                        <Row>
                            <Col xs="12" md="12">
                                <Input
                                    type="text"
                                    name="marca"/>
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
                                                <span className="error-message">{this.state.errors.nombre}</span>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12" md="12">
                                            <FormGroup>
                                                <Label>Descripcion:</Label>
                                                <Input
                                                    rows="4"
                                                    className={this.state.errors.descripcion ? 'is-invalid' : ''}
                                                    value={this.state.attributes.descripcion}
                                                    onChange={this.handleInputChange}
                                                    type="textarea"
                                                    name="descripcion"/>
                                                <span className="error-message">{this.state.errors.descripcion}</span>
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
                                                        <td width="10%">unidad</td>
                                                        <td width="25%">medidas</td>
                                                        <td width="25%">Cod Presupuestario</td>
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
