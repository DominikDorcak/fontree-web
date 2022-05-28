import React from "react";
import {Answer, Question} from "../services/ResponseInterfaces";
import API from "../services/API";
import {Col, Row} from "react-bootstrap";
import AnswerComponent from "./AnswerComponent";

interface QuestionComponentProps {
    question_id: number
    onSelectAnswer: (a: Answer) => void
    question: Question
}

interface QuestionComponentState {

}

const initialState: QuestionComponentState = {

}

export default class QuestionComponent extends React.Component<QuestionComponentProps, QuestionComponentState> {
    constructor(props: QuestionComponentProps) {
        super(props);
        this.state = initialState
    }





    render() {
        return <>
            <Row>
                <div>{this.props.question.text}</div>
            </Row>
            <Row>
                {this.props.question.answers.map((answer) => {
                    return <Col key={answer.answer_id}>
                        <AnswerComponent answer={answer} onSelectAnswer={this.props.onSelectAnswer}/>
                    </Col>
                })}
            </Row>
        </>;
    }
}