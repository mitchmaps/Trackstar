import Constants from 'expo-constants';
import * as SQLite from 'expo-sqlite';

export default class Course {
  db = SQLite.openDatabase("db.db");

  save() {
    this.db.transaction(
      tx => {
        tx.executeSql("insert into Course (code, title, min_grade, time_slot) values (?, ?, ?, ?)", [this.code, this.title, this.min_grade, this.time_slot]);
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
    }).then((courses) => { // for testing only
      console.log("All courses:")
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