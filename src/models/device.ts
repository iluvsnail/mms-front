import {ICodecriterion} from "./codecriterion";
import {Dayjs} from "dayjs";

export interface IDevice {
  id:string;
  createDate: number;
  deviceName:string;
  dutyPerson:string;
  dutyUnit:string;
  factoryNumber:string;
  isDelete:string;
  lastAuthenticationDate:any;
  lastAuthenticationInstitution:string;
  location:string;
  manufacturer:string;
  notes:string;
  standardType:string;
  status:string;
  updateDate: number;
  validDate: any;
  verifier:string;
  criterion:ICodecriterion;
  deviceType:string;
  institution:string;
  offset:number;
}
