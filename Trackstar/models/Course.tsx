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

    save() {
        this.db.transaction(
            tx => {
            tx.executeSql("insert into Course (code, title, min_grade) values (?, ?, ?)", [this.code, this.title, this.min_grade]);
            },
            null
        );
    };

    // returns a promise
    static all() {
        const db = SQLite.openDatabase("db.db");
        return new Promise((resolve) => {
            const course_objs = []
            db.transaction(tx => {
                tx.executeSql("select * from Course", [], (_, { rows: { _array } }) => {
                    _array.forEach(course => {
                        course_objs.push(new Course(course.title, course.code, course.min_grade, course.grade, course.complete))
                    })
                    resolve(course_objs)
                })
            })
        })
    }

    static find(code) {
        const db = SQLite.openDatabase("db.db");
        return new Promise((resolve) => {
          db.transaction(tx => {
            tx.executeSql("select * from Course where code = ?", [code], (_, { rows: { _array } }) => {
              resolve(_array[0])
            })
          })
        }).then((course) => { // for testing only
          console.log("Found course:")
          console.log(JSON.stringify(course))
        })
    }
}
