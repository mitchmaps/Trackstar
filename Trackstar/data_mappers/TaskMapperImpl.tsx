import TaskMapper from "./TaskMapper";
import Task from "../models/Task";
import DBConnection from "../DBConnection";
import User from "../models/User";
import UserMapper from "./UserMapper";
import UserMapperImpl from "./UserMapperImpl";


export default class TaskMapperImpl implements TaskMapper {
  db = DBConnection.open()

  constructor() {
    this.createTable()
  }

  insert(t: Task): void {
    console.log("isnerting now2");
    const complete = t.complete ? 1 : 0;
    this.db.transaction(
      tx => {
        tx.executeSql("insert into Task (title, due_date, est_duration, actual_duration, priority, complete, eval_id, id) values (?, ?, ?, ?, ?, ?, ?, ?)", [t.title, JSON.stringify(t.due_date), t.est_duration, t.actual_duration, t.priority, complete, t.evaluation_id, t.id], () => this.updatePriorities(), this.errorHandler);
      },
      null
    );
  };

  update(t: Task, complete: boolean = false): void {
    this.db.transaction(
      tx => {
        tx.executeSql("update Task set title=?, due_date=?, est_duration=?, actual_duration=?, priority=?, complete=? where id=?", [t.title, JSON.stringify(t.due_date), t.est_duration, t.actual_duration, t.priority, t.complete, t.id],
          () => {
            this.updatePriorities();
            if (complete) {
              let userMapper: UserMapper = new UserMapperImpl();
              userMapper.updateEstAccuracy(t);
              this.delete(t);
            }
          },
          this.errorHandler);
      },
      null
    );
  };

  delete(t: Task): void {
    this.db.transaction(
      tx => {
        tx.executeSql("delete from Task where id=?", [t.id], () => this.updatePriorities(), this.errorHandler);
      },
      null
    );
  };

  all(complete: boolean = false): Promise<Task[]> {
    let sql = "";
    if (complete)
      sql = "select * from Task order by priority";
    else
      sql = "select * from Task where complete = 0 order by priority";

    return new Promise((resolve) => {
      const task_objs = []
      this.db.transaction(tx => {
        tx.executeSql(sql, [],
          (_, { rows: { _array } }) => {
            _array.forEach(task => {
              task_objs.push(new Task(task.title, new Date(JSON.parse(task.due_date)), task.est_duration, task.actual_duration, task.eval_id, task.complete, task.priority, task.id))
            })
            resolve(task_objs)
          },
          this.errorHandler
        )
      })
    })
  };

  find(id: number): Promise<Task> {
    return new Promise((resolve) => {
      this.db.transaction(tx => {
        tx.executeSql("select * from Task where id = ?", [id],
          (_, { rows: { _array } }) => {
            if (_array[0] == undefined) {
              resolve(null)
            }
            else {
              const task: Task = new Task(_array[0].title, new Date(JSON.parse(_array[0].due_date)), _array[0].est_duration, _array[0].actual_duration, _array[0].eval_id, _array[0].complete, _array[0].priority, _array[0].id)
              resolve(task)
            }
          },
          this.errorHandler
        )
      })
    })
  };

  findByEval(evalID: number): Promise<Task[]> {
    return new Promise((resolve) => {
      const task_objs = []
      this.db.transaction(tx => {
        tx.executeSql("select * from Task where eval_id = ?", [evalID],
          (_, { rows: { _array } }) => {
            _array.forEach(task => {
              task_objs.push(new Task(task.title, new Date(JSON.parse(task.due_date)), task.est_duration, task.actual_duration, task.eval_id, task.complete, task.priority, task.id))
            })
            resolve(task_objs)
          },
          this.errorHandler
        )
      })
    })
  }

  private createTable(): void {
    this.db.transaction(tx => {
      tx.executeSql("create table if not exists Task (id integer primary key, title text not null, due_date text not null, est_duration number not null, actual_duration number default 0, priority number, complete boolean default 0, eval_id integer not null, foreign key(eval_id) references Evaluation(id) on delete cascade)", [], null, this.errorHandler)
    })
  }

  private errorHandler(transaction, error): boolean {
    console.log(error);
    return true
  }

  private updatePriority(t: Task): void {
    this.db.transaction(
      tx => {
        tx.executeSql("update Task set priority=? where id=?", [t.priority, t.id], null, this.errorHandler);
      },
      null
    );
  };

  private updatePriorities(): void {
    console.log("updating priority...")
    this.all().then((tasks) => {
      Task.prioritizer.prioritize(tasks).then( sortedTasks => {
        for (let i: number = 0; i < sortedTasks.length; i++) {
          sortedTasks[i].priority = i + 1;
          this.updatePriority(sortedTasks[i]);
        }
      })
    })
  }

  private allCompleted(): Promise<Task[]> {
    return new Promise((resolve) => {
      const task_objs = []
      this.db.transaction(tx => {
        tx.executeSql("select * from Task where complete = 1", [],
          (_, { rows: { _array } }) => {
            _array.forEach(task => {
              task_objs.push(new Task(task.title, new Date(JSON.parse(task.due_date)), task.est_duration, task.eval_id, task.complete, task.priority, task.id))
            })
            resolve(task_objs)
          },
          this.errorHandler
        )
      })
    })
  };
}
