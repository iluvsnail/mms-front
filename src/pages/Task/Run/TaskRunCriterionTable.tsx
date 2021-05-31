import dayjs from "dayjs";
import {FC, useMemo, useState} from "react";
import { useTranslation } from "react-i18next";
import YSTable from "../../../components/YSTable";
import {ICriterion} from "../../../models/criterion";
import {ICodecriterion} from "../../../models/codecriterion";

interface Props {
  data: ICriterion[];
  codes: ICodecriterion[];
  its:string[];
  loading: boolean;
  setSelectedRows:(its:string[])=>void;
  onCodeChange:(v:string)=>void;
    onSearch:(v:string)=>void;
}

const TaskRunCriterionTable: FC<Props> = ({
    data,
    codes,
    its,
    loading,
    setSelectedRows,
    onCodeChange,
    onSearch
}) => {
  const { t } = useTranslation(["criterion", "common", "dict"]);
    const onSelectChange = function (selectedRowKeys:any){
        setSelectedRows(selectedRowKeys)
    };
  const columns = useMemo(
      () => [{
          title: t("criterionName"),
          dataIndex: "criterion",
          sorter: (a: ICriterion, b: ICriterion) => a.criterion.criterionName.localeCompare(b.criterion.criterionName),
          render: (v:ICodecriterion) => v.criterionName
      },
          {
              title: t("instrumentName"),
              dataIndex: "instrumentName",
              sorter: (a: ICriterion, b: ICriterion) => a.instrumentName.localeCompare(b.instrumentName),
          },{
              title: t("standardType"),
              dataIndex: "standardType",
              sorter: (a: ICriterion, b: ICriterion) => a.standardType.localeCompare(b.standardType),
          },{
              title: t("factoryNumber"),
              dataIndex: "factoryNumber",
              sorter: (a: ICriterion, b: ICriterion) => a.factoryNumber.localeCompare(b.factoryNumber),
          },{
              title: t("status"),
              dataIndex: "status",
              sorter: (a: ICriterion, b: ICriterion) => a.status.localeCompare(b.status),
              render:(v:string)=>t(`status${v}`)
          },{
              title: t("lastTracingUnit"),
              dataIndex: "lastTracingUnit",
              sorter: (a: ICriterion, b: ICriterion) => a.lastTracingUnit.localeCompare(b.lastTracingUnit),
          },{
              title: t("lastTracingDate"),
              dataIndex: "lastTracingDate",
              sorter: (a: ICriterion, b: ICriterion) => a.lastTracingDate.toString().localeCompare(b.lastTracingDate.toString()),
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
          onChange:onSelectChange,
          selectedRowKeys:its,
      }}
      columns={columns}
      its={its}
      codes={codes}
      onCodeChange={onCodeChange}
      onSearch={onSearch}
    />
  );
};

export default TaskRunCriterionTable;
