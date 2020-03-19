import User from "../models/User";

export default interface UserMapper {
  update(user: User): void;
  getUser(): Promise<User>;
  // updateEstAccuracy()
}
