import Evaluation from "../models/Evaluation";

export default interface EvaluationMapper {
  insert(evaltn: Evaluation): void;
  update(evaltn: Evaluation): void;
  delete(evaltn: Evaluation): void;
  all(): Promise<Evaluation[]>;
  find(id: number): Promise<Evaluation>;
  findByCourse(code: string): Promise<Evaluation[]>;
}
