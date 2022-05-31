import React, {Component} from "react";
import {Button} from "react-bootstrap";
import { Navigate } from "react-router-dom";


export default class NotFoundComponent extends Component<any, any>{
    constructor(props:any) {
        super(props);
        this.state = {
            redirect: false
        }
    }


    render() {
        return <>
            <br/> <br/>
            <h2>Stránka neexistuje</h2>
            <br/> <br/>
            <Button variant="secondary" onClick={()=>{this.setState({redirect:true})}}>
                Späť na hlavnú stránku
            </Button>
            {this.state.redirect && <Navigate to={"/"}/>}
            </>

    }
}