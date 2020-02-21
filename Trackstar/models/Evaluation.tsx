export default class Evaluation {
    title: string;
    due_date: [number, number, number];
    weight: number;
    grade: number;
    complete: boolean;

    constructor(t: string, d: [number,number,number], w: number, g: number, c:boolean) {
        this.title = t;
        this.due_date = d;
        this.weight = w;
        this.grade = 0;
        this.complete = false;
    }
}
