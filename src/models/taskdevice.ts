import {ITask} from "./task";
import {IDevice} from "./device";

export interface ITaskDevice {
  id:string;
  task?:ITask;
  device:IDevice;
  createDate: number;
  isDelete:string;
  updateDate: number;
  receivedDate:any;
  sendDetectedPerson:string;
  receivedPerson:string;
  status:string;
  detectedDate:any;
  detectedPerson:string;
  sendDate:any;
  sendPerson:string;
  endPerson:string;
  validDate:any;
  result?:string;
  ys?:Array<String>;
  fileName:string;
  template?:[];
  template2?:[];
}
