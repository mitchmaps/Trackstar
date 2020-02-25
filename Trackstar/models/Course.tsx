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

    constructor(t: string, min_g: number, g: number, c:boolean) {
        this.title = t;
        this.min_grade = min_g;
        this.grade = 0;
        this.complete = false;
    }

    // cur_grade(){
    //     return Evaluation.grade;
    // }

    save() {
        this.db.transaction(
            tx => {
            tx.executeSql("insert into Course (code, title, min_grade) values (?, ?, ?)", [this.code, this.title, this.min_grade]);
            // tx.executeSql("insert into Course (title, min_grade) values (?, ?, ?)", [this.title, this.min_grade]);

            // tx.executeSql("select * from Course", [], (_, { rows }) =>
            //   console.log(JSON.stringify(rows))
            // );
            },
            null
        );
    };

    static all() {
        const db = SQLite.openDatabase("db.db");
        const course_objs = []
        return new Promise((resolve) => {
            db.transaction(tx => {
                tx.executeSql("select * from Course", [], (_, { rows: { _array } }) => {
                    _array.forEach(course => {
                        course_objs.push(course)
                    })
                    resolve(course_objs)
                })
            })
        }).then((courses:[Course]) => { // for testing only
            console.log("All courses:")
            console.log(courses.length)
            courses.forEach(course => {
                console.log(JSON.stringify(course))
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
