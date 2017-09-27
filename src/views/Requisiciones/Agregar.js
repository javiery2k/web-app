import React, { Component } from 'react';
import { Row, Col, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Card, CardHeader, CardFooter, CardBlock, Form, FormGroup, FormText, Label, Input, InputGroup, InputGroupAddon, InputGroupButton } from "reactstrap";

class AgregarProveedor extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-edit"/>Form Elements
                                <div className="card-actions">
                                    <a href="#" className="btn-setting">
                                        <i className="icon-settings"/>
                                    </a>
                                    <a href="#" className="btn-minimize">
                                        <i className="icon-arrow-up"/>
                                    </a>
                                    <a href="#" className="btn-close">
                                        <i className="icon-close"/>
                                    </a>
                                </div>
                            </CardHeader>
                            <CardBlock className="card-body">
                                <Form className="form-horizontal">
                                    <FormGroup>
                                        <Label htmlFor="prependedInput">Prepended text</Label>
                                        <div className="controls">
                                            <InputGroup className="input-prepend">
                                                <InputGroupAddon>@</InputGroupAddon>
                                                <Input id="prependedInput" size="16" type="text"/>
                                            </InputGroup>
                                            <p className="help-block">Here's some help text</p>
                                        </div>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="appendedInput">Appended text</Label>
                                        <div className="controls">
                                            <InputGroup>
                                                <Input id="appendedInput" size="16" type="text"/>
                                                <InputGroupAddon>.00</InputGroupAddon>
                                            </InputGroup>
                                            <span className="help-block">Here's more help text</span>
                                        </div>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="appendedPrependedInput">Append and prepend</Label>
                                        <div className="controls">
                                            <InputGroup className="input-prepend">
                                                <InputGroupAddon>$</InputGroupAddon>
                                                <Input id="appendedPrependedInput" size="16" type="text"/>
                                                <InputGroupAddon>.00</InputGroupAddon>
                                            </InputGroup>
                                        </div>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="appendedInputButton">Append with button</Label>
                                        <div className="controls">
                                            <InputGroup>
                                                <Input id="appendedInputButton" size="16" type="text"/>
                                                <InputGroupButton>
                                                    <Button color="secondary">Go!</Button>
                                                </InputGroupButton>
                                            </InputGroup>
                                        </div>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="appendedInputButtons">Two-button append</Label>
                                        <div className="controls">
                                            <InputGroup>
                                                <Input id="appendedInputButtons" size="16" type="text"/>
                                                <InputGroupButton>
                                                    <Button color="secondary">Search</Button>
                                                    <Button color="secondary">Options</Button>
                                                </InputGroupButton>
                                            </InputGroup>
                                        </div>
                                    </FormGroup>
                                    <div className="form-actions">
                                        <Button type="submit" color="primary">Save changes</Button>
                                        <Button color="secondary">Cancel</Button>
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

export default AgregarProveedor;
