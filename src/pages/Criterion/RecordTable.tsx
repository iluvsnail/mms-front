import dayjs from "dayjs";
import {FC, useMemo, useState} from "react";
import { useTranslation } from "react-i18next";
import {Button, message, Popconfirm,Image} from "antd";
import {ITaskDevice} from "../../models/taskdevice";
import YSTable from "../../components/YSTable";
import {ICriterionTrace} from "../../models/criteriontrace";
import {DateFormatString} from "../../constants/strings";
import {BASE_URL} from "../../utils/apiUtils";
import api from "../../configs/api";

interface Props {
  data: ICriterionTrace[];
}

const RecordTable: FC<Props> = ({
    data
}) => {
  const { t } = useTranslation(["criterion","task","common", "dict"]);
  const columns = useMemo(
      () => [
          {
              title: t("traceDate"),
              dataIndex: "traceDate",
              render:(v:string)=>v?dayjs(v).format(DateFormatString):""
          },{
              title: t("traceUnit"),
              dataIndex: "traceUnit",
          },{
              title: t("criterionNumber"),
              dataIndex: "fileName",
          },{
              title: t("notes"),
              dataIndex: "notes",
          },
          {
              title: t("common:operations"),
              dataIndex: "OPERATIONS",
              render: (v: unknown, r: ICriterionTrace) => (
                      <Image width={25} height={25} src={BASE_URL+"/"+api.criterion+"/certificate/image/"+r.id}/>
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
