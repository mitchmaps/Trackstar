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
        this.course_code = co;
        this.complete = c;
        this.grade = g;
    }

  // TO DO:
  // come back to this ID setting code
  save() {
    this.db.transaction(
      tx => {
        tx.executeSql("insert into Evaluation (title, due_date, weight, grade, complete, course_code) values (?, ?, ?, ?, ?, ?)", [this.title, this.due_date, this.weight, this.grade, this.complete, this.course_code]);
        // tx.executeSql("select * from Course", [], (_, { rows }) =>
        //   console.log(JSON.stringify(rows))
        // );
      },
      null
    );
    // return new Promise((resolve) => {
    //   db.transaction(tx => {
    //     tx.executeSql("select last_insert_rowid()", [], (_, { rows: { _array } }) => {
    //       resolve(_array[0])
    //     })
    //   })
    // }).then((id:[number]) => { // for testing only
    //   this.id = id
    // })
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

  static findByCourseCode(code) {
    const db = SQLite.openDatabase("db.db");
    const eval_objs = [];

    return new Promise((resolve) => {
      db.transaction(tx => {
        tx.executeSql("select * from Evaluation where course_code = ?", [code], (_, {rows: { _array } }) => {
          _array.forEach(currEval => {
            eval_objs.push(new Evaluation(currEval.title, currEval.due_date, currEval.weight, currEval.grade));
          })

          console.log('in Eval');
          console.log(eval_objs);
          resolve(eval_objs)
        });
      });
    });
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
