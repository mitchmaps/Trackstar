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
    let courses = {};
    db.transaction(tx => {
      tx.executeSql("select * from Course", [], (_, { rows }) =>
        // console.log(JSON.stringify(rows))
        courses = JSON.stringify(rows)
      );
    });
    return courses
  }
}