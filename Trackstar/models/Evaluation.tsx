import Constants from 'expo-constants';
import * as SQLite from 'expo-sqlite';

export default class Evaluation {
    // id:number;
    title:string;
    due_date:Date;
    complete:boolean;
    weight:number;
    grade:number;
    course_code:string;

    db = SQLite.openDatabase("db.db");

    constructor(t:string, d:Date, c:boolean, w:number, g:number, co:string) {
        //this.id =
        this.title = t;
        this.due_date = d;
        this.weight = w;
        this.grade = 0;
        this.complete = false;
        this.course_code = co;
    }

    // TO DO:
  // figure out how to do ID INTEGER PRIMARY KEY
  // figure out if date needs to be converted to match sql type
  save() {
    this.db.transaction(
      tx => {
        tx.executeSql("insert into Evaluation (title, due_date, weight, grade, complete, course_id) values (?, ?, ?, ?, ?, ?)", [this.title, this.due_date, this.weight, this.grade, this.complete, this.course_code]);
        // tx.executeSql("select * from Course", [], (_, { rows }) =>
        //   console.log(JSON.stringify(rows))
        // );
      },
      null
    );
  };

  static all() {
    const db = SQLite.openDatabase("db.db");
    const eval_objs = []
    return new Promise((resolve) => {
      db.transaction(tx => {
        tx.executeSql("select * from Evaluation", [], (_, { rows: { _array } }) => {
          _array.forEach(evaltn => {
            eval_objs.push(evaltn)
          })
          resolve(eval_objs)
        })
      })
    }).then((evals:[Evaluation]) => { // for testing only
      console.log("All evaluations:")
      evals.forEach(evaltn => {
        console.log(JSON.stringify(evaltn))
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
