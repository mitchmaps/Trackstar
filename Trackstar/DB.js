import Constants from 'expo-constants';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("db.db");

export class DB {

  createCourse = () => {
  db.transaction(tx => {
    tx.executeSql(
      // "create table if not exists courses (code text primary key not null, title text not null, complete number(1) default 0);"
      "create table if not exists courses (code text primary key not null, complete number(1) default 0);"
    );
  });
  }

  addCourse = (code) => {
  // is text empty?
  if (code === null || code === "") {
    return false;
  }

    db.transaction(
      tx => {
        tx.executeSql("insert into courses (code) values (?)", [code]);
        tx.executeSql("select * from courses", [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      },
      null
    );
  }

  getCourses = () => {
    const courses = []
    db.transaction(tx => {
      tx.executeSql(
        `select * from courses where complete = 0;`, []).then(([tx,results]) => {
          console.log("Query completed");
          const len = results.rows.length;
          for (let i = 0; i < len; i++) {
            let row = results.rows.item(i);
            console.log(`Course code: ${row.code}`)
            const { code } = row;
            courses.push({
              code: code
            });
          }
        }
      );
    });
  }
}