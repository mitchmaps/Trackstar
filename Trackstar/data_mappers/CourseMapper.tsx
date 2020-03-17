import Course from "../models/Course";

export default interface CourseMapper {
  insert(c: Course): void;
  update(c: Course): void;
  delete(c: Course): void;
  all(): Promise<Course[]>;
  find(c: string): Promise<Course>;
}
