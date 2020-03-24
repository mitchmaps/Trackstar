import GradeInfo from "../components/GradeInfo";

//setting up a mapper for the GradeInfo
//what is it mapping? Should I make a Grade model?
//Maybe it should be a Grade model instead of going into GradeInfo

export default interface GradeMapper {
  insert(c: GradeInfo): void;
  update(c: GradeInfo): void;
  delete(c: GradeInfo): void;
  all(): Promise<GradeInfo[]>;
  find(c: string): Promise<GradeInfo>;
}
