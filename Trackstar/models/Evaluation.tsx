export default class Evaluation {
    title: string;
    due_date: Date;
    complete: boolean;
    weight: number;
    grade: number;
    

    constructor(t: string, d: Date, c: boolean)

    constructor(t?: string, d?: Date, c?:boolean, w?: number, g?: number) {
        this.title = t;
        this.due_date = d;
        this.weight = w;
        this.grade = g;
        this.complete = c;
    }
}
