import dayjs from "dayjs";
import {FC, useMemo, useState} from "react";
import { useTranslation } from "react-i18next";
import YSTable from "../../../components/YSTable";
import { DateTimeFormatString } from "../../../constants/strings";
import { Button, Popconfirm } from "antd";
import {IsLock, LockList} from "../../../models/dict";
import {IConfig} from "../../../models/config";
import {IRole} from "../../../models/role";

interface Props {
  data: IConfig[];
  its:string[];
  loading: boolean;
  onAdd: () => void;
  onBatchDel:(its:string[])=>void;
  onBatchLock:(its:string[])=>void;
  onBatchResetPassword:(its:string[])=>void;
  onEdit: (item: IConfig) => void;
  onRefresh: () => void;
  setSelectedRows:(its:string[])=>void;
}

const ConfigTable: FC<Props> = ({
  data,
    its,
  loading,
  onAdd,
  onBatchDel,
  onBatchLock,
  onBatchResetPassword,
  onEdit,
  onRefresh,
    setSelectedRows,
}) => {
  const { t } = useTranslation(["config", "common", "dict"]);
    const onSelectChange = function (selectedRowKeys:any){
        setSelectedRows(selectedRowKeys)
    };
  const columns = useMemo(
    () => [
      {
        title: t("nameCn"),
        dataIndex: "nameCn",
        sorter: (a: IConfig, b: IConfig) => a.nameCn.localeCompare(b.nameCn),
      },
        {
            title: t("v"),
            dataIndex: "v",
            sorter: (a: IConfig, b: IConfig) => a.v.localeCompare(b.v),
        },
      {
        title: t("common:operations"),
        dataIndex: "OPERATIONS",
        render: (v: unknown, r: IConfig) => (
          <>
            <Button
              size="small"
              onClick={() => onEdit(r)}
              title={t("common:edit")}
              type="link"
            >
              {t("common:edit")}
            </Button>
          </>
        ),
      },
    ],
    [t, onEdit]
  );

  return (
    <YSTable
      rowKey="id"
      dataSource={data}
      loading={loading}
      columns={columns}
      tableTitle={t("table.title")}
      onRefresh={onRefresh}
      its={its}
    />
  );
};

export default ConfigTable;
