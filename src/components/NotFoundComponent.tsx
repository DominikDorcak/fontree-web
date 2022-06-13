import React, {Component} from "react";
import {Button} from "react-bootstrap";
import { Navigate } from "react-router-dom";
import ImageLoader from "./ImageLoader";


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
            <h2>Stránka neexistuje!</h2>
            <br/>
            <ImageLoader path={'404.jpg'} alt={"404"} class={'img-404'}/>
            <br/>
            <Button variant="secondary" onClick={()=>{this.setState({redirect:true})}}>
                Späť na hlavnú stránku
            </Button>
            {this.state.redirect && <Navigate to={"/"}/>}
            <br/>
            <br/>
            <br/>
            <a href="https://www.freepik.com/vectors/server-error">Server error vector created by storyset - www.freepik.com</a>
            </>

    }
}