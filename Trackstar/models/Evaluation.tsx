export default class Evaluation {
    id:number;
    title:string;
    due_date:Date;
    complete:boolean;
    weight:number;
    grade:number;
    course_code:string;

    constructor(t:string, d:Date, w:number, co:string, c:boolean = false, g:number = 0, id:number = null) {
        this.title = t;
        this.due_date = d;
        this.weight = w;
        this.course_code = co;
        this.complete = c;
        this.grade = g;
        this.id = id;
    }
}
