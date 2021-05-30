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
    const props = {
        name: 'file',
        accept:".xlsx",
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info:any) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} 文件上传成功`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} 文件上传失败`);
            }
        },
    };
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
          },{
              title: t("common:operations"),
              dataIndex: "OPERATIONS",
              render: (v: unknown, r: ITaskDevice) => (
                  <>

                      <Upload action={`${BASE_URL}/${api.task}/device/upload/${r.id}`}  {...props}>
                          <Button type="link"  title={t("upload")}>
                              {t("uploadReport")}
                          </Button>
                      </Upload>
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

export default BatchSendTable;
