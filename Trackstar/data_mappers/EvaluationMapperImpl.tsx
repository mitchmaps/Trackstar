import EvaluationMapper from "./EvaluationMapper";
import Evaluation from "../models/Evaluation";
import DBConnection from "../DBConnection";


export default class EvaluationMapperImpl implements EvaluationMapper {
  db = DBConnection.open()

  constructor() {
    this.createTable()
  }

  insert(e: Evaluation): void {
    this.db.transaction(
      tx => {
        tx.executeSql("insert into Evaluation (title, due_date, weight, grade, complete, course_code, id) values (?, ?, ?, ?, ?, ?, ?)", [e.title, e.due_date, e.weight, e.grade, e.complete, e.course_code, e.id]);
      },
      null
    );
  };

  update(e: Evaluation): void {
    // use find() to find the course
    // compare the two
    // update
  };

  delete(e: Evaluation): void {
    if (!e.id) {
      return
    }

    this.db.transaction(
      tx => {
        tx.executeSql("delete from Evaluation where id=?", [e.id]);
      },
      null
    );
  };

  all(): Promise<Evaluation[]> {
    return new Promise((resolve) => {
      const eval_objs = []
      this.db.transaction(tx => {
        tx.executeSql("select * from Evaluation", [], (_, { rows: { _array } }) => {
          _array.forEach(evaluation => {
              eval_objs.push(new Evaluation(evaluation.title, evaluation.due_date, evaluation.weight, evaluation.course_code, evaluation.complete, evaluation.grade, evaluation.id))
          })
          resolve(eval_objs)
        })
      })
    })
  };

  find(id: number): Promise<Evaluation> {
    return new Promise((resolve) => {
      this.db.transaction(tx => {
        tx.executeSql("select * from Evaluation where id = ?", [id], (_, { rows: { _array } }) => {
            const evaluation: Evaluation = new Evaluation(_array[0].title, _array[0].due_date, _array[0].weight, _array[0].course_code, _array[0].complete, _array[0].grade, _array[0].id)
            resolve(evaluation)
        })
      })
    })
  };

  findByCourse(code: string): Promise<Evaluation[]> {
    return new Promise((resolve) => {
      const eval_objs = []
      this.db.transaction(tx => {
        tx.executeSql("select * from Evaluation where course_code = ?", [code], (_, { rows: { _array } }) => {
          _array.forEach(evaluation => {
              eval_objs.push(new Evaluation(evaluation.title, evaluation.due_date, evaluation.weight, evaluation.course_code, evaluation.complete, evaluation.grade, evaluation.id))
          })
          resolve(eval_objs)
        })
      })
    })
  }

  createTable(): void {
    this.db.transaction(tx => {
      tx.executeSql("create table if not exists Evaluation (id integer primary key, title text not null, due_date text not null, weight number not null, grade float default 0, complete boolean default 0, course_code text not null, foreign key(course_code) references Course(code), check (weight >= 0 & weight <= 100), check (grade >= 0))")
    })
  }
}
