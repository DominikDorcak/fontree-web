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
import {Navigate} from "react-router-dom";


interface ExperimentComponentProps {

}

interface ExperimentComponentState {
    apiStatus: StatusResponse
    entry: ExperimentEntry
    font: Font
    node: Node
    showModal: boolean
    startTime: number | undefined
    lastAnswer: Answer | undefined
    question: Question
    hasNextQuestion: boolean
    entrySent: boolean
}

const initialState: ExperimentComponentState = {
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
    entrySent: false,
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

export default class ExperimentComponent extends React.Component<ExperimentComponentProps, ExperimentComponentState> {
    constructor(props: ExperimentComponentProps) {
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
                this.setState({node: node, hasNextQuestion: !node.is_leaf}, () => {
                    this.evaluateNode()
                    this.fetchQuestionData()
                })
            })
        }
    }


    sendEntry(entry: ExperimentEntry): void {
        API.postEntry(entry).then(res => {
            console.log(res)
        })
        this.setState({entrySent: true})
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
        console.log("moving to node " + next_node_id)
        this.setState((oldstate: ExperimentComponentState) => {
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
                },
            }
        }, () => {
        })

    }

    evaluateNode = () => {
        console.log("evaluationg node " + this.state.node.node_id)
        if (this.state.node.is_leaf) {
            this.setState((oldstate: ExperimentComponentState) => {
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
            }, () => {
                if (Number.isNaN(this.state.entry.age)) {
                    alert("Niektoré z dát o Vás nie sú vypnené, skontrolujte a doplňte formulár prosím!")
                    this.openModal()
                } else {
                    this.sendEntry(this.state.entry)
                }
            })
        }
    }

    handleSexChange = (e: React.ChangeEvent<any>) => {
        const newvalue = e.currentTarget
        this.setState((oldstate: ExperimentComponentState) => {
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
        this.setState((oldstate: ExperimentComponentState) => {
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
        this.setState((oldstate: ExperimentComponentState) => {
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
        }, () => this.evaluateNode())
    }

    onSelectAnswer = (a: Answer) => {
        this.setState({lastAnswer: a}, () => this.moveInTree())
    }

    openModal() {
        this.setState({showModal: true})
    }


    componentDidMount() {
        API.getStatus().then(r => {
            this.setState({apiStatus: r}, () => this.fetchNodeData(334))
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
        // console.log(this.state)
        return <ThemeProvider>
            <Container>
                <br/>
                <Row>
                    <Col>
                        <FontComponent font={this.state.font} title_text={"Priradený font:"}></FontComponent>
                        <br/> <br/>
                        <QuestionComponent
                            question_id={this.state.node.question_id}
                            onSelectAnswer={this.onSelectAnswer}
                            question={this.state.question}
                        ></QuestionComponent>
                    </Col>
                </Row>


            </Container>

            <div className={'about-button'}>
                <Button variant="secondary" onClick={() => this.toggleModal()}>Skontrolovať údaje</Button>
            </div>


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
                    <div>Pohlavie:</div>
                    <Form.Select value={this.state.entry.sex} onChange={this.handleSexChange}>
                        {sexOptions.map(({label, value}) => {
                            return <option value={value} key={value}>{label}</option>
                        })}
                    </Form.Select>
                    <div>Najvyššie dosiahnuté vzdelanie:</div>
                    <Form.Select value={this.state.entry.highest_education} onChange={this.handleEducationChange}>
                        {educationOptions.map(({label, value}) => {
                            return <option value={value} key={value}>{label}</option>
                        })}
                    </Form.Select>
                    <div>Vek:</div>
                    <InputGroup>
                        <input type={"number"} value={this.state.entry.age}
                               onChange={this.handleAgeChange}/>
                    </InputGroup>
                    <br/>
                    <Button variant="secondary"
                            onClick={() => this.toggleModal()}>{this.state.startTime ? "Pokračovať" : "Začať"}</Button>
                </Modal.Body>
            </Modal>
            {this.state.entrySent && <Navigate to={
                "/thankyou?assigned_font=" +
                this.state.entry.assigned_font +
                "&result_font=" +
                this.state.entry.result_font}
            />}
        </ThemeProvider>

    }
}