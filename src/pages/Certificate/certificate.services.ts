import { message } from "antd";
import api from "../../configs/api";
import { AsyncCallback } from "../../models/common";
import YSAxios, { callback } from "../../utils/YSAxios";
import {ICertificate} from "../../models/certificate";
import {BASE_URL} from "../../utils/apiUtils";

export const asyncGetCertificateData = async (cb: AsyncCallback, data?:Record<string, unknown>) => {
  const res = await YSAxios.post(api.certificateList,data).catch((e) => {
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
export const asyncPostDemo = async (data: ICertificate, cb: AsyncCallback) => {
  const res = await YSAxios.post(api.demo, data).catch((e) => {
    message.error(e.message);
    return e;
  });
  callback(res, cb, {});
};

export const asyncPutDevice = async (data: ICertificate, cb: AsyncCallback) => {
  const res = await YSAxios.put(`${api.device}`, data).catch((e) => {
    message.error(e.message);
    return e;
  });
  callback(res, cb, data);
};

export const asyncDelDevice = async (data: ICertificate, cb: AsyncCallback) => {
  const res = await YSAxios.delete(`${api.device}/${data.id}`).catch((e) => {
    message.error(e.message);
    return e;
  });
  callback(res, cb);
};
export const asyncResetPassword = async (data: ICertificate, cb: AsyncCallback) => {
  const res = await YSAxios.delete(`${api.user}/resetPassword/${data.id}`).catch((e) => {
    message.error(e.message);
    return e;
  });
  callback(res, cb);
};
export const asyncLockUser = async (data: ICertificate, cb: AsyncCallback) => {
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
export const asyncExportCertificates =  (data: string[]) => {
  const url = `${BASE_URL}/${api.certificate}/exportCertificates?certificates=${data}`;
  let link = document.createElement('a');
  link.style.display = 'none';
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
