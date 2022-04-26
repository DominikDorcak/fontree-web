import React from "react";
import API from "../services/API";
import {Font, Node, StatusResponse} from "../services/ResponseInterfaces";
import FontComponent from "./FontComponent";
import QuestionComponent from "./QuestionComponent";
import {ExperimentEntry} from "../services/RequestInterfaces";
import Select from 'react-select'
import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from "react-router-dom";


interface MainComponentProps {

}

interface MainComponentState {
    apiStatus: StatusResponse
    entry: ExperimentEntry,
    font: Font,
    node: Node
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
        question_count: NaN
    },
    node: {
        question_id: NaN,
        right_child: NaN,
        left_child: NaN,
        font_id: NaN,
        is_leaf: false,
        node_id: 1,
    }


}

const sexOptions = [
    {value: "M", label: "Muž"},
    {value: "F", label: "Žena"},
    {value: "U", label: "Nedefinované"}
]

const educationOptions = [
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
        API.getFont(font_id).then(response => {
            this.setState({font: response})
        })
    }

    handleSexChange = (newvalue:any) => {
        this.setState((oldstate:MainComponentState) => {
            return {
                node:oldstate.node,
                font:oldstate.font,
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

    handleEducationChange = (newvalue:any) => {
        this.setState((oldstate:MainComponentState) => {
            return {
                entry: {
                    age: oldstate.entry.age,
                    sex: oldstate.entry.sex,
                    highest_education: newvalue.value,
                    assigned_font: oldstate.entry.assigned_font,
                    result_font: oldstate.entry.result_font,
                    time_in_milis: oldstate.entry.time_in_milis,
                    question_count: oldstate.entry.question_count
                }
            }
        })
    }

    handleAgeChange = (e: React.FormEvent<HTMLInputElement>) => {
        const val:number = parseInt(e.currentTarget.value)
        this.setState((oldstate:MainComponentState) => {
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


    componentDidMount() {
        API.getStatus().then(r => {
            this.setState({apiStatus: r})
        })
        API.getRandomFont().then(r => {
            this.setState({
                entry: {
                    age: NaN,
                    sex: '',
                    highest_education: NaN,
                    assigned_font: r.font_id,
                    result_font: NaN,
                    time_in_milis: NaN,
                    question_count: NaN
                }
            }, () => this.fetchFontData(this.state.entry.assigned_font))
        })

    }


    render() {
        console.log(this.state)
        return <div>
            <p>Status</p>
            <div>db:<br/>
                <div>{this.state.apiStatus.db.online ? "online" : "offline"}</div>
                <br/>
                <div>version: {this.state.apiStatus.db.version}</div>
                <br/>
                <div>ping: {this.state.apiStatus.db.ping}</div>
                <FontComponent font={this.state.font}></FontComponent>
                <QuestionComponent
                    question_id={isNaN(this.state.node.question_id) ? 5 : this.state.node.question_id}></QuestionComponent>
            </div>
            <Select options={sexOptions} onChange={this.handleSexChange}></Select>
            <Select options={educationOptions} onChange={this.handleEducationChange}></Select>
            <input type={"number"} onChange={this.handleAgeChange}/>
        </div>
    }
}