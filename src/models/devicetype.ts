import {ICodecriterion} from "./codecriterion";

export interface IDeviceType {
  id:string;
  name:string;
  level:string;
  pt:string;
  criterion:ICodecriterion;
  standardType:string;
  cycle:string;
  isDelete:string;
  createDate: number;
  updateDate: number;
  ys?:Array<String>;
}
