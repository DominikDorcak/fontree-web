import React from "react";

interface ImgProps {
    path:string
    alt:string
    class?: string
}

interface ImgState {

}

export default class ImageLoader extends React.Component<ImgProps, ImgState>{
    imghome = process.env.REACT_APP_IMG_HOME

    render() {
        return (
            <img src={this.imghome + this.props.path} alt={this.props.alt} className={this.props.class!} loading={"lazy"}></img>
        );
    }
}
