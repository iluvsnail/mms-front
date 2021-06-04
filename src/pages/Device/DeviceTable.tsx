import dayjs from "dayjs";
import {FC, useMemo, useState} from "react";
import { useTranslation } from "react-i18next";
import YSTable from "../../components/YSTable";
import { DateTimeFormatString } from "../../constants/strings";
import { Button, Popconfirm } from "antd";
import {IsLock, LockList} from "../../models/dict";
import {IRole} from "../../models/role";
import {IDevice} from "../../models/device";
import {ICodecriterion} from "../../models/codecriterion";
import {isAdmin} from "../../utils/tokenUtils";

interface Props {
  data: IDevice[];
  its:string[];
  loading: boolean;
  onAdd: () => void;
    onDetail: (item: IDevice) => void;
  onBatchDel:(its:string[])=>void;
    onBatchPrint:(its:string[])=>void;
    onBatchImport:(its:string[])=>void;
    onBatchExport:(its:string[])=>void;
  onEdit: (item: IDevice) => void;
  onDel: (item: IDevice) => void;
    onRecord: (item: IDevice) => void;
  onPrint: (item: IDevice) => void;
  onRefresh: () => void;
  setSelectedRows:(its:string[])=>void;
  importUrl:string;
}

const DeviceTable: FC<Props> = ({
  data,
    its,
  loading,
  onAdd,
    onDetail,
                                    onBatchPrint,
    onBatchExport,
    onBatchImport,
  onBatchDel,
  onEdit,
  onDel,
    onPrint,
  onRefresh,
    setSelectedRows,
    onRecord,
    importUrl
}) => {
  const { t } = useTranslation(["device", "common", "dict"]);
    const onSelectChange = function (selectedRowKeys:any){
        setSelectedRows(selectedRowKeys)
    };
  const columns = useMemo(
    () => [
      {
        title: t("deviceName"),
        dataIndex: "deviceName",
        sorter: (a: IDevice, b: IDevice) => a.deviceName.localeCompare(b.deviceName),
      },{
            title: t("criterionName"),
            dataIndex: "criterion",
            sorter: (a: IDevice, b: IDevice) => a.criterion.criterionName.localeCompare(b.criterion.criterionName),
            render: (v:ICodecriterion) => v.criterionName
        },{
            title: t("factoryNumber"),
            dataIndex: "factoryNumber",
            sorter: (a: IDevice, b: IDevice) => a.factoryNumber.localeCompare(b.factoryNumber),
        },{
            title: t("lastAuthenticationDate"),
            dataIndex: "lastAuthenticationDate",
            sorter: (a: IDevice, b: IDevice) => a.factoryNumber.localeCompare(b.factoryNumber),
        },{
            title: t("dutyUnit"),
            dataIndex: "dutyUnit",
            sorter: (a: IDevice, b: IDevice) => a.dutyUnit.localeCompare(b.dutyUnit),
        },{
            title: t("dutyPerson"),
            dataIndex: "dutyPerson",
            sorter: (a: IDevice, b: IDevice) => a.dutyPerson.localeCompare(b.dutyPerson),
        },
      {
        title: t("common:operations"),
        dataIndex: "OPERATIONS",
        render: (v: unknown, r: IDevice) => (
          <>
              {isAdmin()?(<Button
                  size="small"
                  onClick={() => onEdit(r)}
                  title={t("common:edit")}
                  type="link"
              >
                  {t("common:edit")}
              </Button>):""}

              <Button
                  size="small"
                  onClick={() => onDetail(r)}
                  title={t("common:detail")}
                  type="link"
              >
                  {t("common:detail")}
              </Button>
              {
                  isAdmin()?(<Button
                  size="small"
                  onClick={() => onRecord(r)}
                  title={t("device:record")}
                  type="link"
              >
                  {t("device:record")}
              </Button>):""}
              {
                  isAdmin()?(
                      <>
                      <Popconfirm
                      onConfirm={() => onDel(r)}
                      title={t("common:confirmDelete")}
                  >
                      <Button size="small" title={t("common:delete")} type="link">
                          {t("common:delete")}
                      </Button>
                  </Popconfirm>

              <Button
                  size="small"
                  onClick={() => onPrint(r)}
                  title={t("device:printLabel")}
                  type="link"
              >
                  {t("device:printLabel")}
              </Button></>
                  ):""}
          </>
        ),
      },
    ],
    [t, onEdit, onDel]
  );

  return (
    <YSTable
      rowKey="id"
      dataSource={data}
      loading={loading}
      rowSelection={{
          type: "checkbox",
          onChange:onSelectChange
      }}
      columns={columns}
      tableTitle={t("table.title")}
      onAdd={onAdd}
      onBatchDel={onBatchDel}
      onBatchPrint={onBatchPrint}
      onBatchImport={onBatchImport}
      onBatchExport={onBatchExport}
      onRefresh={onRefresh}
      its={its}
      isAdmin={isAdmin()}
      importUrl={importUrl}
    />
  );
};

export default DeviceTable;
