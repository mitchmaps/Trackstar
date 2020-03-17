import { CourseMapper } from "./CourseMapper";
import Course from "../models/Course";
import DBConnection from "../DBConnection";


export default class CourseMapperImpl implements CourseMapper {

  db = DBConnection.open()
  foundCourse = null

  insert(c: Course): void {
    this.db.transaction(
      tx => {
        tx.executeSql("insert into Course (code, title, min_grade) values (?, ?, ?)", [c.code, c.title, c.min_grade]);
      },
      null
    );
  };

  update(c: Course): void {
    // use find() to find the course
    // compare the two
    // update
  };

  delete(c: Course): void {
    this.db.transaction(
      tx => {
        tx.executeSql("delete from Course where code=?", [c.code]);
      },
      null
    );
  };

  all(): Course[] {
    // new Promise((resolve) => {
    //     const course_objs = []
    //     this.db.transaction(tx => {
    //         tx.executeSql("select * from Course", [], (_, { rows: { _array } }) => {
    //             _array.forEach(course => {
    //                 course_objs.push(new Course(course.title, course.code, course.min_grade, course.grade, course.complete))
    //             })
    //             resolve(course_objs)
    //         })
    //     })
    // })
    return [];
  };

  find(c: string): Course {
    // let foundCourse: Course;
    // TODO: figure out call backs
    //  new Promise((resolve) => {
    this.foundCourse = null
    // this.db.transaction(tx => {
    //   tx.executeSql("select * from Course where code = ?", [c], (_, { rows: { _array } }) => {
    //     console.log(`in sql - ${_array[0].code}`)
    //     this.foundCourse = new Course(_array[0].title, _array[0].code, _array[0].min_grade, _array[0].grade, _array[0].complete)
    //   })
    // })

    console.log("hi")
    this.sleep(2000)
    console.log("bye")
    return new Course("test", "test", 90)
  };

   sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

  // check() {
  //   console.log(`inside check ${Date.now()}`)
  //   if (this.foundCourse) {
  //     return
  //   }
  //   else {
  //     setTimeout(this.check, 1000)
  //   }
  // }

  createTable(): void {
  // maybe call this from constructor
    this.db.transaction(tx => {
      // add not null to min_grade
      tx.executeSql("create table if not exists Course (code text primary key not null, title text not null, min_grade float check (min_grade >= 0) check (min_grade <= 100) not null, grade float default 0 check (grade >= 0), complete boolean default 0)")
    })
  }
}
