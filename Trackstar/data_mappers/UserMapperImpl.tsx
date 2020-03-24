import UserMapper from "./UserMapper";
import User from "../models/User";
import DBConnection from "../DBConnection";


export default class UserMapperImpl implements UserMapper {
  db = DBConnection.open()

  constructor() {
    this.createTable()
    this.getUser();
  }

  update(user: User): void {
    this.db.transaction(
      tx => {
        tx.executeSql("update User set est_accuracy=?, calendarId=?", [user.estimationAccuracy, user.calendarId], null, this.errorHandler);
      },
      null
    );
  }

  getUser(): Promise<User> {
    return new Promise((resolve) => {
      this.db.transaction(tx => {
        tx.executeSql("select * from User", [], (_, { rows: { _array } }) => {
          const user = User.getInstance();
          if (_array[0]) {
          user.estimationAccuracy = _array[0].est_accuracy
          user.calendarId = _array[0].calendarId
          }
          else {
            this.insert()
          }
          resolve(user)
        }),
        this.errorHandler
      })
    })
  }

  private insert(): void {
    this.db.transaction(
      tx => {
        tx.executeSql("insert into User (est_accuracy) values (100)", [], null, this.errorHandler);
      },
      null
    );
  }

  private createTable(): void {
    this.db.transaction(tx => {
      tx.executeSql("create table if not exists User (est_accuracy float, calendarId text default null)")
    })
  }

  private errorHandler(transaction, error): boolean {
    console.log(error);
    return true
  }
}
