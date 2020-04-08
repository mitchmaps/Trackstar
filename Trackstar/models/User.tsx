export default class User {
  estimationAccuracy: number;
  numCompletedTasks: number;
  calendarId: string;
  private static instance: User;

  private constructor() {
    this.estimationAccuracy = 100;
    this.numCompletedTasks = 0;
    this.calendarId = null;
  }

  static getInstance() {
    if (!User.instance) {
      User.instance = new User()
    }
    return User.instance
  }
}
