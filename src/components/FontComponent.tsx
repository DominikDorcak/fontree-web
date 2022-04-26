import React from "react";
import {Font} from "../services/ResponseInterfaces";
import API from "../services/API";

interface FontComponentProps{
    font:Font
}

interface  FontComponentState{
}

const initialState:FontComponentState = {

}


export default class FontComponent extends React.Component<FontComponentProps, FontComponentState>{

    constructor(props:FontComponentProps) {
        super(props);
        this.state = initialState
    }




    componentDidMount() {

    }

    render() {
        return <>
            <div>
                <p>Font</p>
                <p>{this.props.font.name}</p>
            </div>
        </>;
    }
}