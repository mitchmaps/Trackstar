import Evaluation from "./Evaluation";

export default class Task extends Evaluation{
    title: string;
    due_date: Date;
    complete: boolean;
    estimated_duration: number;
    priority: number;
   

    constructor(t: string, d :Date, c: boolean, ed: number, p: number) {
        super(t, d, c);
        this.estimated_duration = ed;
        this.priority = p;
    }
}
