import React from "react";
import API from "../services/API";
import {Answer, Font, Node, Question, StatusResponse} from "../services/ResponseInterfaces";
import FontComponent from "./FontComponent";
import QuestionComponent from "./QuestionComponent";
import {ExperimentEntry} from "../services/RequestInterfaces";
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Modal from 'react-bootstrap/Modal'
import {Button, Col, Container, Row} from "react-bootstrap";
import ThemeProvider from 'react-bootstrap/ThemeProvider'


interface MainComponentProps {

}

interface MainComponentState {
    apiStatus: StatusResponse
    entry: ExperimentEntry
    font: Font
    node: Node
    showModal: boolean
    startTime: number | undefined
    lastAnswer: Answer | undefined
    question: Question
    hasNextQuestion: boolean
}

const initialState: MainComponentState = {
    apiStatus: {
        db: {
            online: false,
            ping: NaN,
            version: ""
        }
    },
    font: {
        font_id: NaN,
        name: ""
    },
    entry: {
        age: NaN,
        sex: '',
        highest_education: NaN,
        assigned_font: NaN,
        result_font: NaN,
        time_in_milis: NaN,
        question_count: 0
    },
    node: {
        question_id: NaN,
        right_child: NaN,
        left_child: NaN,
        font_id: NaN,
        is_leaf: false,
        node_id: NaN,
    },
    showModal: true,
    startTime: undefined,
    lastAnswer: undefined,
    hasNextQuestion: true,
    question: {
        question_id: NaN,
        text: "",
        answers: []

    }


}

const sexOptions = [
    {value: "U", label: "Nedefinované"},
    {value: "M", label: "Muž"},
    {value: "F", label: "Žena"}
]
const educationOptions = [
    {value: -1, label: "Neuvedené"},
    {value: 0, label: "Žiak základnej školy"},
    {value: 1, label: "Základná škola"},
    {value: 2, label: "Stredná škola"},
    {value: 3, label: "Vysoká škola - 1.stupeň (Bc)"},
    {value: 4, label: "Vysoká škola - 2.stupeň (Mgr,Ing)"},
    {value: 5, label: "Vysoká škola - vyššie"},
]

export default class MainComponent extends React.Component<MainComponentProps, MainComponentState> {
    constructor(props: MainComponentProps) {
        super(props);
        this.state = initialState
    }

    fetchFontData(font_id: number): void {
        API.getFont(font_id).then(font => {
            this.setState({font: font})
        })
    }

    fetchNodeData(node_id: number): void {
        if (this.state.hasNextQuestion) {
            API.getNode(node_id).then(node => {
                this.setState({node: node, hasNextQuestion: !node.is_leaf}, () => this.fetchQuestionData())
            })
        }
    }

    sendEntry(entry: ExperimentEntry): void {
        API.postEntry(entry).then(res => {
            console.log(res)
        })
    }

    fetchQuestionData(): void {
        if (this.state.hasNextQuestion) {
            const question_id = this.state.node.question_id
            API.getQuestion(question_id).then(q => this.setState({question: q}))
        }
    }

    moveInTree = () => {
        const next_node_id = (this.state.lastAnswer && this.state.lastAnswer.numeric_value > 0.5) ? this.state.node.right_child : this.state.node.left_child
        this.fetchNodeData(next_node_id)
        this.setState((oldstate: MainComponentState) => {
            const new_question_count = oldstate.entry.question_count + 1
            return {
                entry: {
                    age: oldstate.entry.age,
                    sex: oldstate.entry.sex,
                    highest_education: oldstate.entry.highest_education,
                    assigned_font: oldstate.entry.assigned_font,
                    result_font: oldstate.node.font_id,
                    time_in_milis: oldstate.entry.time_in_milis,
                    question_count: new_question_count
                }
            }
        }, () => this.evaluateNode())

    }

    evaluateNode = () => {
        if (this.state.node.is_leaf) {
            this.setState((oldstate: MainComponentState) => {
                const time = oldstate.startTime ? Date.now() - oldstate.startTime : -1
                return {
                    entry: {
                        age: oldstate.entry.age,
                        sex: oldstate.entry.sex,
                        highest_education: oldstate.entry.highest_education,
                        assigned_font: oldstate.entry.assigned_font,
                        result_font: oldstate.node.font_id,
                        time_in_milis: time,
                        question_count: oldstate.entry.question_count
                    },
                    hasNextQuestion: false
                }
            }, () => this.sendEntry(this.state.entry))
        }
    }

