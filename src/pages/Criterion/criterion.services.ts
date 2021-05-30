import { message } from "antd";
import api from "../../configs/api";
import { AsyncCallback } from "../../models/common";
import YSAxios, { callback } from "../../utils/YSAxios";
import {ICriterion} from "../../models/criterion";
import {IDevice} from "../../models/device";
import {BASE_URL} from "../../utils/apiUtils";

export const asyncGetCriterionData = async (cb: AsyncCallback, data?:Record<string, unknown>) => {
  const res = await YSAxios.post(api.criterionList,data).catch((e) => {
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

export const asyncPutCriterion = async (data: ICriterion, cb: AsyncCallback) => {
  if(!data.criterion.id)data.criterion={criterionName: "", id: String(data.criterion)}
  const res = await YSAxios.put(`${api.criterion}`, data).catch((e) => {
    message.error(e.message);
    return e;
  });
  callback(res, cb, data);
};

export const asyncDelCriterion = async (data: ICriterion, cb: AsyncCallback) => {
  const res = await YSAxios.delete(`${api.criterion}/${data.id}`).catch((e) => {
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
export const asyncGetTraceRecord = async (data: ICriterion, cb: AsyncCallback) => {
  const res = await YSAxios.post(`${api.criterion}/${data.id}/record/list`).catch((e) => {
    message.error(e.message);
    return e;
  });
  callback(res, cb);
};
export const asyncUpdateTrace = async (data: any, cb: AsyncCallback) => {
  const res = await YSAxios.post(`${api.criterion}/trace/update`, data).catch((e) => {
    message.error(e.message);
    return e;
  });
  callback(res, cb, data);
};
export const asyncExportCriterions =  (data: string[]) => {
  const url = `${BASE_URL}/${api.criterion}/exportCriterions?criterions=${data}`;
  let link = document.createElement('a');
  link.style.display = 'none';
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
