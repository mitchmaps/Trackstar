import {GradeInfo} from "../components/GradeInfo";

//setting up a mapper for the GradeInfo
//what is it mapping? Should I make a Grade in the model folder
//Maybe it should be in model to match formatting instead of going into GradeInfo in components

export default interface GradeMapper {
  insert(c: GradeInfo): void;
  update(c: GradeInfo): void;
  delete(c: GradeInfo): void;
  all(): Promise<GradeInfo[]>;
  find(c: string): Promise<GradeInfo>;
}
