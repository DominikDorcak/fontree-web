import React from "react";
import API from "../services/API";
import {StatusResponse} from "../services/ResponseInterfaces";

interface MainComponentProps{

}
interface MainComponentState{
    apiStatus:StatusResponse
}

const initialState = {
    apiStatus:{
        db: {
            online:false,
            ping:NaN,
            version:""
        }
    }
}

export default class MainComponent extends React.Component<MainComponentProps, MainComponentState>{
    constructor(props:MainComponentProps) {
        super(props);
        this.state = initialState
    }

    componentDidMount() {
        API.getStatus().then(r => {
            console.log(r)
            this.setState({apiStatus:r})
        })
    }

    render() {
        return <div>
            <p>Status</p>
            <p>db:<br/>
                <div>{this.state.apiStatus.db.online ? "online" : "offline"}</div><br/>
                <div>version: {this.state.apiStatus.db.version}</div><br/>
                <div>ping: {this.state.apiStatus.db.ping}</div>
            </p>
        </div>
    }
}