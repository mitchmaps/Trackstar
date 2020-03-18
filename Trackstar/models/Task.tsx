import Constants from 'expo-constants';
import * as SQLite from 'expo-sqlite';

export default class Task {
  title:string;
  due_date:string;
  complete:boolean;
  est_duration:number;
  priority:number;
  evaluation_id:number;
  id:number;

  constructor(t:string, d:string, ed:number, ei:number, c:boolean = false, p:number=0, id:number=null) {
      this.title = t;
      this.due_date = d;
      this.est_duration = ed;
      this.priority = p;
      this.complete = c;
      this.evaluation_id = ei;
      this.id = id;
  }
}
