import {
    Font,
    FontResponse,
    InsertResponse,
    Node,
    NodeResponse,
    Question,
    QuestionResponse,
    StatusResponse
} from "./ResponseInterfaces";
import {ExperimentEntry} from "./RequestInterfaces";

class API {


    async createResponse(path: string, params: any[]): Promise<any> {
        let url = process.env.REACT_APP_API_URL + path
        return fetch(url).then(res => res.json()).then(res => res)
    }

    async sendData(path: string, body: any): Promise<any> {
        let url = process.env.REACT_APP_API_URL + path
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        };
        return fetch(url, requestOptions).then(res => res.json()).then(res => res)
    }

    async getNode(node_id: number): Promise<Node> {
        const path = "node/" + node_id
        const response: NodeResponse = await this.createResponse(path, [])
        return response.node
    }

    async getFont(font_id: number): Promise<Font> {
        const path = "font/" + font_id
        const response: FontResponse = await this.createResponse(path, [])
        return response.font
    }

    async getQuestion(question_id: number): Promise<Question> {
        const path = "question/" + question_id
        const response: QuestionResponse = await this.createResponse(path, [])
        return response.question
    }

    async postEntry(entry: ExperimentEntry):
        Promise<
        {
            id:number,
            entry_time: string
        }>
    {
        const path = "experiment/entry"
        const response: InsertResponse = await this.sendData(path,entry)
        return response.inserted
    }

    async getStatus(): Promise<StatusResponse> {
        return await this.createResponse("", [])
    }

    async getRandomFont(): Promise<{ font_id: number }> {
        return await this.createResponse('font/random', [])
    }
}

export default new API()