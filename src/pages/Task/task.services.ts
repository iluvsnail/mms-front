import { message } from "antd";
import api from "../../configs/api";
import { AsyncCallback } from "../../models/common";
import YSAxios, { callback } from "../../utils/YSAxios";
import {ITask} from "../../models/task";
import {BASE_URL} from "../../utils/apiUtils";

export const asyncGetTaskData = async (cb: AsyncCallback, data?:Record<string, unknown>) => {
  const res = await YSAxios.post(api.taskList,data).catch((e) => {
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

export const asyncPutTask = async (data: ITask, cb: AsyncCallback) => {
  const res = await YSAxios.put(`${api.task}`, data).catch((e) => {
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
export const asyncFinishTask = async (data: ITask, cb: AsyncCallback) => {
  const res = await YSAxios.post(`${api.task}/finish/${data.id}`).catch((e) => {
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
export const asyncFinishTasks = async (data: string[], cb: AsyncCallback) => {
  const res = await YSAxios.post(`${api.task}/batch/finish`,data).catch((e) => {
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
export const asyncExportTasks =  (data: string[]) => {
  const url = `${BASE_URL}/${api.task}/exportTasks?tasks=${data}`;
  console.log(url)
  let link = document.createElement('a');
  link.style.display = 'none';
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
export const asyncSaveCriterions = async (data: string[],id:string, cb: AsyncCallback) => {
  const res = await YSAxios.post(`${api.task}/${id}/criterions/save`,data).catch((e) => {
    message.error(e.message);
    return e;
  });
  callback(res, cb);
};
export const asyncBatchRevoke = async (data: string[], cb: AsyncCallback) => {
  const res = await YSAxios.post(`${api.task}/device/batch/revoke`,data).catch((e) => {
    message.error(e.message);
    return e;
  });
  callback(res, cb);
};
