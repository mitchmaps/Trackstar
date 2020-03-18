import Constants from 'expo-constants';
import * as SQLite from 'expo-sqlite';

export default class Evaluation {
    id:number;
    title:string;
    due_date:string;
    complete:boolean;
    weight:number;
    grade:number;
    course_code:string;

    constructor(t:string, d:string, w:number, co:string, c:boolean = false, g:number = 0, id:number = null) {
        this.title = t;
        this.due_date = d;
        this.weight = w;
        this.course_code = co;
        this.complete = c;
        this.grade = g;
        this.id = id;
    }
}
