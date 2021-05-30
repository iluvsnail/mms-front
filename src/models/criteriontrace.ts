import {ICriterion} from "./criterion";

export interface ICriterionTrace {
  id:string;
  criterion?:ICriterion;
  fileName:string;
  institution:string;
  createDate: number;
  isDelete:string;
  notes:string;
  traceDate:number;
  traceUnit:string;
  updateDate: number;
}
