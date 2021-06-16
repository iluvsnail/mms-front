import dayjs from "dayjs";
import React, {FC, useMemo, useState} from "react";
import { useTranslation } from "react-i18next";
import YSTable from "../../../components/YSTable";
import {IDevice} from "../../../models/device";
import {ITaskDevice} from "../../../models/taskdevice";
import {Button, message, Popconfirm} from "antd";
import {DateFormatString} from "../../../constants/strings";
import {ITask} from "../../../models/task";

interface Props {
  data: ITaskDevice[];
  its:string[];
  loading: boolean;
  setSelectedRows:(its:string[])=>void;
    onShowDetected?:(v:boolean)=>void;
    onBatchReceived?:(its:string[])=>void;
    onBatchRevoke?:(its:string[])=>void;
    onScan?:()=>void;
    onRevoke:(item:ITaskDevice)=>void;
    onDownloadTemplate:(item:ITaskDevice)=>void;
    onUpload:(item:ITaskDevice)=>void;
    onBatchUploadReport:(its:string[])=>void;
    onPrint: (item: ITaskDevice)=>void;
    onDetail: (item: ITaskDevice)=>void;
    onImportData: (item: ITaskDevice)=>void;
    task?:ITask;
}

const TaskRunDetectedDeviceTable: FC<Props> = ({
    data,
    its,
    loading,
    setSelectedRows,
                                                   onShowDetected,
    onScan,
    onBatchRevoke,
    onBatchReceived,
    onRevoke,
    onUpload,
    onPrint,
                                                   onDownloadTemplate,
    onBatchUploadReport,
    task,
    onDetail,
    onImportData
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
          },{
              title: t("detectedDate"),
              dataIndex: "detectedDate",
              sorter: (a: ITaskDevice, b: ITaskDevice) => a.detectedDate.toString().localeCompare(b.detectedDate.toString()),
              render:(v:string)=>v?dayjs(v).format(DateFormatString):""
          },{
              title: t("detectedPerson"),
              dataIndex: "detectedPerson",
              sorter: (a: ITaskDevice, b: ITaskDevice) => a.detectedPerson.localeCompare(b.detectedPerson),
          },
          {
              title: t("common:operations"),
              dataIndex: "OPERATIONS",
              render: (v: unknown, r: ITaskDevice) => (
                  <><Button
                      size="small"
                      onClick={() =>onDetail(r)}
                      title={t("common:detail")}
                      type="link"
                  >
                      {t("common:detail")}
                  </Button>
                      {r.status=='2'||r.status=='3'||r.status=='4'?(
                      <Button
                          size="small"
                          onClick={()=>onPrint(r)}
                          title={t("common:view")}
                          type="link"
                      >
                          {t("common:view")}
                      </Button>):""}
                      {((r.status=='2'||r.status=='3') &&  task?.status=='1')?(
                      <Button
                          size="small"
                          onClick={() =>onUpload(r)}
                          title={t("common:edit")}
                          type="link"
                      >
                          {t("common:edit")}
                      </Button>):""}
                      {r.status=='2'?(<Popconfirm
                          onConfirm={() =>onRevoke(r)}
                          title={t("confirmRevoke")}
                      >
                          <Popconfirm
                              onConfirm={() =>onRevoke(r)}
                              title={t("confirmRevoke")}
                          >
                              <Button size="small" title={t("revoke")} type="link">
                                  {t("revoke")}
                              </Button>
                          </Popconfirm>
                      </Popconfirm>):""}

                      {r.status=="1" && r.template?(
                      <Button onClick={() =>onDownloadTemplate(r)} title={t("common:downloadTemplate")} type="link" style={{ marginLeft: "1rem", cursor: "pointer" }}>
                          {t("common:downloadTemplate")}
                      </Button>):""}
                      {r.status=='1'?(
                          <>
                          <Button
                          size="small"
                          onClick={() =>onUpload(r)}
                          title={t("common:uploadReport")}
                          type="link"
                      >
                          {t("common:uploadReport")}
                      </Button>
                              <Button
                              size="small"
                              onClick={() =>onImportData(r)}
                              title={t("导入检定数据")}
                              type="link"
                          >
                              {t("导入检定数据")}
                          </Button></>):""}


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
      onShowDetected={onShowDetected}
      onScan={onScan}
      onBatchReceived={onBatchReceived}
      onBatchRevoke={onBatchRevoke}
      onBatchUploadReport={onBatchUploadReport}
    />
  );
};

export default TaskRunDetectedDeviceTable;
