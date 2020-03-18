import TaskMapper from "./TaskMapper";
import Task from "../models/Task";
import DBConnection from "../DBConnection";


export default class TaskMapperImpl implements TaskMapper {

  db = DBConnection.open()

  insert(t: Task): void {
    this.db.transaction(
      tx => {
        tx.executeSql("insert into Task (title, due_date, est_duration, priority, complete, eval_id) values (?, ?, ?, ?, ?, ?)", [this.title, this.due_date, this.est_duration, this.priority, this.complete, this.evaluation_id]);
      },
      null
    );
  };

  update(t: Task): void {
    // use find() to find the course
    // compare the two
    // update
  };

  delete(t: Task): void {
    this.db.transaction(
      tx => {
        tx.executeSql("delete from Task where id=?", [t.id]);
      },
      null
    );
  };

  all(): Promise<Task[]> {
    return new Promise((resolve) => {
      const task_objs = []
      this.db.transaction(tx => {
        tx.executeSql("select * from Task", [], (_, { rows: { _array } }) => {
          _array.forEach(task => {
            task_objs.push(new Task(task.title, task.due_date, task.est_duration, task.eval_id, task.complete, task.priority))
          })
          resolve(task_objs)
        })
      })
    })
  };

  find(id: number): Promise<Task> {
    return new Promise((resolve) => {
      this.db.transaction(tx => {
        tx.executeSql("select * from Task where id = ?", [id], (_, { rows: { _array } }) => {
          resolve(_array[0])
        })
      })
    })
  };

  findByEval(evalID: number): Promise<Task[]> {
    return new Promise((resolve) => {
      const task_objs = []
      this.db.transaction(tx => {
        tx.executeSql("select * from Task where eval_id = ?", [evalID], (_, { rows: { _array } }) => {
          _array.forEach(task => {
            task_objs.push(new Task(task.title, task.due_date, task.est_duration, task.eval_id, task.complete, task.priority, task.id))
          })
          resolve(task_objs)
        })
      })
  })
  }

  createTable(): void {
  // maybe call this from constructor
    this.db.transaction(tx => {
      tx.executeSql("create table if not exists Task (id integer primary key, title text not null, due_date text, est_duration number not null, priority number, complete boolean default 0, eval_id integer not null, foreign key(eval_id) references Evaluation(id))")
    })
  }
}
