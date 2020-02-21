export default class Evaluation {
    // id
    title: string;
    due_date: Date;
    complete: boolean;
    weight: number;
    grade: number;
    // course_id

    constructor(t: string, d: Date, c:boolean, w: number, g: number) {
        this.title = t;
        this.due_date = d;
        this.weight = w;
        this.grade = 0;
        this.complete = false;
    }
}
