import * as SQLite from 'expo-sqlite';
import { WebSQLDatabase } from 'expo-sqlite';

export default class DBConnection {
  static open(): WebSQLDatabase {
    return SQLite.openDatabase("db.db");
  }

  static close() {
    // apparently there's no way to close it
  }
}
