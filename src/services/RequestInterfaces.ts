export interface ExperimentEntry{
    id?:number,
    entry_time?:Date,
    age:number|undefined,
    sex:string,
    highest_education:number,
    assigned_font:number,
    result_font:number,
    time_in_milis:number,
    question_count:number
}