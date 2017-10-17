import React, { Component } from "react";
import validate from 'validate.js';
import PropTypes from 'prop-types';
import qs from 'qs';
import cookie from 'react-cookies';
import { Container, Row, Col, CardGroup, Card, CardBlock, Button, Input, Form, InputGroup, InputGroupAddon } from "reactstrap";


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            attributes: {
                usuario: '',
                password: ''
            },
            errors: {},
            loading: true
        };

        this.constraints = {
            usuario: {
                presence: {
                    message: '^Ingrese el correo.'
                },
                email: {
                    message: '^Email is invalido.'
                }
            },
            password: {
                presence: {
                    message: '^Ingrese la contrasena.'
                }
            }
        };

        this.handleValidForm = this.handleValidForm.bind(this);
        this.handleErrorForm = this.handleErrorForm.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        setTimeout(() => {
            if (cookie.load('data')) {
                this.props.history.push('/');
            } else {
                this.setState({
                    loading: false
                });
            }
        }, 500);
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
        fetch(`${this.props.environment.endpoint}/login/`, {
            method: "POST",
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: qs.stringify(this.state.attributes)
        })
            .then(response => response.json()).then((response) => {
                if (response.status === 'error') {
                    this.setState({
                        errors: {
                            response: response.error
                        }
                    });
                } else {
                    cookie.save("data", response.rows[0]);
                    this.setState({
                        errors: {}
                    });
                    this.props.history.push('/dashboard');
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
        if (this.state.loading === true) {
            return (
                <div className="loading">Loading</div>
            );
        }
        return (
            <div className="app app-login">
                <div className="app-body">
                    <main className="main">
                        <div className="container-fluid">
                            <div className="app flex-row align-items-center">
                                <Container>
                                    <Row className="justify-content-center">
                                        <Col md="8">
                                            <CardGroup className="mb-0">
                                                <Card className="p-4">
                                                    <CardBlock className="card-body">
                                                        <Form className="form-horizontal" onSubmit={this.handleSubmit}>
                                                            <h1>Inicio de sesion</h1>
                                                            <p className="text-muted">Modulo de Requisiciones.</p>
                                                            <InputGroup className="mb-3">
                                                                <InputGroupAddon><i className="icon-user"/></InputGroupAddon>
                                                                <Input
                                                                    className={this.state.errors.usuario ? 'is-invalid' : ''}
                                                                    value={this.state.attributes.usuario}
                                                                    onChange={this.handleInputChange}
                                                                    type="text"
                                                                    name="usuario"
                                                                    placeholder="Usuario"/>
                                                            </InputGroup>
                                                            <InputGroup className="mb-3">
                                                                <InputGroupAddon><i className="icon-lock"/></InputGroupAddon>
                                                                <Input className={this.state.errors.password ? 'is-invalid' : ''}
                                                                    value={this.state.attributes.password}
                                                                    onChange={this.handleInputChange}
                                                                    type="password"
                                                                    name="password"
                                                                    placeholder="Contraseña"/>
                                                            </InputGroup>
                                                            <Row className="mb-4">
                                                                <Col xs="12">
                                                                    <span className="error-message">{this.state.errors.response}</span>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col xs="12">
                                                                    <Button color="primary" className="px-4">Aceptar</Button>
                                                                </Col>
                                                            </Row>
                                                        </Form>
                                                    </CardBlock>
                                                </Card>
                                                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: `44%` }}>
                                                    <CardBlock className="card-body text-center">
                                                        <div>
                                                            <h2>Registrate</h2>
                                                            <p>El sistema no permite registro desde la app, por favor consulte con la direccion de Informatica de la Universidad de Panama.</p>
                                                        </div>
                                                    </CardBlock>
                                                </Card>
                                            </CardGroup>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        </div>
                    </main>
                </div>
                <div className="app-footer">
                    <a target="_blank" href="http://www.up.ac.pa/PortalUp/index.aspx">Universidad de Panama</a> &copy; Todos los derehos reservado.
                    <span className="float-right">Desarrollado por la Direccion de Informatica <a target="_blank" href="https://www.facebook.com/javiery2k">Javier Moran</a> y <a target="_blank" href="https://www.facebook.com/CnSnTd">Urania Rivas</a></span>
                </div>
            </div>
        );
    }
}
Login.propTypes = {
    history: PropTypes.object,
    environment: PropTypes.object
};
export default Login;
