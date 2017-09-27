import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, CardHeader, CardFooter, CardBlock, Table, Badge, Button } from "reactstrap";
class VerProveedor extends Component {
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
            fetch(`${this.props.appData.endpoint}/activos/${id}/`).then((response) => {
                return response.json();
            }).then((response) => {
                this.setState({
                    item: {
                        ...response.rows[0]
                    },
                    loading: false
                });
            });
        }
    }
    render() {
        if (this.state.loading === true) {
            return (
                <div  className="loading">Loading</div>
            );
        }
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col>
                        <Card>
                            <CardBlock className="card-body">
                                <Link to={`/catalogo/editar/${this.state.item.IDACTIVO}`}>
                                    <Button color="info">
                                        <i className="fa fa-edit"></i>{'\u00A0'} Editar
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
                                <i className="fa fa-edit"/>Ver Datos
                            </CardHeader>
                            <CardBlock className="card-body">
                               <Table responsive bordered>
                                 <tbody>
                                     <tr>
                                       <td style={{width: "30%"}}>Nombre</td>
                                       <td>{this.state.item.NOMBRE}</td>
                                     </tr>
                                     <tr>
                                       <td>Marca</td>
                                       <td>{this.state.item.MARCA}</td>
                                     </tr>
                                     <tr>
                                       <td>Codigo</td>
                                       <td>{this.state.item.CODIGO}</td>
                                     </tr>
                                     <tr>
                                       <td>Descripcion</td>
                                      <td>{this.state.item.DESCRIPCION}</td>
                                     </tr>
                                 </tbody>
                               </Table>
                            </CardBlock>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default VerProveedor;
