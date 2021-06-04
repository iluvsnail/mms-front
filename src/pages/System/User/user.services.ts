import { message } from "antd";
import api from "../../../configs/api";
import { AsyncCallback } from "../../../models/common";
import { IUser } from "../../../models/user";
import YSAxios, { callback } from "../../../utils/YSAxios";
export const asyncGetUserData = async (cb: AsyncCallback,data?:Record<string, unknown>) => {
  const res = await YSAxios.post(api.userList,data).catch((e) => {
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

export const asyncPutUser = async (data: IUser, cb: AsyncCallback) => {
  data.role={createDate: 0, id: String(data.role), isDelete: "", isLock: 0, name: "", note: "", updateDate: 0}
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
export const asyncResetPassword = async (data: IUser, cb: AsyncCallback) => {
  const res = await YSAxios.post(`${api.user}/resetPassword/${data.userName}`).catch((e) => {
    message.error(e.message);
    return e;
  });
  callback(res, cb);
};
export const asyncLockUser = async (data: IUser, cb: AsyncCallback) => {
  const res = await YSAxios.post(`${api.user}/lock/${data.userName}`).catch((e) => {
    message.error(e.message);
    return e;
  });
  callback(res, cb);
};
export const asyncUnlockUser = async (data: IUser, cb: AsyncCallback) => {
  const res = await YSAxios.post(`${api.user}/unlock/${data.userName}`).catch((e) => {
    message.error(e.message);
    return e;
  });
  callback(res, cb);
};
export const asyncDelUsers = async (data: string[], cb: AsyncCallback) => {
  const res = await YSAxios.post(`${api.user}/users/delete`,data).catch((e) => {
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
export const asyncUnlockUsers = async (data: string[], cb: AsyncCallback) => {
  const res = await YSAxios.post(`${api.user}/users/unlock`,data).catch((e) => {
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

export const asyncLogin = async (data:any, cb: AsyncCallback) => {
  const res = await YSAxios.post(`${api.login}`,data).catch((e) => {
    message.error(e.message);
    return e;
  });
  callback(res, cb);
};
export const asyncChangePassword = async (data: any, cb: AsyncCallback) => {
  const res = await YSAxios.post(`${api.user}/changePassword`, data).catch((e) => {
    message.error(e.message);
    return e;
  });
  callback(res, cb, data);
};
