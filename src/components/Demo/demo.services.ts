import { message } from "antd";
import api from "../../configs/api";
import { AsyncCallback } from "../../models/common";
import { IDemo } from "../../models/demo";
import YSAxios, { callback } from "../../utils/YSAxios";

export const asyncGetDemoData = async (cb: AsyncCallback) => {
  const res = await YSAxios.get(api.demo).catch((e) => {
    message.error(e.message);
    return e;
  });
  callback(res, cb, []);
};

export const asyncPostDemo = async (data: IDemo, cb: AsyncCallback) => {
  const res = await YSAxios.post(api.demo, data).catch((e) => {
    message.error(e.message);
    return e;
  });
  callback(res, cb, {});
};

export const asyncPutDemo = async (data: IDemo, cb: AsyncCallback) => {
  const res = await YSAxios.put(`${api.demo}/${data.id}`, data).catch((e) => {
    message.error(e.message);
    return e;
  });
  callback(res, cb, data);
};

export const asyncDelDemo = async (data: IDemo, cb: AsyncCallback) => {
  const res = await YSAxios.delete(`${api.demo}/${data.id}`).catch((e) => {
    message.error(e.message);
    return e;
  });
  callback(res, cb);
};
