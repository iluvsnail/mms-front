/**
 * 公共Interface/Type
 */

// 异步回调函数
export type AsyncCallback = (props: { isOk: boolean; data: any }) => void;

// 字典项
export type Dict = { id: string; name: string };
export type DictList = Dict[];
