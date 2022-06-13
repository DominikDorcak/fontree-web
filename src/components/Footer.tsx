import React, {Component} from "react";
import {Col, Container, Row, ThemeProvider} from "react-bootstrap";

export default class Footer extends Component<any, any>{
    render() {
        return <ThemeProvider>
            <Row className={"footer-padder"}>
                <Col>

                </Col>
            </Row>
        <Container className={"footer-container"}>
                <Row>
                    <Col>
                        © Copyright 2022.
                        Dominik Dorčák
                        dominik.dorcak@gmail.com
                    </Col>
                </Row>
        </Container>
        </ThemeProvider>;
    }
}