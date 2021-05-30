import { message } from "antd";
import api from "../../../configs/api";
import { AsyncCallback } from "../../../models/common";
import YSAxios, { callback } from "../../../utils/YSAxios";
import {ICriterion} from "../../../models/criterion";
import {IDeviceType} from "../../../models/devicetype";
import {BASE_URL} from "../../../utils/apiUtils";

export const asyncGetDeviceTypeData = async (cb: AsyncCallback, data?:Record<string, unknown>) => {
  const res = await YSAxios.post(api.deviceTypeList,data).catch((e) => {
    message.error(e.message);
    return e;
  });
  callback(res, cb, []);
};
export const asyncGetCodeData = async (cb: AsyncCallback) => {
  const res = await YSAxios.post(`${api.criterion}/codes`).catch((e) => {
    message.error(e.message);
    return e;
  });
  callback(res, cb, []);
};
export const asyncPostDemo = async (data: ICriterion, cb: AsyncCallback) => {
  const res = await YSAxios.post(api.demo, data).catch((e) => {
    message.error(e.message);
    return e;
  });
  callback(res, cb, {});
};

export const asyncPutDeviceType = async (data: IDeviceType, cb: AsyncCallback) => {
  const res = await YSAxios.put(`${api.deviceType}`, data).catch((e) => {
    message.error(e.message);
    return e;
  });
  callback(res, cb, data);
};

export const asyncDelDeviceType = async (data: IDeviceType, cb: AsyncCallback) => {
  const res = await YSAxios.delete(`${api.deviceType}/${data.id}`).catch((e) => {
    message.error(e.message);
    return e;
  });
  callback(res, cb);
};
export const asyncResetPassword = async (data: ICriterion, cb: AsyncCallback) => {
  const res = await YSAxios.delete(`${api.user}/resetPassword/${data.id}`).catch((e) => {
    message.error(e.message);
    return e;
  });
  callback(res, cb);
};
export const asyncLockUser = async (data: ICriterion, cb: AsyncCallback) => {
  const res = await YSAxios.delete(`${api.user}/lock/${data.id}`).catch((e) => {
    message.error(e.message);
    return e;
  });
  callback(res, cb);
};
export const asyncDelCriterions = async (data: string[], cb: AsyncCallback) => {
  const res = await YSAxios.post(`${api.criterion}/batch/delete`,data).catch((e) => {
    message.error(e.message);
    return e;
  });
  callback(res, cb);
};
export const asyncLockUsers = async (data: string[], cb: AsyncCallback) => {
  const res = await YSAxios.post(`${api.user}/users/lock`,data).catch((e) => {
    message.error(e.message);
    return e;
  });
  callback(res, cb);
};
export const asyncResetUsersPassword = async (data: string[], cb: AsyncCallback) => {
  const res = await YSAxios.post(`${api.user}/users/resetPassword`,data).catch((e) => {
    message.error(e.message);
    return e;
  });
  callback(res, cb);
};

export const asyncDownloadTemplate =  (itm?:IDeviceType) => {
  if(itm){
    const url = `${BASE_URL}/${api.deviceType}/downloadTemplate/${itm.id}`;
    let link = document.createElement('a');
    link.style.display = 'none';
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
