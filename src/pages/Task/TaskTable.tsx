import dayjs from "dayjs";
import {FC, useMemo, useState} from "react";
import { useTranslation } from "react-i18next";
import YSTable from "../../components/YSTable";
import {DateFormatString, DateTimeFormatString} from "../../constants/strings";
import { Button, Popconfirm ,Progress} from "antd";
import {IsLock, LockList} from "../../models/dict";
import {IRole} from "../../models/role";
import {ITask} from "../../models/task";
import {ICodecriterion} from "../../models/codecriterion";
import {isAdmin} from "../../utils/tokenUtils";

interface Props {
  data: ITask[];
  its:string[];
  loading: boolean;
  onAdd: () => void;
    onDetail: (item: ITask) => void;
  onBatchDel:(its:string[])=>void;
    onBatchFinish:(its:string[])=>void;
  onBatchLock:(its:string[])=>void;
    onBatchExport:(its:string[])=>void;
  onEdit: (item: ITask) => void;
  onDel: (item: ITask) => void;
    onEnterTask: (item: ITask) => void;
    onFinish:(item:ITask)=> void;
  onRefresh: () => void;
  setSelectedRows:(its:string[])=>void;
}

const TaskTable: FC<Props> = ({
  data,
    its,
  loading,
  onAdd,
    onDetail,
    onBatchExport,
  onBatchDel,
                                  onBatchFinish,
  onEdit,
  onDel,
    onFinish,
    onEnterTask,
  onRefresh,
    setSelectedRows,
}) => {
  const { t } = useTranslation(["task", "common", "dict"]);
    const onSelectChange = function (selectedRowKeys:any){
        setSelectedRows(selectedRowKeys)
    };
  const columns = useMemo(
    () => [
      {
        title: t("name"),
        dataIndex: "name",
        sorter: (a: ITask, b: ITask) => a.name.localeCompare(b.name),
      },{
            title: t("startDate"),
            dataIndex: "startDate",
            sorter: (a: ITask, b: ITask) => a.startDate.toString().localeCompare(b.startDate.toString()),
        render:(v:string)=>v?dayjs(v).format(DateFormatString):""
        },{
            title: t("finishDate"),
            dataIndex: "finishDate",
            sorter: (a: ITask, b: ITask) => a.finishDate.toString().localeCompare(b.finishDate.toString()),
            render:(v:string)=>v?dayjs(v).format(DateFormatString):""
        },{
            title: t("currentStatus"),
            dataIndex: "status",
            sorter: (a: ITask, b: ITask) => a.status.localeCompare(b.status),
            render:(v:string) => t(`status${v}`)
        },{
            title: t("dutyPerson"),
            dataIndex: "dutyPerson",
            sorter: (a: ITask, b: ITask) => a.dutyPerson.localeCompare(b.dutyPerson),
        },{
            title: t("progress"),
            render:(v:unknown,r:ITask)=>(
                <>
                    <Progress type="circle" percent={r.instrumentCount?100:0} width={30} format={percent => r.instrumentCount} style={{"padding":"0 5px 0 0"}}/><span style={{"fontSize":"40","color":"blue"}}>—</span>
                    <Progress type="circle" percent={r.receivedDeviceCount?100:0} width={30} format={percent => r.receivedDeviceCount} style={{"padding":"0 5px 0 5px"}}/><span style={{"fontSize":"40","color":"blue"}}>—</span>
                    <Progress type="circle" percent={(r.detectedDeviceCount/r.receivedDeviceCount)*100} width={30} format={percent => r.detectedDeviceCount} style={{"padding":"0 5px 0 5px"}}/><span style={{"fontSize":"40","color":"blue"}}>—</span>
                    <Progress type="circle" percent={(r.sentDeviceCount/r.receivedDeviceCount)*100} width={30} format={percent => r.sentDeviceCount}/>

                </>
  )
        },
      {
        title: t("common:operations"),
        dataIndex: "OPERATIONS",
        render: (v: unknown, r: ITask) => (
          <>

              <Button
                  size="small"
                  onClick={() => onEnterTask(r)}
                  title={t("task:enterTask")}
                  type="link"
              >
                  {t("task:enterTask")}
              </Button>
              <Button
                  size="small"
                  onClick={() => onEdit(r)}
                  title={t("common:edit")}
                  type="link"
              >
                  {t("common:edit")}
              </Button>
              {<Button
                  size="small"
                  onClick={() => onDetail(r)}
                  title={t("common:detail")}
                  type="link"
              >
                  {t("common:detail")}
              </Button>}
              {isAdmin()?(<>
            <Popconfirm
              onConfirm={() => onDel(r)}
              title={t("common:confirmDelete")}
            >
              <Button size="small" title={t("common:delete")} type="link">
                {t("common:delete")}
              </Button>
            </Popconfirm>
                  {
                      (r.instrumentCount >0 && r.receivedDeviceCount >0 && r.receivedDeviceCount== r.detectedDeviceCount && r.receivedDeviceCount == r.sentDeviceCount)?(<Button
                          size="small"
                          onClick={() => onFinish(r)}
                          title={t("task:finish")}
                          type="link"
                      >
                          {t("task:finish")}
                      </Button>):""
                  }

                      </>):""}
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
      onBatchDel={onBatchDel}
      onBatchExport={onBatchExport}
      onBatchFinish={onBatchFinish}
      onRefresh={onRefresh}
      its={its}
      isAdmin={isAdmin()}
    />
  );
};

export default TaskTable;
