import Evaluation from "../models/Evaluation";

export interface EvaluationMapper {
  insert(evaltn: Evaluation): void;
  update(evaltn: Evaluation): void;
  delete(evaltn: Evaluation): void;
  all(): Evaluation[];
  find(): Evaluation;
  findByCourse(courseID: number): Evaluation[];
}
