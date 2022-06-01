import React from "react";
import {Answer} from "../services/ResponseInterfaces";
import {Button} from "react-bootstrap";
import ImageLoader from "./ImageLoader";

interface AnswerComponentProps {
    answer: Answer
    onSelectAnswer: (a:Answer)=>void
}

interface AnswerComponentState {

}



export default class AnswerComponent extends React.Component<AnswerComponentProps, AnswerComponentState> {





    render() {
        return (<div>
            <ImageLoader path={"answer/" + this.props.answer.answer_id + ".png"} alt={"answer"}/>
            <br/><br/>
            <Button variant="secondary" onClick={()=>this.props.onSelectAnswer(this.props.answer)}>{this.props.answer.show_value}</Button>
        </div>)
    }
}