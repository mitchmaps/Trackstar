import Task from "../models/Task";

export default interface TaskMapper {
  insert(task: Task): void;
  update(task: Task, complete?: boolean): void;
  delete(task: Task): void;
  all(complete?: boolean): Promise<Task[]>;
  find(id: number): Promise<Task>;
  findByEval(evalID: number): Promise<Task[]>;
}
