import Constants from 'expo-constants';
import * as SQLite from 'expo-sqlite';

export default class Evaluation {
    // id:number;
    title:string;
    due_date:string;
    complete:boolean;
    weight:number;
    grade:number;
    course_code:string;

    db = SQLite.openDatabase("db.db");

    constructor(t:string, d:string, w:number, co:string, c:boolean = false, g:number = 0) {
        // this.id = null;
        this.title = t;
        this.due_date = d;
        this.weight = w;
        this.grade = g;
        this.complete = c;
        this.course_code = co;
    }

  // TO DO:
  // come back to this ID setting code
  save() {
    this.db.transaction(
      tx => {
        tx.executeSql("insert into Evaluation (title, due_date, weight, grade, complete, course_code) values (?, ?, ?, ?, ?, ?)", [this.title, this.due_date, this.weight, this.grade, this.complete, this.course_code]);
      },
      null
    );
  };

  static all() {
    const db = SQLite.openDatabase("db.db");
    return new Promise((resolve) => {
        const eval_objs = []
        db.transaction(tx => {
            tx.executeSql("select * from Evaluation", [], (_, { rows: { _array } }) => {
                _array.forEach(evaluation => {
                    eval_objs.push(new Evaluation(evaluation.title, evaluation.due_date, evaluation.weight, evaluation.course_code, evaluation.complete, evaluation.grade))
                })
                resolve(eval_objs)
            })
        })
    })
  }

  static find(id) {
    const db = SQLite.openDatabase("db.db");
    return new Promise((resolve) => {
      db.transaction(tx => {
        tx.executeSql("select * from Evaluation where id = ?", [id], (_, { rows: { _array } }) => {
          resolve(_array[0])
        })
      })
    }).then((evaltn:[Evaluation]) => { // for testing only
      console.log("Found evaluation:")
      console.log(JSON.stringify(evaltn))
    })
  }
}
