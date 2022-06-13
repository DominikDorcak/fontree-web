import React, {Component} from "react";
import {Col, Container, Row, ThemeProvider} from "react-bootstrap";
import ImageLoader from "./ImageLoader";

export default class AboutComponent extends Component<any, any> {
    render() {
        return <ThemeProvider>
            <Container>
                <br/>
                <Row>
                    <Col>
                        <ImageLoader path={"logo-black-green.svg"} alt={"logo"} class={"logo-about"}/>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col>
                        <h3>O projekte</h3>
                        Projekt je súčasťou diplomovej práce: Klasifikácia fontov písma s využitím ich atribútov a
                        odpovedí užívateľa.
                        Autorom práce je Dominik Dorčák. <br/>
                        Systém využíva klasifikátor na základe rozhodovacích stromov. Ako údaje na ténovanie
                        klasifikátora boli použité fonty ručne zozbierané z typografických systémov a ručne zodpovedané
                        otázky k týmto fontom.
                        Pre viac informácii navštívte <a href={"https://s.ics.upjs.sk/~ddorcak/"}>web práce</a>
                    </Col>
                    <Col></Col>
                    <Col className={"experiment-guide"}>
                        <h4>Repozitáre a kontakty:</h4>
                         <ul>
                             <li>
                                 <a href={"https://github.com/DominikDorcak/fontree"}>python aplikácia + API</a>
                             </li>
                             <li>
                                 <a href={"https://github.com/DominikDorcak/fontree-web"}>webová aplikácia</a>
                             </li>
                             <li>
                                 <a href={"https://s.ics.upjs.sk/~ddorcak/"}>web práce</a>
                             </li>
                             <li>
                                 <a href={"mailto:dominik.dorcak@gmail.com"}>email: dominik.dorcak@gmail.com</a>
                             </li>
                         </ul>

                    </Col>
                </Row>
            </Container>
        </ThemeProvider>;
    }
}
