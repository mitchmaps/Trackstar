import Constants from 'expo-constants';
import * as SQLite from 'expo-sqlite';
import Course from './models/Course';
import Evaluation from './models/Evaluation';
import Task from './models/Task';

export default class Database {
  // TODO:
  // figure out how to properly do callbacks for executeSql!!!!
  // test that foreign key is enabled

  static init = () => {
    const db = SQLite.openDatabase("db.db");
    // check that grade constraint works
    return new Promise((resolve) => {
      db.transaction(tx => {
        // add not null to min_grade
        tx.executeSql("create table if not exists Course (code text primary key not null, title text not null, min_grade float check (min_grade >= 0) check (min_grade <= 100) not null, grade float default 0 check (grade >= 0), complete boolean default 0)")
        resolve()
      })
    }).then(() => {
      return new Promise((resolve) => {
        db.transaction(tx => {
          tx.executeSql("create table if not exists Evaluation (id integer primary key, title text not null, due_date text not null, weight number not null, grade float default 0, complete boolean default 0, course_code text not null, foreign key(course_code) references Course(code), check (weight >= 0 & weight <= 100), check (grade >= 0))")
          resolve()
        })
      }).then(() => {
        db.transaction(tx => {
          tx.executeSql("create table if not exists Task (id integer primary key, title text not null, due_date text, est_duration number not null, priority number, complete boolean default 0, eval_id integer not null, foreign key(eval_id) references Evaluation(id))")
        })
      })
    }
  )}

  static populateCourseTable = () => {
    let course1  = new Course ("Object-Oriented Software Engineering", "COMP3004", 90);
    let course2  = new Course ("Database Management Systems", "COMP3005", 90);
    let course3  = new Course ("Human Computer Interaction", "COMP3008", 80);
    course1.save()
    course2.save()
    course3.save()
  }

  static populateEvalTable = () => {
    let eval1  = new Evaluation ("Test", "March 1", 10, "COMP3008");
    let eval2  = new Evaluation ("Project", "April 1", 90, "COMP3008");
    eval1.save()
    eval2.save()
  }

  static populateTaskTable = () => {
    let task1  = new Task ("Study unit 1", "February 20", 120, 1);
    let task2  = new Task ("Study unit 2", "February 25", 120, 1);
    let task3  = new Task ("Brainstorm project ideas", "March 10", 30, 2);

    task1.save()
    task2.save()
    task3.save()
  }

  static deleteCourseTable = () => {
    const db = SQLite.openDatabase("db.db");
    db.transaction(tx => {
      tx.executeSql("drop table Course")
    })
  }

  static deleteEvalTable = () => {
    const db = SQLite.openDatabase("db.db");
    db.transaction(tx => {
      tx.executeSql("drop table Evaluation")
    })
  }

  static deleteTaskTable = () => {
    const db = SQLite.openDatabase("db.db");
    db.transaction(tx => {
      tx.executeSql("drop table Task")
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