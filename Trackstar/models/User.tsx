export default class User {
  estimationAccuracy: number;
  private static instance: User;

  private constructor(ea: number=100) {
    this.estimationAccuracy = ea;
  }

  static getInstance() {
    if (!User.instance) {
      User.instance = new User()
    }
    return User.instance
  }
}
