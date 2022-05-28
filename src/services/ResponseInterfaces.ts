export interface NodeResponse {
    node: Node
}

export interface StatusResponse {
    db: {
        online: boolean,
        ping: number,
        version: string
    }
}

export interface FontResponse {
    font: Font
}

export interface QuestionResponse {
    question: Question
}

export interface Node {
    node_id: number,
    left_child: number,
    right_child: number,
    question_id: number,
    font_id: number,
    is_leaf: boolean
}

export interface Font {
    font_id: number,
    name: string
}

export interface Question {
    question_id: number,
    text: string,
    answers: Answer[]
}

export interface Answer {
    answer_id: number,
    question_id: number,
    numeric_value: number,
    show_value: string
}

export interface InsertResponse {
    inserted: {
        id: number,
        entry_time: string
    },
}


