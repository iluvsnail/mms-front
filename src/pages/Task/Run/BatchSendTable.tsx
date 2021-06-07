import dayjs from "dayjs";
import React, {FC, useMemo, useState} from "react";
import { useTranslation } from "react-i18next";
import {Button, Form, message, Popconfirm, Upload} from "antd";
import {ITaskDevice} from "../../../models/taskdevice";
import YSTable from "../../../components/YSTable";
import {ICriterionTrace} from "../../../models/criteriontrace";
import {DateFormatString} from "../../../constants/strings";
import {IDevice} from "../../../models/device";
import {ITask} from "../../../models/task";
import {BASE_URL} from "../../../utils/apiUtils";
import api from "../../../configs/api";

interface Props {
  data: ITaskDevice[];
}

const BatchSendTable: FC<Props> = ({
    data
}) => {
  const { t } = useTranslation(["taskdevice","device","task","common", "dict"]);

  const columns = useMemo(
      () => [
          {
              title: t("device:deviceName"),
              dataIndex: "device",
              render:(v:IDevice)=>v.deviceName
          },{
              title: t("device:factoryNumber"),
              dataIndex: "device",
              render:(v:IDevice)=>v.factoryNumber
          },{
              title: t("receivedDate"),
              dataIndex: "receivedDate"

          },{
              title: t("sendDetectedPerson"),
              dataIndex: "sendDetectedPerson"
          },{
              title: t("receivedPerson"),
              dataIndex: "receivedPerson"
          }
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

export default BatchSendTable;
