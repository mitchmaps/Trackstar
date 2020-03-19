import Task from "../models/Task";

export default interface TaskMapper {
  insert(task: Task): void;
  update(task: Task): void;
  delete(task: Task): void;
  all(): Promise<Task[]>;
  find(id: number): Promise<Task>;
  findByEval(evalID: number): Promise<Task[]>;
}
