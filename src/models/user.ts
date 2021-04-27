import { IsLock } from "./dict";
import {IRole} from "./role";


export interface IUser {
  userName: string;
  name: string;
  department:string;
  isDelete:string;
  password:string;
  position:string;
  special:string;
  isLock: IsLock;
  role:IRole;
  createDate: number;
  updateDate: number;
}
