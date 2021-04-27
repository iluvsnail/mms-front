/**
 * useSWR demo
 * 公共列表可使用useSWR实现
 */
import useSWR from "swr";
import api from "../configs/api";
import { IDemo } from "../models/demo";
import YSAxios from "../utils/YSAxios";

const useDemoData = (params?: Record<string, unknown>) => {
  const { data, error } = useSWR<IDemo[]>(api.demo, (url) =>
    YSAxios.get(url, { params }).then((res) => res.data)
  );

  return {
    data,
    error,
    isLoading: !error && !data,
  };
};

export default useDemoData;
