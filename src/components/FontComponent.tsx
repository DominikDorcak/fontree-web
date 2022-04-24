import React from "react";
import {Font} from "../services/ResponseInterfaces";
import API from "../services/API";

interface FontComponentProps{
}

interface  FontComponentState{
    font:Font
    loaded:boolean
}

const initialState:FontComponentState = {
    font:{
        font_id:NaN,
        name:""
    },
    loaded:false
}


export default class FontComponent extends React.Component<FontComponentProps, FontComponentState>{

    constructor(props:FontComponentProps) {
        super(props);
        this.state = initialState
    }

    fetchFontdata(font_id:number):void{
        API.getFont(font_id).then(response => {
            this.setState({font:response})
        })
    }


    componentDidMount() {
        API.getRandomFont().then(r => {
            this.setState({
                font:{
                    font_id:r.font_id,
                    name:""
                },
                loaded:true
                },() => this.fetchFontdata(this.state.font.font_id))
        })
    }

    render() {
        return <>
            <div>
                <p>Font</p>
                <p>{this.state.font.name}</p>
            </div>
        </>;
    }
}