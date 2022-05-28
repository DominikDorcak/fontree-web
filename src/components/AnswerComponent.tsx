import React from "react";
import {Answer} from "../services/ResponseInterfaces";
import {Button} from "react-bootstrap";

interface AnswerComponentProps {
    answer: Answer
    onSelectAnswer: (a:Answer)=>void
}

interface AnswerComponentState {

}

const initialState: AnswerComponentState = {

}

export default class AnswerComponent extends React.Component<AnswerComponentProps, AnswerComponentState> {
    constructor(props: AnswerComponentProps) {
        super(props);
    }




    render() {
        return <Button onClick={()=>this.props.onSelectAnswer(this.props.answer)}>{this.props.answer.show_value}</Button>
    }
}