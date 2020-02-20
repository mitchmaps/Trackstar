import Constants from 'expo-constants';
import * as SQLite from 'expo-sqlite';

export default class Database {
  // these should probably be static?
  db = SQLite.openDatabase("db.db");

  createCourse = () => {
    console.log("creating table")
    this.db.transaction(tx => {
      tx.executeSql(
        // "create table if not exists courses (code text primary key not null, title text not null, complete number(1) default 0);"
        "create table if not exists Course (code text primary key not null, complete number(1) default 0);"
      )
    });
  }

  addCourse = (code = "COMP3004") => {
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
  //   const courses = []
    this.db.transaction(tx => {
      tx.executeSql("select * from Course", [], (_, { rows }) =>
        console.log(JSON.stringify(rows))
      );
    });
  }

  deleteCourses = () => {
    this.db.transaction(tx => {
      tx.executeSql("drop table Course", [], (_, { rows }) =>
        console.log("Deleted Course table")
      );
    });
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