import Evaluation from './Evaluation'

class Course {
    title: string;
    min_grade: number;
    grade: number;
    complete: boolean;

    constructor(t: string, min_g: number, g: number, c:boolean) {
        this.title = t;
        this.min_grade = min_g;
        this.grade = g;
        this.complete = c;
    }

    cur_grade(){
        // return Evaluation.grade;
    }
}
