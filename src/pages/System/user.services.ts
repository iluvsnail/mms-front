import { message } from "antd";
import api from "../../configs/api";
import { AsyncCallback } from "../../models/common";
import { IUser } from "../../models/user";
import YSAxios, { callback } from "../../utils/YSAxios";

export const asyncGetUserData = async (cb: AsyncCallback) => {
  const res = await YSAxios.post(api.userList).catch((e) => {
    message.error(e.message);
    return e;
  });
  callback(res, cb, []);
};
export const asyncGetRoleData = async (cb: AsyncCallback) => {
  const res = await YSAxios.post(api.roleList).catch((e) => {
    message.error(e.message);
    return e;
  });
  callback(res, cb, []);
};
export const asyncPostDemo = async (data: IUser, cb: AsyncCallback) => {
  const res = await YSAxios.post(api.demo, data).catch((e) => {
    message.error(e.message);
    return e;
  });
  callback(res, cb, {});
};

export const asyncPutDemo = async (data: IUser, cb: AsyncCallback) => {
  const res = await YSAxios.put(`${api.user}/${data.userName}`, data).catch((e) => {
    message.error(e.message);
    return e;
  });
  callback(res, cb, data);
};

export const asyncDelUser = async (data: IUser, cb: AsyncCallback) => {
  const res = await YSAxios.delete(`${api.user}/${data.userName}`).catch((e) => {
    message.error(e.message);
    return e;
  });
  callback(res, cb);
};
