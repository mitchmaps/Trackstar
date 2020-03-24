import UserMapper from "./UserMapper";
import User from "../models/User";
import DBConnection from "../DBConnection";


export default class UserMapperImpl implements UserMapper {
  db = DBConnection.open()

  constructor() {
    this.createTable()
    this.insert()

  }

  update(user: User): void {
    this.db.transaction(
      tx => {
        tx.executeSql("update User set est_accuracy=?", [user.estimationAccuracy]);
      },
      null
    );
  }

  getUser(): Promise<User> {
    return new Promise((resolve) => {
      this.db.transaction(tx => {
        tx.executeSql("select * from User", [], (_, { rows: { _array } }) => {
          const user = User.getInstance();
          user.estimationAccuracy = _array[0].est_accuracy
          resolve(user)
        })
      })
    })
  }

  private insert(): void {
    this.db.transaction(
      tx => {
        tx.executeSql("insert into User (est_accuracy) values (100)");
      },
      null
    );
  }

  private createTable(): void {
    this.db.transaction(tx => {
      tx.executeSql("create table if not exists User (est_accuracy)")
    })
  }
}
