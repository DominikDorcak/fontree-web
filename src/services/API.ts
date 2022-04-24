import {Font, FontResponse, Node, NodeResponse, Question, QuestionResponse, StatusResponse} from "./ResponseInterfaces";

class API{


    async createResponse(path:string,params:any[]) : Promise<any>{
        let url = process.env.REACT_APP_API_URL + path
        console.log(url)
        return fetch(url).then(res => res.json()).then(res => res)
    }

    async getNode(node_id:number) : Promise<Node>{
        const path = "node/" + node_id
        const response:NodeResponse = await this.createResponse(path,[])
        return response.node
    }

    async getFont(font_id:number) : Promise<Font>{
        const path = "font/" + font_id
        const response:FontResponse = await this.createResponse(path,[])
        return response.font
    }

    async getQuestion(question_id:number) : Promise<Question>{
        const path = "question/" + question_id
        const response:QuestionResponse = await this.createResponse(path,[])
        return response.question
    }

    async getStatus() : Promise<StatusResponse>{
        return await this.createResponse("",[])
    }
}

export default new API()