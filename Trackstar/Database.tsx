import Constants from 'expo-constants';
import * as SQLite from 'expo-sqlite';
import {Course, Evaluation, Task} from './models';
import {
  CourseMapper,
  CourseMapperImpl,
  EvaluationMapper,
  EvaluationMapperImpl,
  TaskMapper,
  TaskMapperImpl,
} from "./data_mappers";

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
          tx.executeSql("create table if not exists Task (id integer primary key, title text not null, due_date text, est_duration number not null, actual_duration number default 0, priority number, complete boolean default 0, eval_id integer not null, foreign key(eval_id) references Evaluation(id))")
        })
      })
    }
  )}

  static populateCourseTable = () => {
    let courseMapper: CourseMapper = new CourseMapperImpl
    let course1  = new Course ("Object-Oriented Software Engineering", "COMP3004", 95);
    let course2  = new Course ("Database Management Systems", "COMP3005", 90);
    let course3  = new Course ("Human Computer Interaction", "COMP3008", 80);
    let course4  = new Course ("The Meaning of Life", "PHIL1200", 90);
    let course5  = new Course ("Intro to Software Engineering", "COMP2404", 90, 92, true);
    let course6  = new Course ("Abstract Data Types and Algorithms", "COMP2402", 90, 92, true);
    let course7  = new Course ("Discrete Structures II", "COMP2804", 90, 92, true);
    let course8  = new Course ("Intro to Systems Programming", "COMP2401", 90, 92, true);
    let course9  = new Course ("Linear Algebra", "MATH 1107", 90, 92, true);


    courseMapper.insert(course1)
    courseMapper.insert(course2)
    courseMapper.insert(course3)
    courseMapper.insert(course4)
    courseMapper.insert(course5)
    courseMapper.insert(course6)
    courseMapper.insert(course7)
    courseMapper.insert(course8)
    courseMapper.insert(course9)
  }

  static populateEvalTable = () => {
    let evalMapper: EvaluationMapper = new EvaluationMapperImpl

    let eval1  = new Evaluation ("Project 1", new Date(), 30, "COMP3008");
    let eval2  = new Evaluation ("Project 2", new Date(), 10, "COMP3008");
    let eval3  = new Evaluation ("Midterm", new Date(), 50, "COMP3008");
    let eval4  = new Evaluation ("Final", new Date(), 10, "COMP3008");

    let eval5  = new Evaluation ("Deliverable 1", new Date(), 10, "COMP3004", true, 100);
    let eval6  = new Evaluation ("Deliverable 2", new Date(), 10, "COMP3004", true, 100);
    let eval7  = new Evaluation ("Deliverable 3", new Date(), 60, "COMP3004", true, 90);
    let eval8  = new Evaluation ("Deliverable 4", new Date(), 20, "COMP3004");

    let eval9  = new Evaluation ("Midterm", new Date(), 90, "PHIL1200");
    let eval10  = new Evaluation ("Final", new Date(), 10, "PHIL1200");

    evalMapper.insert(eval1)
    evalMapper.insert(eval2)
    evalMapper.insert(eval3)
    evalMapper.insert(eval4)
    evalMapper.insert(eval5)
    evalMapper.insert(eval6)
    evalMapper.insert(eval7)
    evalMapper.insert(eval8)
    evalMapper.insert(eval9)
    evalMapper.insert(eval10)
  }

  static populateTaskTable = () => {
    let taskMapper: TaskMapper = new TaskMapperImpl

    let task4  = new Task ("Analyze questionnaire data", new Date(2020, 3, 10, 17, 0, 0, 0), 1, 0, 2, false, 1);
    // let task1  = new Task ("Demo", new Date(2020, 3, 8, 14, 0, 0, 0), 30, 0, 8, false, 1);
    // let task2  = new Task ("Demo video ", new Date(2020, 3, 5, 15, 0, 0, 0), 30, 0, 8, false, 2); // change date
    // let task3  = new Task ("Prep for presentation", new Date(2020, 3, 7, 17, 0, 0, 0), 360, 0, 8, false, 3);
    // let task5  = new Task ("Study unit 1", new Date(2020, 3, 10, 17, 0, 0, 0), 120, 0, 1, false, 2);
    let task6  = new Task ("Study unit 2", new Date(2020, 3, 12, 17, 0, 0, 0), 1, 0, 10, false, 2);
    let task7  = new Task ("Make flashcards", new Date(2020, 3, 15, 17, 0, 0, 0), 1, 0, 4, false, 3);

    // taskMapper.insert(task1)
    // taskMapper.insert(task2)
    // taskMapper.insert(task3)
    taskMapper.insert(task4)
    // taskMapper.insert(task5)
    taskMapper.insert(task6)
    // taskMapper.insert(task7)
  }

  static deleteCourseData = () => {
    const db = SQLite.openDatabase("db.db");
    db.transaction(tx => {
      tx.executeSql("delete from Course")
    })
  }

  static deleteEvalData = () => {
    const db = SQLite.openDatabase("db.db");
    db.transaction(tx => {
      tx.executeSql("delete from Evaluation")
    })
  }

  static deleteTaskData = () => {
    const db = SQLite.openDatabase("db.db");
    db.transaction(tx => {
      tx.executeSql("delete from Task")
    })
  }

  static deleteUserData = () => {
    const db = SQLite.openDatabase("db.db");
    db.transaction(tx => {
      tx.executeSql("delete from User")
    })
  }

  static deleteCourseTable = () => {
    const db = SQLite.openDatabase("db.db");
    db.transaction(tx => {
      tx.executeSql("drop table Course")
    })
  }

  static deleteUserTable = () => {
    const db = SQLite.openDatabase("db.db");
    db.transaction(tx => {
      tx.executeSql("drop table User")
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
    let course  = new Course ("COMP3008", "HCI", 80);
  }
}
