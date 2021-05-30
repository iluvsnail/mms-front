import {IDevice} from "./device";

export interface ICertificate {
  id:string;
  certificateNumber:string;
  createDate: number;
  entrustUnit:string;
  isDelete:string;
  notes:string;
  submitDate:number;
  updateDate:number;
  validDate:number;
  verifier:string;
  verifyDate:number;
  verifyResult:string;
  device:IDevice;
  taskDevice:string;
  ys?:Array<String>;
}
