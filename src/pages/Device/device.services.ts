import { message } from "antd";
import api from "../../configs/api";
import { AsyncCallback } from "../../models/common";
import YSAxios, { callback } from "../../utils/YSAxios";
import {IDevice} from "../../models/device";
import {BASE_URL} from "../../utils/apiUtils";
import {ICertificate} from "../../models/certificate";
import {ITaskDevice} from "../../models/taskdevice";

export const asyncGetDeviceData = async (cb: AsyncCallback, data?:Record<string, unknown>) => {
  const res = await YSAxios.post(api.deviceList,data).catch((e) => {
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
export const asyncGetDeviceCodeData = async (cb: AsyncCallback) => {
  const res = await YSAxios.post(`${api.device}/codes`).catch((e) => {
    message.error(e.message);
    return e;
  });
  callback(res, cb, []);
};
export const asyncGetInstitutionCodeData = async (cb: AsyncCallback) => {
  const res = await YSAxios.post(`${api.institution}/codes`).catch((e) => {
    message.error(e.message);
    return e;
  });
  callback(res, cb, []);
};
export const asyncPostDemo = async (data: IDevice, cb: AsyncCallback) => {
  const res = await YSAxios.post(api.demo, data).catch((e) => {
    message.error(e.message);
    return e;
  });
  callback(res, cb, {});
};

export const asyncPutDevice = async (data: IDevice, cb: AsyncCallback) => {
  if(!data.criterion.id)data.criterion={criterionName: "", id: String(data.criterion)}
  const res = await YSAxios.put(`${api.device}`, data).catch((e) => {
    message.error(e.message);
    return e;
  });
  callback(res, cb, data);
};
export const asyncPrintItem = async (data: IDevice, cb: AsyncCallback) => {
  const res = await YSAxios.post(`${api.device}/${data.id}`).catch((e) => {
    message.error(e.message);
    return e;
  });
  callback(res, cb, data);
};

export const asyncDelDevice = async (data: IDevice, cb: AsyncCallback) => {
  const res = await YSAxios.delete(`${api.device}/${data.id}`).catch((e) => {
    message.error(e.message);
    return e;
  });
  callback(res, cb);
};
export const asyncGetDeviceRecord = async (data: IDevice, cb: AsyncCallback) => {
  const res = await YSAxios.post(`${api.device}/${data.id}/record/list`).catch((e) => {
    message.error(e.message);
    return e;
  });
  callback(res, cb);
};
export const asyncResetPassword = async (data: IDevice, cb: AsyncCallback) => {
  const res = await YSAxios.delete(`${api.user}/resetPassword/${data.id}`).catch((e) => {
    message.error(e.message);
    return e;
  });
  callback(res, cb);
};
export const asyncLockUser = async (data: IDevice, cb: AsyncCallback) => {
  const res = await YSAxios.delete(`${api.user}/lock/${data.id}`).catch((e) => {
    message.error(e.message);
    return e;
  });
  callback(res, cb);
};
export const asyncDelDevices = async (data: string[], cb: AsyncCallback) => {
  const res = await YSAxios.post(`${api.device}/batch/delete`,data).catch((e) => {
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
export const asyncExportDevices =  (data: string[]) => {
  const url = `${BASE_URL}/${api.device}/exportDevices?devices=${data}`;
  let link = document.createElement('a');
  link.style.display = 'none';
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const asyncGetAlarmData = async (cb: AsyncCallback, data?:Record<string, unknown>) => {
  const res = await YSAxios.post(`${api.device}/alarm`,data).catch((e) => {
    message.error(e.message);
    return e;
  });
  callback(res, cb, []);
};

export const asyncPrintTaskDevice = async (data: ITaskDevice, cb: AsyncCallback) => {
  const res = await YSAxios.post(`${api.device}/taskdevice/${data.id}`).catch((e) => {
    message.error(e.message);
    return e;
  });
  callback(res, cb, data);
};
export const asyncPrintItems = async (data: string[], cb: AsyncCallback) => {
  const res = await YSAxios.post(`${api.device}/batch/items`,data).catch((e) => {
    message.error(e.message);
    return e;
  });
  callback(res, cb, data);
};
