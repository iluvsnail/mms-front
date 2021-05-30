import { message } from "antd";
import api from "../../../configs/api";
import { AsyncCallback } from "../../../models/common";
import YSAxios, { callback } from "../../../utils/YSAxios";
import {ICriterion} from "../../../models/criterion";
import {IDeviceType} from "../../../models/devicetype";
import {IInstitution} from "../../../models/institution";

export const asyncGetInstitutionData = async (cb: AsyncCallback, data?:Record<string, unknown>) => {
  const res = await YSAxios.post(api.institutionList,data).catch((e) => {
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

export const asyncPutInstitution = async (data: IInstitution, cb: AsyncCallback) => {
  const res = await YSAxios.put(`${api.institution}`, data).catch((e) => {
    message.error(e.message);
    return e;
  });
  callback(res, cb, data);
};

export const asyncDelInstitution = async (data: IInstitution, cb: AsyncCallback) => {
  const res = await YSAxios.delete(`${api.institution}/${data.id}`).catch((e) => {
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
