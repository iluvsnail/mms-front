import { message } from "antd";
import api from "../../../configs/api";
import { AsyncCallback } from "../../../models/common";
import { IUser } from "../../../models/user";
import YSAxios, { callback } from "../../../utils/YSAxios";
import {BASE_URL} from "../../../utils/apiUtils";

export const asyncbackup =  () => {
  const url = `${BASE_URL}/${api.data}/backup`;
  let link = document.createElement('a');
  link.style.display = 'none';
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const asyncData = async (fn:Function, cb: AsyncCallback) => {
  const res = await YSAxios.post(`${api.data}/async`).catch((e) => {
    message.error(e.message);
    fn(false)
    return e;
  });
  callback(res, cb);
};
