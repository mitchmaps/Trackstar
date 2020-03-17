import Constants from 'expo-constants';
import * as SQLite from 'expo-sqlite';
import Evaluation from './Evaluation'
import Database from '../Database';

export default class Course {
    code:string;
    title:string;
    min_grade:number;
    grade:number;
    complete:boolean;
    db = SQLite.openDatabase("db.db");

    constructor(t: string, c: string, min_g: number, g: number = 0, cp: boolean = false) {
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
