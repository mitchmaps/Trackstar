import Constants from 'expo-constants';
import * as SQLite from 'expo-sqlite';

// TO DO
// see evaluation for draft id setting code

export default class Task {
    title:string;
    due_date:Date;
    complete:boolean;
    est_duration:number;
    priority:number;
    evaluation_id:number;
    db = SQLite.openDatabase("db.db");

    constructor(t:string, d:Date, ed:number, p:number, ei:number) {
        this.title = t;
        this.due_date = d;
        this.est_duration = ed;
        this.priority = p;
        this.complete = false;
        this.evaluation_id = ei;
    }

  save() {
    this.db.transaction(
      tx => {
        tx.executeSql("insert into Task (title, est_duration, priority, complete, evaluation_id) values (?, ?, ?, ?, ?)", [this.title, this.est_duration, this.priority, this.complete, this.evaluation_id]);
        // tx.executeSql("select * from Course", [], (_, { rows }) =>
        //   console.log(JSON.stringify(rows))
        // );
      },
      null
    );
  };

  static all() {
    const db = SQLite.openDatabase("db.db");
    const task_objs = []
    return new Promise((resolve) => {
      db.transaction(tx => {
        tx.executeSql("select * from Task", [], (_, { rows: { _array } }) => {
          _array.forEach(task => {
            task_objs.push(task)
          })
          resolve(task_objs)
        })
      })
    }).then((tasks:[Task]) => { // for testing only
      console.log("All tasks:")
      tasks.forEach(task => {
        console.log(JSON.stringify(task))
      })
    })
  }

  static find(id:number) {
    const db = SQLite.openDatabase("db.db");
    return new Promise((resolve) => {
      db.transaction(tx => {
        tx.executeSql("select * from Task where id = ?", [id], (_, { rows: { _array } }) => {
          resolve(_array[0])
        })
      })
    }).then((task) => { // for testing only
      console.log("Found tasks:")
      console.log(JSON.stringify(task))
    })
  }
}
