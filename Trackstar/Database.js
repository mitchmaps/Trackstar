import Constants from 'expo-constants';
import * as SQLite from 'expo-sqlite';

export default class Database {
  // these should probably be static?
  db = SQLite.openDatabase("db.db");

  init = () => {
    return new Promise((resolve) => {
      this.db.transaction(tx => {
        // finish this, figure out date type
        tx.executeSql("create table if not exists Course (code text primary key not null, complete number(1) default 0)")
        resolve()
      })
    }).then(() => {
      return new Promise((resolve) => {
        this.db.transaction(tx => {
          // finish this, figure out date type
          tx.executeSql("create table if not exists Evaluation ()")
          resolve()
        })
      }).then(() => {
        this.db.transaction(tx => {
          // finish this, figure out date type
          tx.executeSql("create table if not exists Task ()")
        })
      })
    }
  )}

  createCourse = () => {
    console.log("creating table")
    this.db.transaction(tx => {
      tx.executeSql(
        // "create table if not exists courses (code text primary key not null, title text not null, complete number(1) default 0);"
        "create table if not exists Course (code text primary key not null, complete number(1) default 0);"
      )
    });
  }

  addCourse = (code = "COMP3008") => {
    // is text empty?
    if (code === null || code === "") {
      return false;
    }
    console.log(`adding course with code ${code}`)

    this.db.transaction(
      tx => {
        tx.executeSql("insert into Course (code) values (?)", [code]);
        tx.executeSql("select * from Course", [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      },
      null
    );
  }

  getCourses = () => {
    const course_objs = []
    return new Promise((resolve) => {
      this.db.transaction(tx => {
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

  deleteCourses = () => {
    this.db.transaction(tx => {
      tx.executeSql("drop table Course", [], (_, { rows }) =>
        console.log("Deleted Course table")
      );
    });
  }

  find3004 = (code='COMP3004') => {
    return new Promise((resolve) => {
      this.db.transaction(tx => {
        tx.executeSql("select * from Course where code = ?", [code], (_, { rows: { _array } }) => {
          resolve(_array[0])
        })
      })
    }).then((course) => { // for testing only
      console.log("Found course:")
      console.log(JSON.stringify(course))
    })
  }
  //         // const len = results.rows.length;
  //         // for (let i = 0; i < len; i++) {
  //         //   let row = results.rows.item(i);
  //         //   console.log(`Course code: ${row.code}`)
  //         //   const { code } = row;
  //         //   courses.push({
  //         //     code: code
  //         //   });
  //         // }
  //       }
  //     );
  //   });
  // }
}