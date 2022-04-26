import React from "react";
import {Question} from "../services/ResponseInterfaces";
import API from "../services/API";

interface QuestionComponentProps {
    question_id: number
}

interface QuestionComponentState {
    question: Question

}

const initialState: QuestionComponentState = {
    question: {
        question_id: NaN,
        text: "",
        answers: []
    }
}

export default class QuestionComponent extends React.Component<QuestionComponentProps, QuestionComponentState> {
    constructor(props: QuestionComponentProps) {
        super(props);
        this.state = initialState
    }


    fetchQuestionData(): void {
        API.getQuestion(this.props.question_id).then(q => this.setState({question:q}))
    }

    componentDidMount() {
        this.fetchQuestionData()
    }

    render() {
        return <div>
            {this.state.question.text}
        </div>;
    }
}