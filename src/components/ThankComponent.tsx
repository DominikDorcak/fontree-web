import React, {Component} from "react";
import {Alert, Button, Col, Container, Row, ThemeProvider} from "react-bootstrap";
import {Font} from "../services/ResponseInterfaces";
import API from "../services/API";
import FontComponent from "./FontComponent";

interface ThankComponentState {
    assigned_font: Font
    result_font: Font
}

const initialState: ThankComponentState = {
    assigned_font: {
        font_id: NaN,
        name: ""
    },
    result_font: {
        font_id: NaN,
        name: ""
    }
}

class ThankComponent extends Component<any, ThankComponentState> {
    constructor(props: any) {
        super(props);
        this.state = initialState
    }

    fetchFontData() {
        API.getFont(this.props.assigned_font).then(res =>
            this.setState({assigned_font: res})
        )
        API.getFont(this.props.result_font).then(res =>
            this.setState({result_font: res})
        )
    }

    componentDidMount() {
        this.fetchFontData()
        console.log(this.state)
    }

    render() {
        //TODO: dorobit nacitanie experiment entry + podakovanie
        return <ThemeProvider>
            <Container>
                <br/>
                <br/>
                <Row>
                    <Col>
                        <Alert variant={"success"}>
                            Ďakujeme za Váš príspevok do experimentu! Počet odpovedí nie je limitovaný na jednu za
                            používateľa, takže ak si nájdete čas oceníme ďalší príspevok.
                        </Alert>
                    </Col>
                </Row>
                <br/>
                <FontComponent font={this.state.assigned_font} title_text={"Priradený font:"}/>
                <br/>
                <FontComponent font={this.state.result_font} title_text={"Nájdený font:"}/>
                <br/>
                <Row>
                    <Col>
                        <Button href={"/"} variant={"secondary"}>Domovská stránka</Button>
                    </Col>
                </Row>
            </Container>

        </ThemeProvider>
    }
}

const ThankComponentFunct = () => {

    function serialize() {
        const urlSearchParams = new URLSearchParams(window.location.search);
        return  Object.fromEntries(urlSearchParams.entries());
    }

    let params = serialize();
    return (<ThankComponent{...params}/>)
}
// obalenie do funkcionalneho componentu kvoli query parametrom
export default ThankComponentFunct