import React from "react";
import {Font} from "../services/ResponseInterfaces";
import ImageLoader from "./ImageLoader";

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




    render() {
        return <>
            <div>
                <h4>Priradený font:</h4>
                <p><strong>{this.props.font.name}</strong></p>
                <ImageLoader path={"fonts/" + this.props.font.font_id  + ".png"} alt={"font"}/>
            </div>
        </>;
    }
}