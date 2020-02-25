import Evaluation from './Evaluation'

export default class Course {
    code: string;
    title: string;
    min_grade: number;
    grade: number;
    complete: boolean;

    constructor(t: string, min_g: number, g: number, c:boolean) {
        this.title = t;
        this.min_grade = min_g;
        this.grade = 0;
        this.complete = false;
    }

    // cur_grade(){
    //     return Evaluation.grade;
    // }
}
