import React from "react";
import {Answer, Font, FontAnswer, Question} from "../services/ResponseInterfaces";
import { Col, Container, Row} from "react-bootstrap";
import FontComponent from "./FontComponent";
import QuestionComponent from "./QuestionComponent";

import ThemeProvider from "react-bootstrap/ThemeProvider";
import API from "../services/API";
import {useParams} from "react-router-dom";

interface FontQuestionsProps{
    params:{id:number}
}
interface FontQuestionsState{
    questions:Question[] | undefined,
    font:Font,
    answer:Answer
}
const initialState:FontQuestionsState = {
    questions:[],
    font: {
        font_id: NaN,
        name: ""
    },
    answer: {
        answer_id: NaN,
        question_id: NaN,
        numeric_value: NaN,
        show_value: ""
    }

}

class FontQuestions extends React.Component<FontQuestionsProps, FontQuestionsState>{

    constructor(props:any) {
        super(props);
        this.state = initialState
    }

    fetchFontData(font_id: number): void {
        API.getFont(font_id).then(font => {
            this.setState({font: font})
        })
    }

    fetchQuestions():void{
        API.getAllQuestions().then(res => {
            this.setState({questions: res.questions})
        })
    }

    sendAnswer():void {
        let answer:FontAnswer = {font_id:NaN,answer_id:NaN}
        answer.answer_id = this.state.answer.answer_id
        answer.font_id = this.state.font.font_id
        API.sendFontAnswer(answer).then(res => console.log(res))
    }

    onSelectAnswer = (a:Answer) =>{
        this.setState( oldstate => {
            let newQuestions = oldstate.questions!.filter((value) => {
                return value.question_id !== a.question_id
            })
            console.log(newQuestions)
            return {
                questions: newQuestions,
                font: oldstate.font,
                answer: a
            }
            },
            () => {this.sendAnswer()})
    }

    componentDidMount() {
        this.fetchFontData(this.props.params.id)
        this.fetchQuestions()
    }

    render() {
        return <ThemeProvider>
            <Container>
                <br/>
                <Row>
                    <Col>
                        <FontComponent font={this.state.font}></FontComponent>
                        <br/> <br/>
                        {this.state.questions!.length > 0
                            &&
                            <QuestionComponent question_id={this.state.questions![0].question_id}
                                               onSelectAnswer={this.onSelectAnswer}
                                               question={this.state.questions![0]}
                            />}
                    </Col>
                </Row>
                <Row>
                    {/*    odpovede na otazku*/}
                    <Col>

                    </Col>
                </Row>

            </Container>

        </ThemeProvider>
    }
}

const FontQuestionFunct = (props:any) => (
    <FontQuestions
        {...props}
        params={useParams()}
    />)
// obalenie do funkcionalneho componentu kvoli query parametrom
export default FontQuestionFunct
