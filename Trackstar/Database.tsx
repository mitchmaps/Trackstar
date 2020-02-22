import Constants from 'expo-constants';
import * as SQLite from 'expo-sqlite';
import Course from './models/Course';

export default class Database {
  // TODO:
  // finish queries, then test them
  // figure out how to properly do callbacks for executeSql!!!!
  // test that foreign key is enabled

  static init = () => {
    const db = SQLite.openDatabase("db.db");
    return new Promise((resolve) => {
      db.transaction(tx => {
        // add not null to min_grade
        tx.executeSql("create table if not exists Course (code text primary key, title text not null, min_grade float check (min_grade >= 0 & min_grade <= 100), grade float default 0 check (grade >= 0), complete boolean default 0)")
        resolve()
      })
    }).then(() => {
      return new Promise((resolve) => {
        db.transaction(tx => {
          tx.executeSql("create table if not exists Evaluation (id integer primary key, title text not null, due_date datetime not null, weight number not null, grade float default 0, complete boolean default 0, course_code text not null, foreign key(course_code) references Course(code), check (weight >= 0 & weight <= 100), check (grade >= 0))")
          resolve()
        })
      }).then(() => {
        db.transaction(tx => {
          tx.executeSql("create table if not exists Task (id integer primary key, title text not null, due_date datetime, est_duration:number not null, priority number, complete boolean default 0, eval_id integer not null, foreign key(eval_id) references Evaluation(id))")
        })
      })
    }
  )}

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