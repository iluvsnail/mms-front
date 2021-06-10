import { message } from "antd";
import api from "../../../configs/api";
import { AsyncCallback } from "../../../models/common";
import YSAxios, { callback } from "../../../utils/YSAxios";
import {ITask} from "../../../models/task";
import {ITaskDevice} from "../../../models/taskdevice";
import {IDeviceType} from "../../../models/devicetype";
import {BASE_URL} from "../../../utils/apiUtils";

export const asyncGetCriterionData = async (cb: AsyncCallback, data?:Record<string, unknown>) => {
  const res = await YSAxios.post(api.criterionList,data).catch((e) => {
    message.error(e.message);
    return e;
  });
  callback(res, cb, []);
};
export const asyncGetSelectedData = async (id:string,cb: AsyncCallback, data?:Record<string, unknown>) => {
  const res = await YSAxios.post(`${api.task}/${id}/criterion/selected`,data).catch((e) => {
    message.error(e.message);
    return e;
  });
  callback(res, cb, []);
};
export const asyncGetTaskDeviceData = async (taskId:string,cb: AsyncCallback, data?:Record<string, unknown>) => {
  const res = await YSAxios.post(`${api.task}/${taskId}/device`,data).catch((e) => {
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
export const asyncPostDemo = async (data: ITask, cb: AsyncCallback) => {
  const res = await YSAxios.post(api.demo, data).catch((e) => {
    message.error(e.message);
    return e;
  });
  callback(res, cb, {});
};

export const asyncPutTaskDevice = async (data: ITaskDevice, cb: AsyncCallback) => {
  const res = await YSAxios.put(`${api.task}/device`, data).catch((e) => {
    message.error(e.message);
    return e;
  });
  callback(res, cb, data);
};

export const asyncBatchReceiveTaskDevice = async (data: ITaskDevice, cb: AsyncCallback) => {
  const res = await YSAxios.post(`${api.task}/device/batch/received`, data).catch((e) => {
    message.error(e.message);
    return e;
  });
  callback(res, cb, data);
};
export const asyncBatchSendTaskDevice = async (data: ITaskDevice, cb: AsyncCallback) => {
  const res = await YSAxios.post(`${api.task}/device/batch/send`, data).catch((e) => {
    message.error(e.message);
    return e;
  });
  callback(res, cb, data);
};
export const asyncBatchUploadTaskDevice = async (data: ITaskDevice, cb: AsyncCallback) => {
  const res = await YSAxios.post(`${api.task}/device/batch/upload`, data).catch((e) => {
    message.error(e.message);
    return e;
  });
  callback(res, cb, data);
};
export const asyncDelTask = async (data: ITask, cb: AsyncCallback) => {
  const res = await YSAxios.delete(`${api.task}/${data.id}`).catch((e) => {
    message.error(e.message);
    return e;
  });
  callback(res, cb);
};
export const asyncResetPassword = async (data: ITask, cb: AsyncCallback) => {
  const res = await YSAxios.delete(`${api.user}/resetPassword/${data.id}`).catch((e) => {
    message.error(e.message);
    return e;
  });
  callback(res, cb);
};
export const asyncLockUser = async (data: ITask, cb: AsyncCallback) => {
  const res = await YSAxios.delete(`${api.user}/lock/${data.id}`).catch((e) => {
    message.error(e.message);
    return e;
  });
  callback(res, cb);
};
export const asyncDelTasks = async (data: string[], cb: AsyncCallback) => {
  const res = await YSAxios.post(`${api.task}/batch/delete`,data).catch((e) => {
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
export const asyncDownloadTemplate =  (itm:ITaskDevice) => {
    const url = `${BASE_URL}/${api.task}/device/downloadTemplate/${itm.id}`;
    let link = document.createElement('a');
    link.style.display = 'none';
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
export const asyncFkPrintItem = async (data: ITaskDevice, cb: AsyncCallback) => {
  const res = await YSAxios.post(`${api.task}/img/${data.id}`).catch((e) => {
    message.error(e.message);
    return e;
  });
  callback(res, cb, data);
};
export const asyncGetFiles = async (cb: AsyncCallback, data?:Record<string, unknown>) => {
  const res = await YSAxios.post(`${api.task}/files`,data).catch((e) => {
    message.error(e.message);
    return e;
  });
  callback(res, cb, []);
};
