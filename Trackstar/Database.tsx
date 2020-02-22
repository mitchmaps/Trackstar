import Constants from 'expo-constants';
import * as SQLite from 'expo-sqlite';
import Course from './models/Course';

export default class Database {
  // TODO:
  // finish queries, then test them
  // figure out how to properly do callbacks for executeSql!!!!

  static init = () => {
    const db = SQLite.openDatabase("db.db");
    return new Promise((resolve) => {
      db.transaction(tx => {
        // finish this, figure out date type
        // tx.executeSql("create table if not exists Course (code text primary key, title text, min_grade float, grade float default 0, complete boolean default 0)")
        tx.executeSql("create table if not exists Course (code text primary key, title text, min_grade float check (min_grade >= 0 & min_grade <= 100), grade float default 0 check (grade >= 0), complete boolean default 0)")
        resolve()
      })
    }).then(() => {
      console.log("created table")
  //     return new Promise((resolve) => {
  //       db.transaction(tx => {
  //         // finish this, figure out date type
  //         tx.executeSql("create table if not exists Evaluation (id integer primary key, title text not null, due_date datetime, weight number (check weight >= 0 && weight <= 100), grade float default 0 (check grade >= 0), complete boolean default 0, cou)")
  //         resolve()
  //       })
  //     }).then(() => {
  //       db.transaction(tx => {
  //         // finish this, figure out date type
  //         tx.executeSql("create table if not exists Task ()")
  //       })
  //     })
  //   }
  // )}
    })}

  static deleteCourseTable = () => {
    const db = SQLite.openDatabase("db.db");
    db.transaction(tx => {
      tx.executeSql("drop table Course")
    })
  }

  static errorCB(err) {
    console.log("Error processing SQL: "+err.code);
  }

  static courseTest() {
    console.log("inside course test")
    let course  = new Course ("COMP3008", "HCI", 80);
    console.log(course.code)
    course.save()
  }
}