export default class Course {
    code: string;
    title: string;
    min_grade: number;
    grade: number;
    complete: boolean;

    constructor(c: string, t: string, min_g: number) {
        this.code = c;
        this.title = t;
        this.min_grade = min_g;
        this.grade = 0;
        this.complete = false;
    }

    // cur_grade(){
    //     return Evaluation.grade;
    // }
}
