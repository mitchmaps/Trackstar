import Task from "../models/Task";

export interface TaskMapper {
  insert(task: Task): void;
  update(task: Task): void;
  delete(task: Task): void;
  all(): Task[];
  find(): Task;
  findByEval(evalID: number): Task[];
}
