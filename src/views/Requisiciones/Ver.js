import React, { Component } from 'react';
import moment from 'moment';
import { Row, Col, Card, CardHeader, CardBlock, Table } from "reactstrap";

class VerRequisiciones extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fecha: moment().format("DD-MMMM-YYYY")
        };
    }

    render() {
        return (
            <div>
                <Card>
                    <CardHeader className="text-center">
                        <div><b>UNIVERSIDAD DE PANAMA</b></div>
                        <div>Direccion de Servicios Administrativos</div>
                        <div>Departamento de Compras</div>
                        <div><b>REQUISICION PARA MATERIALES Y EQUIPOS</b></div>
                    </CardHeader>
                    <CardBlock className="card-body">
                        <Row className="mb-3">
                            <Col xs="6">
                                <b>Fecha:</b> {this.state.fecha}
                            </Col>
                            <Col xs="6" className="text-right">
                                <b>Requisicion #:</b> AUTO
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col xs="12">
                                <b>Unidad Gestora:</b> Direccion de Informatica
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col xs="12">
                                <Table responsive striped>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>cantidad</th>
                                            <th>unidad</th>
                                            <th>descripcion</th>
                                            <th>unitario</th>
                                            <th>total</th>
                                            <th># presupuestario</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>1</td>
                                            <td>1</td>
                                            <td>Switch 30 Puertos</td>
                                            <td>$774.99</td>
                                            <td>$774.99</td>
                                            <td>1651050665161</td>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td>1</td>
                                            <td>1</td>
                                            <td>Switch 10 Puertos</td>
                                            <td>$374.99</td>
                                            <td>$374.99</td>
                                            <td>1651050665161</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col xs="12">
                                <b>Observaciones:</b> ____________________________________
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col xs="12">
                                <b>Verificado por:</b> ____________________________________
                            </Col>
                        </Row>
                    </CardBlock>
                </Card>
            </div>
        );
    }
}

export default VerRequisiciones;
