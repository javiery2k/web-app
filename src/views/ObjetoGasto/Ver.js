import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Card, CardHeader, CardBlock, FormGroup, Label } from "reactstrap";

class VerObjetoGasto extends Component {
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
            fetch(`${this.props.appData.endpoint}/objeto_gasto/${id}/`).then(response => response.json()).then((response) => {
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
                                        <Link to={`/objeto_gasto/editar/${item.idobjeto_gasto}`}>
                                            <Button color="success">
                                                <i className="fa fa-edit"/>{'\u00A0'} Editar
                                            </Button>
                                        </Link>
                                        <Link to={`/objeto_gasto/listar/`}>
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
                                        <FormGroup>
                                            <Label>Codigo</Label>
                                            <div>{item.codigo}</div>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="12" md="6">
                                        <FormGroup>
                                            <Label>Nombre</Label>
                                            <div>{item.nombre}</div>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12" md="6">
                                        <FormGroup>
                                            <Label>Fecha de Creación</Label>
                                            <div>{item.fecha}</div>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12" md="12">
                                        <FormGroup>
                                            <Label>Descripcion</Label>
                                            <div>{item.descripcion}</div>
                                        </FormGroup>
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

VerObjetoGasto.propTypes = {
    appData: PropTypes.object,
    match: PropTypes.object,
    history: PropTypes.object
};
export default VerObjetoGasto;
