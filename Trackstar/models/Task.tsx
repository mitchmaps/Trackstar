import Constants from 'expo-constants';
import * as SQLite from 'expo-sqlite';

// TO DO
// see evaluation for draft id setting code

export default class Task {
    title:string;
    due_date:string;
    complete:boolean;
    est_duration:number;
    priority:number;
    evaluation_id:number;
    db = SQLite.openDatabase("db.db");

    constructor(t:string, d:string, ed:number, ei:number, c:boolean = false, p:number=0) {
        this.title = t;
        this.due_date = d;
        this.est_duration = ed;
        this.priority = p;
        this.complete = c;
        this.evaluation_id = ei;
    }

  save() {
    this.db.transaction(
      tx => {
        tx.executeSql("insert into Task (title, due_date, est_duration, priority, complete, eval_id) values (?, ?, ?, ?, ?, ?)", [this.title, this.due_date, this.est_duration, this.priority, this.complete, this.evaluation_id]);
        // tx.executeSql("select * from Course", [], (_, { rows }) =>
        //   console.log(JSON.stringify(rows))
        // );
      },
      null
    );
  };

  static all() {
    const db = SQLite.openDatabase("db.db");
    return new Promise((resolve) => {
        const task_objs = []
        db.transaction(tx => {
            tx.executeSql("select * from Task", [], (_, { rows: { _array } }) => {
                _array.forEach(task => {
                    task_objs.push(new Task(task.title, task.due_date, task.est_duration, task.eval_id, task.complete, task.priority))
                })
                resolve(task_objs)
            })
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
