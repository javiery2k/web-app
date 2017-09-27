import React, { Component } from 'react';
import { Badge, Row, Col, Card, CardHeader, CardBlock, Table, Pagination, PaginationItem, PaginationLink } from "reactstrap";

class Tables extends Component {
    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"/>
                                Combined All Table
                            </CardHeader>
                            <CardBlock className="card-body">
                                <Table hover bordered striped responsive size="sm">
                                    <thead>
                                        <tr>
                                            <th>Username</th>
                                            <th>Date registered</th>
                                            <th>Role</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Vishnu Serghei</td>
                                            <td>2012/01/01</td>
                                            <td>Member</td>
                                            <td>
                                                <Badge color="success">Active</Badge>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Zbyněk Phoibos</td>
                                            <td>2012/02/01</td>
                                            <td>Staff</td>
                                            <td>
                                                <Badge color="danger">Banned</Badge>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Einar Randall</td>
                                            <td>2012/02/01</td>
                                            <td>Admin</td>
                                            <td>
                                                <Badge color="secondary">Inactive</Badge>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Félix Troels</td>
                                            <td>2012/03/01</td>
                                            <td>Member</td>
                                            <td>
                                                <Badge color="warning">Pending</Badge>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Aulus Agmundr</td>
                                            <td>2012/01/21</td>
                                            <td>Staff</td>
                                            <td>
                                                <Badge color="success">Active</Badge>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                                <nav>
                                    <Pagination>
                                        <PaginationItem>
                                            <PaginationLink previous href="#">Prev</PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem active>
                                            <PaginationLink href="#">1</PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink href="#">2</PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink href="#">3</PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink href="#">4</PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink next href="#">Next</PaginationLink>
                                        </PaginationItem>
                                    </Pagination>
                                </nav>
                            </CardBlock>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Tables;
