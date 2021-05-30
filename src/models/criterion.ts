import {ICodecriterion} from "./codecriterion";

export interface ICriterion {
  id:string;
  certificateNumber:string;
  createDate: number;
  criterionName:string;
  dutyPerson:string;
  dutyUnit:string;
  factoryNumber:string;
  instrumentName:string;
  isDelete:string;
  lastTracingDate:any;
  lastTracingUnit:string;
  location:string;
  manufacturer:string;
  notes:string;
  standardType:string;
  status:string;
  updateDate: number;
  criterion:ICodecriterion;
  institution:string;
}
