export default class Task {
    title: string;
    estimated_duration: number;
    priority: number;
    complete: boolean;

    constructor(t: string, d: number, p: number, c:boolean) {
        this.title = t;
        this.estimated_duration = d;
        this.priority = p;
        this.complete = c;
    }
}
