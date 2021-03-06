import dayjs from "dayjs";
import {FC, useMemo, useState} from "react";
import { useTranslation } from "react-i18next";
import {Button, message, Popconfirm} from "antd";
import {ITaskDevice} from "../../models/taskdevice";
import {IDevice} from "../../models/device";
import YSTable from "../../components/YSTable";
import {ITask} from "../../models/task";

interface Props {
  data: ITaskDevice[];
  onPrint:(item:ITaskDevice)=>void;
}

const RecordTable: FC<Props> = ({
    data,
    onPrint
}) => {
  const { t } = useTranslation(["taskdevice","device","task","common", "dict"]);
  const columns = useMemo(
      () => [
          {
              title: t("task:name"),
              dataIndex: "task",
              render:(v:ITask)=>v.name,
          },{
              title: t("检定结论"),
              dataIndex: "result",
              render:(v:string)=>v?t("result"+v):""
          },{
              title: t("receivedDate"),
              dataIndex: "receivedDate",
              sorter: (a: ITaskDevice, b: ITaskDevice) => a.receivedDate.toString().localeCompare(b.receivedDate.toString()),
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
          },{
              title: t("validDate"),
              dataIndex: "validDate",
              sorter: (a: ITaskDevice, b: ITaskDevice) => a.validDate.toString().localeCompare(b.validDate.toString()),
          },
          {
              title: t("common:operations"),
              dataIndex: "OPERATIONS",
              render: (v: unknown, r: ITaskDevice) => (
                  <>
                      <Button
                          size="small"
                          onClick={() => onPrint(r)}
                          title={t("common:detail")}
                          type="link"
                      >
                          {t("common:detail")}
                      </Button>
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
      columns={columns}
    />
  );
};

export default RecordTable;
