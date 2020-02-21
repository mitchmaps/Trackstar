import Evaluation from './Evaluation'

export default class Course {
    code: string;
    title: string;
    min_grade: number;
    grade: number;
    complete: boolean;

<<<<<<< HEAD
    constructor(c: string, t: string, min_g: number) {
        this.code = c;
=======
    constructor(t: string, min_g: number, g: number, c:boolean) {
>>>>>>> 5b06369bafc8ba766ed303c2b6b39c313a12836e
        this.title = t;
        this.min_grade = min_g;
        this.grade = 0;
        this.complete = false;
    }

<<<<<<< HEAD
    // cur_grade(){
    //     return Evaluation.grade;
    // }
=======
    cur_grade(){
        // return Evaluation.grade;
    }
>>>>>>> 5b06369bafc8ba766ed303c2b6b39c313a12836e
}
