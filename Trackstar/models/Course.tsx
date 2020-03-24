export default class Course {
    code:string;
    title:string;
    min_grade:number;
    grade:number;
    complete:boolean;

    constructor(t: string, c: string, min_g: number, g = 0, cp = false) {
        this.title = t;
        this.code = c;
        this.min_grade = min_g;
        this.grade = g;
        this.complete = cp;
    }

    // cur_grade(){
    //     return Evaluation.grade;
    // }
}
