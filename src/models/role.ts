import {IsLock} from "./dict";
export interface IRole {
  id: string;
  name: string;
  isDelete:string;
  createDate: number;
  updateDate: number;
  note:string;
  isLock:IsLock;
}
