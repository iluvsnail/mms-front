import dayjs from "dayjs";
import {FC, useMemo, useState} from "react";
import { useTranslation } from "react-i18next";
import YSTable from "../../components/YSTable";
import { DateTimeFormatString } from "../../constants/strings";
import { Button, Popconfirm } from "antd";
import {IsLock, LockList} from "../../models/dict";
import {IRole} from "../../models/role";
import {ICodecriterion} from "../../models/codecriterion";
import {ICriterion} from "../../models/criterion";
import {IDevice} from "../../models/device";
import {isAdmin} from "../../utils/tokenUtils";

interface Props {
  data: ICriterion[];
  its:string[];
  loading: boolean;
  onAdd: () => void;
    onDetail: (item: ICriterion) => void;
  onBatchDel:(its:string[])=>void;
    onBatchPrint:(its:string[])=>void;
    onUpdateTracing:(its:string[])=>void;
    onBatchImport:(its:string[])=>void;
    onBatchExport:(its:string[])=>void;
  onEdit: (item: ICriterion) => void;
  onDel: (item: ICriterion) => void;
  onRefresh: () => void;
  setSelectedRows:(its:string[])=>void;
    onRecord: (item: ICriterion) => void;
}

const CriterionTable: FC<Props> = ({
  data,
    its,
  loading,
  onAdd,
    onDetail,
                                    onBatchPrint,
    onBatchExport,
    onBatchImport,
  onBatchDel,
  onEdit,
  onDel,
  onRefresh,
    setSelectedRows,
    onRecord,
onUpdateTracing
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
      {
        title: t("common:operations"),
        dataIndex: "OPERATIONS",
        render: (v: unknown, r: ICriterion) => (
          <>
              {
                  isAdmin()?(<Button
                      size="small"
                      onClick={() => onEdit(r)}
                      title={t("common:edit")}
                      type="link"
                  >
                      {t("common:edit")}
                  </Button>):""
              }
              <Button
                  size="small"
                  onClick={() => onDetail(r)}
                  title={t("common:detail")}
                  type="link"
              >
                  {t("common:detail")}
              </Button>

              <Button
                  size="small"
                  onClick={() => onRecord(r)}
                  title={t("criterion:tracing")}
                  type="link"
              >
                  {t("criterion:tracing")}
              </Button>
              {isAdmin()?(
            <Popconfirm
              onConfirm={() => onDel(r)}
              title={t("common:confirmDelete")}
            >
              <Button size="small" title={t("common:delete")} type="link">
                {t("common:delete")}
              </Button>
            </Popconfirm>):""}
          </>
        ),
      },
    ],
    [t, onEdit, onDel]
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
      tableTitle={t("table.title")}
      onAdd={onAdd}
      onUpdateTracing={onUpdateTracing}
      onBatchDel={onBatchDel}
      onBatchImport={onBatchImport}
      onBatchExport={onBatchExport}
      onRefresh={onRefresh}
      its={its}
      isAdmin={isAdmin()}
    />
  );
};

export default CriterionTable;
