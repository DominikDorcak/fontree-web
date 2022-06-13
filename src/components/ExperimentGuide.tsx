import React, {Component} from "react";
import {Alert, Button, Col, Container, Row} from "react-bootstrap";

export default class ExperimentGuide extends Component<any, any>{
    render() {
        return <>
            <br/>
            <br/>
            <h3>Experiment</h3>
            <br/>
            <Container>
                <Row>
                    <Col>
                        <Alert variant={"dark"} className={"experiment-guide"}>
                            V experimente sa chceme pozrieť na presnosť a použiteľnosť nášho modelu <br/>
                            Experiment prebieha formou formulára:
                            <ul>
                                <li>
                                    najprv budeme potrebovať zopár základných informácii o Vás. Ide o všeobecné údaje ako vek a vzdelanie, nezbierame citlivé dáta
                                </li>
                                <li>
                                    potom Vám bude priradený font z nášho datasetu
                                </li>
                                <li>
                                    na obrazovke sa budú postupne zobrazovať otázky ohľadom daného fontu s príslušnými obrázkami, na ktoré je potrebné odpovedať
                                </li>
                                <li>
                                    po tom, čo systém nájde font budete presmerovaný na ďakovnú stránku
                                </li>
                            </ul>
                            Ak sa pri niektorej z otázok neviete jednoznačne rozhodnúť vyberte odpoveď podľa obrázka (vyberte odpoveď, pri ktorej odpovedajúci obrázok je bližšie ku Vášmu fontu).
                            Ak neviete rozhodnúť ani podľa obrázka označte odpoveď nie<br/>
                            Poprosím Vás, aby ste celý formulár vyplnili naraz, bez prepínania kariet a bez odchodu od PC. Meriame aj priemerný čas na nájdenie fontu a skreslilo by to výsledky.
                            Ak ste nútený počas vyplňovania odísť, po návrate začnite celý proces od začiatku.

                        </Alert>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button variant={"secondary"} href={"/experiment-entry"}>Začať experiment!</Button>
                    </Col>
                </Row>
            </Container>

        </>;
    }
}