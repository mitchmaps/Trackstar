import Course from "../models/Course";

export interface CourseMapper {
  insert(course: Course): void;
  update(course: Course): void;
  delete(course: Course): void;
  all(): Course[];
  find(): Course;
}
