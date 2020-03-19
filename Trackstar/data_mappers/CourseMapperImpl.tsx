import CourseMapper from "./CourseMapper";
import {Course} from "../models";
import DBConnection from "../DBConnection";


export default class CourseMapperImpl implements CourseMapper {
  db = DBConnection.open()

  constructor() {
    this.createTable()
  }

  insert(c: Course): void {
    this.db.transaction(
      tx => {
        tx.executeSql("insert into Course (code, title, min_grade) values (?, ?, ?)", [c.code, c.title, c.min_grade], null, this.errorHandler);
      },
      null
    );
  };

  update(c: Course): void {
    this.db.transaction(
      tx => {
        tx.executeSql("update Course set title=?, min_grade=?, grade=?, complete=? where code=?", [c.title, c.min_grade, c.grade, c.complete, c.code], null, this.errorHandler);
      },
      null
    );
  };

  delete(c: Course): void {
    this.db.transaction(
      tx => {
        tx.executeSql("delete from Course where code=?", [c.code], null, this.errorHandler);
      },
      null
    );
  };

  all(): Promise<Course[]> {
    return new Promise((resolve) => {
      const course_objs = []
      this.db.transaction(tx => {
        tx.executeSql("select * from Course", [],
          (_, { rows: { _array } }) => {
            _array.forEach(course => {
              course_objs.push(new Course(course.title, course.code, course.min_grade, course.grade, course.complete))
            })
            resolve(course_objs)
          },
          this.errorHandler
        )
      })
    })
  };

  find(c: string): Promise<Course> {
    return new Promise((resolve) => {
      this.db.transaction(tx => {
        tx.executeSql("select * from Course where code = ?", [c],
        (_, { rows: { _array } }) => {
            const course: Course = new Course(_array[0].title, _array[0].code, _array[0].min_grade, _array[0].grade, _array[0].complete)
            resolve(course)
        }),
        this.errorHandler
      })
    })
  };

  private createTable(): void {
    this.db.transaction(tx => {
      tx.executeSql("create table if not exists Course (code text primary key not null, title text not null, min_grade float check (min_grade >= 0) check (min_grade <= 100) not null, grade float default 0 check (grade >= 0), complete boolean default 0)")
    })
  }

  private errorHandler(transaction, error): boolean {
    console.log(error);
    return true
  }
}
