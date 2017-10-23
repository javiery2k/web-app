import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import validate from 'validate.js';
import qs from 'qs';
import { Row, Col, Button, Card, CardHeader, CardBlock, Form, FormGroup, Label, Input } from "reactstrap";

class AgregarObjetoGasto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            attributes: {
                codigo: '',
                nombre: '',
                descripcion: ''
            },
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
            fetch(`${this.props.appData.endpoint}/objeto_gasto/${id}/`).then(response => response.json()).then((response) => {
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
    componentWillReceiveProps() {
        this.setState({
            attributes: {
                codigo: '',
                nombre: '',
                descripcion: ''
            },
            errors: {},
            type: 'add'
        });
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
        fetch(`${this.props.appData.endpoint}/objeto_gasto/`, {
            method: "POST",
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: qs.stringify(this.state.attributes)
        }).then(response => response.json()).then((response) => {
            if (response.status === 'ok' && !this.props.isModal) {
                this.props.history.push(`/objeto_gasto/ver/${response.id}/`);
            } else {
                const data = this.state.attributes;
                data.id = response.id;
                this.props.closeModal(data);
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
            <div>
                <Row>
                    <Col xs="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-edit"/>{'\u00A0'} <span className="invalid-color">Todos los campos con (*) son requeridos.</span>
                            </CardHeader>
                            <CardBlock className="card-body">
                                {!this.props.isModal &&
                                <Row>
                                    <Col xs="12">
                                        <Link to={`/objeto_gasto/listar/`}>
                                            <Button color="info">
                                                <i className="fa fa-list-alt"/>{'\u00A0'} Listado
                                            </Button>
                                        </Link>
                                    </Col>
                                    <Col xs="12">
                                        <hr/>
                                    </Col>
                                </Row>}
                                <Form className="form-horizontal" onSubmit={this.handleSubmit}>
                                    <Row>
                                        <Col xs="12" md="6">
                                            <FormGroup>
                                                <Label>Código <span className="invalid-color">*</span></Label>
                                                <Input
                                                    className={this.state.errors.codigo ? 'is-invalid' : ''}
                                                    value={this.state.attributes.codigo}
                                                    onChange={this.handleInputChange}
                                                    maxLength={3}
                                                    type="text"
                                                    name="codigo"/>
                                                <span className="invalid-color">{this.state.errors.codigo}</span>
                                            </FormGroup>
                                        </Col>
                                        <Col xs="12" md="6">
                                            <FormGroup>
                                                <Label>Nombre <span className="invalid-color">*</span></Label>
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
                                                <Label htmlFor="descripcion">Detalle</Label>
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
                                        {!this.props.isModal &&
                                        <Link to="/objeto_gasto/listar/">
                                            <Button type="button" color="secondary">Cancelar</Button>
                                        </Link>}
                                        {this.props.isModal &&
                                                <Button type="button" onClick={this.props.closeModal} color="secondary">Cancelar</Button>}
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

AgregarObjetoGasto.propTypes = {
    appData: PropTypes.object,
    match: PropTypes.object,
    history: PropTypes.object,
    isModal: PropTypes.bool,
    closeModal: PropTypes.func
};
export default AgregarObjetoGasto;
