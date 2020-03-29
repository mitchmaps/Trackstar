import TaskPrioritizer from './TaskPrioritizer';

export default class Task {
  title:string;
  due_date:Date;
  complete:boolean;
  est_duration:number;
  actual_duration:number;
  priority:number;
  evaluation_id:number;
  id:number;
  static prioritizer: TaskPrioritizer = new TaskPrioritizer();

  constructor(t:string, d:Date, ed:number, ad: number = 0, ei:number, c:boolean = false, p:number=0, id:number=null) {
      this.title = t;
      this.due_date = d;
      this.est_duration = ed;
      this.actual_duration = ad;
      this.priority = p;
      this.complete = c;
      this.evaluation_id = ei;
      this.id = id;
  }
}
