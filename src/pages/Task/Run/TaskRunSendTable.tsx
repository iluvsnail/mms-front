import dayjs from "dayjs";
import {FC, useMemo, useState} from "react";
import { useTranslation } from "react-i18next";
import YSTable from "../../../components/YSTable";
import {ICriterion} from "../../../models/criterion";
import {ICodecriterion} from "../../../models/codecriterion";
import {IDevice} from "../../../models/device";
import {ITaskDevice} from "../../../models/taskdevice";
import {ITask} from "../../../models/task";
import {Button, message, Popconfirm} from "antd";

interface Props {
  data: ITaskDevice[];
  its:string[];
  loading: boolean;
  setSelectedRows:(its:string[])=>void;
    onShowAdded?:(v:boolean)=>void;
    onBatchReceived?:(its:string[])=>void;
    onBatchRevoke?:(its:string[])=>void;
    onBatchSend?:(its:string[])=>void;
    onScan?:()=>void;
    onRevoke:(item:ITaskDevice)=>void;
    onSend: (item: ITaskDevice)=> void;
    onEdit: (item: ITaskDevice)=> void;
}

const TaskRunSendTable: FC<Props> = ({
    data,
    its,
    loading,
    setSelectedRows,
    onShowAdded,
    onScan,
    onBatchRevoke,
    onBatchReceived,
    onRevoke,
    onSend,
    onEdit,
    onBatchSend
}) => {
  const { t } = useTranslation(["taskdevice","device","task","common", "dict"]);
    const onSelectChange = function (selectedRowKeys:any){
        setSelectedRows(selectedRowKeys)
    };
  const columns = useMemo(
      () => [
          {
              title: t("device:deviceName"),
              dataIndex: "device",
              sorter: (a: ITaskDevice, b: ITaskDevice) => a.device.deviceName.localeCompare(b.device.deviceName),
              render:(v:IDevice)=>v.deviceName,
          },{
              title: t("device:factoryNumber"),
              dataIndex: "device",
              sorter: (a: ITaskDevice, b: ITaskDevice) => a.device.factoryNumber.localeCompare(b.device.factoryNumber),
              render:(v:IDevice)=>v.factoryNumber
          },{
              title: t("status"),
              dataIndex: "status",
              sorter: (a: ITaskDevice, b: ITaskDevice) => a.status.localeCompare(b.status),
              render:(v:string)=>t(`status${v}`)
          },{
              title: t("detectedDate"),
              dataIndex: "detectedDate",
              sorter: (a: ITaskDevice, b: ITaskDevice) => a.detectedDate.toString().localeCompare(b.detectedDate.toString()),
          },{
              title: t("detectedPerson"),
              dataIndex: "detectedPerson",
              sorter: (a: ITaskDevice, b: ITaskDevice) => a.detectedPerson.localeCompare(b.detectedPerson),
          },{
              title: t("sendDate"),
              dataIndex: "sendDate",
              sorter: (a: ITaskDevice, b: ITaskDevice) => a.sendDate.toString().localeCompare(b.sendDate.toString()),
          },{
              title: t("sendPerson"),
              dataIndex: "sendPerson",
              sorter: (a: ITaskDevice, b: ITaskDevice) => a.sendPerson.localeCompare(b.sendPerson),
          },{
              title: t("endPerson"),
              dataIndex: "endPerson",
              sorter: (a: ITaskDevice, b: ITaskDevice) => a.endPerson.toString().localeCompare(b.endPerson.toString()),
          },
          {
              title: t("common:operations"),
              dataIndex: "OPERATIONS",
              render: (v: unknown, r: ITaskDevice) => (
                  <>
                      {r.status=='3' ?(
                          <Button
                              size="small"
                              onClick={() =>onEdit(r)}
                              title={t("common:edit")}
                              type="link"
                          >
                              {t("common:edit")}
                          </Button>):""}

                      {r.status=='3' ?(
                          <Popconfirm
                              onConfirm={() =>onRevoke(r)}
                              title={t("confirmRevoke")}
                          >
                              <Button size="small" title={t("revoke")} type="link">
                                  {t("revoke")}
                              </Button>
                          </Popconfirm>):""}
                      {r.status=='2' ?(
                          <Button
                              size="small"
                              onClick={() => onSend(r)}
                              title={t("common:send")}
                              type="link"
                          >
                              {t("common:send")}
                          </Button>):""}



                  </>
              ),
          },
      ],
      [t]
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
      its={its}
      onShowAdded={onShowAdded}
      onScan={onScan}
      onBatchReceived={onBatchReceived}
      onBatchRevoke={onBatchRevoke}
      onBatchSend={onBatchSend}
    />
  );
};

export default TaskRunSendTable;
