import dayjs from "dayjs";
import React, {FC, useMemo, useState} from "react";
import { useTranslation } from "react-i18next";
import {Button, Form, message, Popconfirm} from "antd";
import {ITaskDevice} from "../../../models/taskdevice";
import YSTable from "../../../components/YSTable";
import {ICriterionTrace} from "../../../models/criteriontrace";
import {DateFormatString} from "../../../constants/strings";
import {IDevice} from "../../../models/device";

interface Props {
  data: ITaskDevice[];
}

const BatchReceiveTable: FC<Props> = ({
    data
}) => {
  const { t } = useTranslation(["device","task","common", "dict"]);
  const columns = useMemo(
      () => [
          {
              title: t("deviceName"),
              dataIndex: "device",
              render:(v:IDevice)=>v.deviceName
          },{
              title: t("factoryNumber"),
              dataIndex: "device",
              render:(v:IDevice)=>v.factoryNumber
          },{
              title: t("status"),
              dataIndex: "device",
              render:(v:IDevice)=>t("status"+v.status)

          },{
              title: t("dutyUnit"),
              dataIndex: "device",
              render:(v:IDevice)=>v.dutyUnit
          },{
              title: t("dutyPerson"),
              dataIndex: "device",
              render:(v:IDevice)=>v.dutyPerson
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

export default BatchReceiveTable;
