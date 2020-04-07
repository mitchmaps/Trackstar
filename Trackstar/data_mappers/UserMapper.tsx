import User from "../models/User";
import { Task } from "../models";

export default interface UserMapper {
  update(user: User): void;
  getUser(): Promise<User>;
  updateEstAccuracy(newTask: Task): void;
}
