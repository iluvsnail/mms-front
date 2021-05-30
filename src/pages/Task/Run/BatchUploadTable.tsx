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

const BatchUploadTable: FC<Props> = ({
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
              title: t("detectedDate"),
              dataIndex: "detectedDate"

          },{
              title: t("detectedPerson"),
              dataIndex: "detectedPerson"
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

export default BatchUploadTable;
