import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Card, CardBlock, FormGroup, Label } from "reactstrap";

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
                    <Col>
                        <Card>
                            <CardBlock className="card-body">
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
                            </CardBlock>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        <Card>
                            <CardBlock className="card-body">
                                <Row>
                                    <Col xs="12" md="6">
                                        <FormGroup>
                                            <Label htmlFor="codigo">id</Label>
                                            <div className="custom-view">{item.idobjeto_gasto}</div>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="12" md="6">
                                        <FormGroup>
                                            <Label htmlFor="nombre">Fecha de Creación</Label>
                                            <div className="custom-view">{item.fecha}</div>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12" md="6">
                                        <FormGroup>
                                            <Label htmlFor="codigo">Codigo</Label>
                                            <div className="custom-view">{item.codigo}</div>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="12" md="6">
                                        <FormGroup>
                                            <Label htmlFor="nombre">Nombre</Label>
                                            <div className="custom-view">{item.nombre}</div>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12" md="12">
                                        <FormGroup>
                                            <Label htmlFor="descripcion">Descripcion</Label>
                                            <div className="custom-view">{item.descripcion}</div>
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
