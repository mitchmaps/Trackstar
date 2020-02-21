import Constants from 'expo-constants';
import * as SQLite from 'expo-sqlite';

export default class Database {
  // these should probably be static?

  static init = () => {
    const db = SQLite.openDatabase("db.db");
    return new Promise((resolve) => {
      db.transaction(tx => {
        // finish this, figure out date type
        tx.executeSql("create table if not exists Course (code text primary key not null, complete number(1) default 0)")
        resolve()
      })
    }).then(() => {
      return new Promise((resolve) => {
        db.transaction(tx => {
          // finish this, figure out date type
          tx.executeSql("create table if not exists Evaluation ()")
          resolve()
        })
      }).then(() => {
        db.transaction(tx => {
          // finish this, figure out date type
          tx.executeSql("create table if not exists Task ()")
        })
      })
    }
  )}
}