import React, {Component} from "react";
import {Button, Col, Container, Row, ThemeProvider} from "react-bootstrap";
import ImageLoader from "./ImageLoader";

export default class HomeComponent extends Component<any, any> {

    getRandomFontId() {
        return Math.floor(Math.random() * 40 + 10);
    }


    render() {
        return <ThemeProvider>
            <Container>
                <br/>
                <br/>
                <Row>
                    <h2>Vitajte na stránke fontree.eu!</h2>
                </Row>
                <br/>
                <Row>
                    <Col className={"blob__wrap"}>
                        <div className={"blob__left"}></div>
                        <div className={"blob__text"}>
                            Fontree.eu je domovom vlastného expertného systému pre identifikáciu fontu.
                            Stránka vznikla ako časť diplomovej práce. Viac o práci sa dozviete v sekcii O projekte
                            <br/>
                            <br/>
                            <Button variant={'secondary'} href={"/about"}> Viac </Button>
                        </div>
                    </Col>
                    <Col>
                        <ImageLoader path={"smallTree.png"} alt={"tree-small"} class={"img-half"}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ImageLoader path={"fonts/" + this.getRandomFontId() + ".png"} alt={"tree-small"}
                                     class={"img-half"}/>
                    </Col>
                    <Col className={"blob__wrap"}>
                        <div className={"blob__right"}></div>
                        <div className={"blob__text"}>Hlavným účelom tohto webu je zrealizovanie experimentu opísaného v rámci tejto diplomovej
                            práce.
                            Ide o jednoduchý experiment formou formulára.
                            <br/>
                            <br/>
                            <Button variant={'secondary'} href={"/experiment"}> Prejsť na experiment </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </ThemeProvider>;
    }
}