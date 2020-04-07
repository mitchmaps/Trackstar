import UserMapper from "./UserMapper";
import User from "../models/User";
import DBConnection from "../DBConnection";
import { Task } from "../models";


export default class UserMapperImpl implements UserMapper {
  db = DBConnection.open()

  constructor() {
    this.createTable()
    this.getUser();
  }

  update(user: User): void {
    this.db.transaction(
      tx => {
        tx.executeSql("update User set est_accuracy=?, num_completed_tasks=?, calendarId=?", [user.estimationAccuracy, user.numCompletedTasks, user.calendarId], null, this.errorHandler);
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

  updateEstAccuracy(newTask: Task): void {
    this.getUser().then(() => { // updates the singleton
      let user = User.getInstance() // get the singleton
      let calculation = user.estimationAccuracy
      let estimation: number = newTask.actual_duration/newTask.est_duration;

      user.estimationAccuracy = (calculation*user.numCompletedTasks +estimation)/(user.numCompletedTasks+1);
      user.numCompletedTasks += 1;
      this.update(user);
    })
  }

  private insert(): void {
    this.db.transaction(
      tx => {
        tx.executeSql("insert into User (est_accuracy, num_completed_tasks) values (100, 0)", [], null, this.errorHandler);
      },
      null
    );
  }

  private createTable(): void {
    this.db.transaction(tx => {
      tx.executeSql("create table if not exists User (est_accuracy float, num_completed_tasks integer default 0, calendarId text default null)")
    })
  }

  private errorHandler(transaction, error): boolean {
    console.log(error);
    return true
  }
}