    handleSexChange = (e: React.ChangeEvent<any>) => {
        const newvalue = e.currentTarget
        this.setState((oldstate: MainComponentState) => {
            return {
                node: oldstate.node,
                font: oldstate.font,
                entry: {
                    age: oldstate.entry.age,
                    sex: newvalue.value,
                    highest_education: oldstate.entry.highest_education,
                    assigned_font: oldstate.entry.assigned_font,
                    result_font: oldstate.entry.result_font,
                    time_in_milis: oldstate.entry.time_in_milis,
                    question_count: oldstate.entry.question_count
                }
            }
        })
    }

    handleEducationChange = (e: React.ChangeEvent<any>) => {
        const newvalue = e.currentTarget
        this.setState((oldstate: MainComponentState) => {
            return {
                entry: {
                    age: oldstate.entry.age,
                    sex: oldstate.entry.sex,
                    highest_education: parseInt(newvalue.value),
                    assigned_font: oldstate.entry.assigned_font,
                    result_font: oldstate.entry.result_font,
                    time_in_milis: oldstate.entry.time_in_milis,
                    question_count: oldstate.entry.question_count
                }
            }
        })
    }

    handleAgeChange = (e: React.FormEvent<HTMLInputElement>) => {
        const val: number = parseInt(e.currentTarget.value)
        this.setState((oldstate: MainComponentState) => {
            return {
                entry: {
                    age: val,
                    sex: oldstate.entry.sex,
                    highest_education: oldstate.entry.highest_education,
                    assigned_font: oldstate.entry.assigned_font,
                    result_font: oldstate.entry.result_font,
                    time_in_milis: oldstate.entry.time_in_milis,
                    question_count: oldstate.entry.question_count
                }
            }
        })
    }

    toggleModal() {
        this.setState(old => {
            return {
                showModal: !old.showModal,
                startTime: old.startTime ? old.startTime : Date.now()
            }
        })
    }

    onSelectAnswer = (a: Answer) => {
        this.setState({lastAnswer: a}, () => this.moveInTree())
    }


    componentDidMount() {
        API.getStatus().then(r => {
            this.setState({apiStatus: r}, () => this.fetchNodeData(1))
        })
        API.getRandomFont().then(r => {
            this.setState({
                entry: {
                    age: NaN,
                    sex: '',
                    highest_education: -1,
                    assigned_font: r.font_id,
                    result_font: NaN,
                    time_in_milis: NaN,
                    question_count: 0
                }
            }, () => this.fetchFontData(this.state.entry.assigned_font))
        })

    }


    render() {
        console.log(this.state)
        return <ThemeProvider>
            {/*<p>Status</p>*/}
            {/*<div>db:<br/>*/}
            {/*    /!*<div>{this.state.apiStatus.db.online ? "online" : "offline"}</div>*!/*/}
            {/*    <br/>*/}
            {/*    <div>version: {this.state.apiStatus.db.version}</div>*/}
            {/*    <br/>*/}
            {/*    <div>ping: {this.state.apiStatus.db.ping}</div>*/}
            {/*</div>*/}
            <Container>
                <Row>
                    <Col>
                        <FontComponent font={this.state.font}></FontComponent>
                        <QuestionComponent
                            question_id={this.state.node.question_id}
                            onSelectAnswer={this.onSelectAnswer}
                            question={this.state.question}
                        ></QuestionComponent>
                    </Col>
                </Row>
                <Row>
                    {/*    odpovede na otazku*/}
                    <Col>

                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button onClick={() => this.toggleModal()}>Skontrolovať dáta</Button>
                    </Col>
                </Row>
            </Container>


            <Modal
                show={this.state.showModal}
                onHide={() => this.toggleModal()}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    O Vás
                </Modal.Header>
                <Modal.Body>
                    <Form.Select value={this.state.entry.sex} onChange={this.handleSexChange}>
                        {sexOptions.map(({label, value}) => {
                            return <option value={value} key={value}>{label}</option>
                        })}
                    </Form.Select>

                    <Form.Select value={this.state.entry.highest_education} onChange={this.handleEducationChange}>
                        {educationOptions.map(({label, value}) => {
                            return <option value={value} key={value}>{label}</option>
                        })}
                    </Form.Select>
                    <InputGroup>
                        <input type={"number"} value={this.state.entry.age}
                               onChange={this.handleAgeChange}/>
                    </InputGroup>
                    <Button onClick={() => this.toggleModal()}>{this.state.startTime ? "Pokračovať" : "Začať"}</Button>
                </Modal.Body>
            </Modal>
        </ThemeProvider>
    }
}