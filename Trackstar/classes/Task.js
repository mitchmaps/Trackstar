import Constants from 'expo-constants';
import * as SQLite from 'expo-sqlite';

export default class Task {
  db = SQLite.openDatabase("db.db");

  // TO DO:
  // figure out how to do ID
  save() {
    this.db.transaction(
      tx => {
        tx.executeSql("insert into Task (id, title, est_duration, priority, complete) values (?, ?, ?, ?, ?)", [this.id, this.title, this.est_duration, this.priority, this.complete]);
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
    }).then((tasks) => { // for testing only
      console.log("All tasks:")
      tasks.forEach(task => {
        console.log(JSON.stringify(task))
      })
    })
  }

  static find(id) {
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