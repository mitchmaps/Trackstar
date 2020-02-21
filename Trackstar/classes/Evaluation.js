import Constants from 'expo-constants';
import * as SQLite from 'expo-sqlite';

export default class Evaluation {
  db = SQLite.openDatabase("db.db");

  // TO DO:
  // figure out how to do ID
  save() {
    this.db.transaction(
      tx => {
        tx.executeSql("insert into Evaluation (id, title, due_date, weight, grade, complete, course_id) values (?, ?, ?, ?)", [this.id, this.title, this.due_date, this.weight, this.grade, this.complete, this.course_id]);
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
          _array.forEach(eval => {
            eval_objs.push(eval)
          })
          resolve(eval_objs)
        })
      })
    }).then((evals) => { // for testing only
      console.log("All evaluations:")
      evals.forEach(eval => {
        console.log(JSON.stringify(eval))
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
    }).then((eval) => { // for testing only
      console.log("Found evaluation:")
      console.log(JSON.stringify(eval))
    })
  }
}