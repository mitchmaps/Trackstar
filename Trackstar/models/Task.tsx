export default class Task {
    // id
    title: string;
    due_date: Date;
    complete: boolean;
    estimated_duration: number;
    priority: number;
    // evaluation_id


    constructor(t: string, d :Date, ed: number, p: number) {
        this.title = t;
        this.due_date = d;
        this.complete = false;
        this.estimated_duration = ed;
        this.priority = p;
    }
}
