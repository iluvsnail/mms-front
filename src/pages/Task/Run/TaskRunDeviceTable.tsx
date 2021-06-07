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
import {DateFormatString} from "../../../constants/strings";

interface Props {
  data: ITaskDevice[];
  its:string[];
  loading: boolean;
  setSelectedRows:(its:string[])=>void;
    onShowAdded?:(v:boolean)=>void;
    onBatchReceived?:(its:string[])=>void;
    onBatchRevoke?:(its:string[])=>void;
    onScan?:()=>void;
    onReceived:(item:ITaskDevice)=>void;
    onRevoke:(item:ITaskDevice)=>void;
}

const TaskRunDeviceTable: FC<Props> = ({
    data,
    its,
    loading,
    setSelectedRows,
    onShowAdded,
    onScan,
    onBatchRevoke,
    onBatchReceived,
    onRevoke,
                                           onReceived
}) => {
  const { t } = useTranslation(["taskdevice","device","task","common", "dict"]);
    const onSelectChange = function (selectedRowKeys:any){
        debugger
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
              title: t("receivedDate"),
              dataIndex: "receivedDate",
              sorter: (a: ITaskDevice, b: ITaskDevice) => a.receivedDate.toString().localeCompare(b.receivedDate.toString()),
              render:(v:string)=>v?dayjs(v).format(DateFormatString):""
          },{
              title: t("sendDetectedPerson"),
              dataIndex: "sendDetectedPerson",
              sorter: (a: ITaskDevice, b: ITaskDevice) => a.sendDetectedPerson.localeCompare(b.sendDetectedPerson),
          },{
              title: t("receivedPerson"),
              dataIndex: "receivedPerson",
              sorter: (a: ITaskDevice, b: ITaskDevice) => a.receivedPerson.toString().localeCompare(b.receivedPerson.toString()),
          },
          {
              title: t("common:operations"),
              dataIndex: "OPERATIONS",
              render: (v: unknown, r: ITaskDevice) => (
                  <>
                      {r.status=='1' ||r.status=='2' ||r.status=='3' ?(<Button
                          size="small"
                          onClick={() =>onReceived(r)}
                          title={t("common:edit")}
                          type="link"
                      >
                          {t("common:edit")}
                      </Button>):""}

                      {r.status=='0'?(<Button
                          size="small"
                          onClick={()=> onReceived(r)}
                          title={t("receive")}
                          type="link"
                      >
                          {t("receive")}
                      </Button>):""}
                      {r.status=='1'?(<Popconfirm
                          onConfirm={() =>onRevoke(r)}
                          title={t("confirmRevoke")}
                      >
                          <Button size="small" title={t("revoke")} type="link">
                              {t("revoke")}
                          </Button>
                      </Popconfirm>):""}

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
    />
  );
};

export default TaskRunDeviceTable;
