import { FC, useCallback, useEffect, useMemo, useState } from "react";
import {useHistory} from "react-router-dom";
import { StyledContainer } from "../../components/StyledComponents";
import TaskSearch from "./TaskSearch";
import TaskTable from "./TaskTable";
import {ICodecriterion} from "../../models/codecriterion";
import {
  asyncDelTask,
  asyncGetTaskData,
  asyncPutTask,
  asyncGetCodeData,
  asyncDelTasks,
  asyncLockUsers,
  asyncFinishTask,
  asyncFinishTasks,
  asyncExportTasks
} from "./task.services";
import TaskForm from "./TaskForm";
import { message } from "antd";
import TaskDetail from "./TaskDetail";
import {ITask} from "../../models/task";
import dayjs from "dayjs";
import {DateFormatString} from "../../constants/strings";

const Task: FC = () => {
  const [list, setList] = useState<ITask[]>([]);
  const [codes,setCodes] = useState<ICodecriterion[]>([]);
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState<ITask>();
  const [formVisible, setFormVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [params, setParams] = useState<Record<string, unknown>>();
  const history = useHistory();
  let [selectedRows,setSelected]=useState<string[]>([])
  useEffect(()=>{
    setSelected(selectedRows)
  },[selectedRows])
  const loadData = useCallback(() => {
    setLoading(true);
    asyncGetTaskData((res) => {
      setLoading(false);
      if (res.isOk) {
        setList(res.data);
      }
    });
    asyncGetCodeData((res) => {
      if (res.isOk) {
        setCodes(res.data);
      }
    });
  }, []);

  useEffect(() => {
    loadData();
    return () => setList([]);
  }, [loadData]);

  const onAdd = useCallback(() => {
    setFormVisible(true);
  }, []);
  const onBatchDel =useCallback((its:string[]) => {
    if(!its || its.length<1){
      message.warn("未选中数据");
      return false;
    }
    asyncDelTasks(its, (res) => {
      if (res.isOk) {
        message.success("删除成功");
        onRefresh()
      }
    });
  },[]);
  const onBatchFinish=useCallback((its:string[]) => {
    let rst = true;
    list.map(it=>{
      if(!rst) return;
      its.filter(i=>i==it.id).map(i=>{
        if(!(it && it.instrumentCount >0 && it.receivedDeviceCount >0 && it.receivedDeviceCount== it.detectedDeviceCount && it.receivedDeviceCount == it.sentDeviceCount)||it.status!="1"){
          rst = false;
          return;
        }
      })
    })
    if(rst) {
    asyncFinishTasks(its, (res) => {
      if (res.isOk) {
        message.success("操作成功");
        onRefresh()
      }
    });}else{
      message.warn("若您所选择的任务中存在任务流程未全部完成的任务，请先完成相关任务流程;若您所选中的任务中包含已完成任务，无需重复进行完成操作！")
      return false;

    }
  },[list]);
  const onBatchLock = useCallback((its:string[]) => {
    asyncLockUsers(its, (res) => {
      if (res.isOk) {
        message.success("锁定用户成功");
        onRefresh()
      }
    });
  }, []);
  const onBatchExport = useCallback((its:string[]) => {
    if(!its || its.length<1){
      message.warn("未选中数据");
      return false;
    }
    asyncExportTasks(its);
  }, []);
  const onEdit = useCallback((editItem: ITask) => {
    setItem(editItem);
    setFormVisible(true);
  }, []);
  const onTodo = useCallback((editItem: ITask) => {
    message.warn("待实现！");
  }, []);
  const onBatchTodo = useCallback((its:string[]) => {
    message.warn("待实现！");
  }, []);
  const onDetail = useCallback((editItem: ITask) => {
    setItem(editItem);
    setDetailVisible(true);
  }, []);
  const onDetailClose = useCallback(() => {
    setItem(undefined);
    setDetailVisible(false);
  }, []);
  const onClose = useCallback(() => {
    delete item?.startDate
    setItem(undefined);
    setFormVisible(false);
  }, [item]);

  const onDel = useCallback((data: ITask) => {
    asyncDelTask(data, (res) => {
      if (res.isOk) {
        message.success("删除成功");
        setList((prev) => prev.filter((p) => p.id !== data.id));
      }
    });
  }, []);
  const onEnterTask = useCallback((data: ITask) => {
    setItem(data);
      history.push(
          {pathname:"/task/run",
            state:data})
  }, []);
  const onSave = useCallback(
    (data: ITask) => {
      setLoading(true);
        asyncPutTask(data, (res) => {
          setLoading(false);
          if (res.isOk) {
            let flg = false;
            setList((prev) =>
              prev.map((p) => {
                if (p.id === data.id) {
                  flg=true;
                  return res.data;
                }
                return p;
              })
            );
            if(flg){
              message.success("编辑成功");
            }else{
              message.success("新增成功");
            }
            if(!flg){
              setList((prev) => [res.data, ...prev]);
            }
            onClose();
          }
        });
    },
    [onClose]
  );
  const onDetailSave = useCallback(
      (data: ITask) => {
      },
      [onClose]
  );
  const onSearch = useCallback((newParams?: Record<string, unknown>) => {
    setParams(newParams);
  }, []);

  const onRefresh = useCallback(() => loadData(), [loadData]);

  const filteredList = useMemo(() => {
    if (!params) {
      return list;
    }
    let result = [...list];
    if (params.name) {
      result = result.filter(r => r.name.includes(params.name as string));
    }
    if (params.status) {
      result = result.filter(r => r.status.includes(params.status as string));
    }
    if (params.dutyPerson) {
      result = result.filter(r => r.dutyPerson.includes(params.dutyPerson as string));
    }
    if (params.createUser) {
      result = result.filter(r => r.createUser.includes(params.createUser as string));
    }
    if (params.createUser) {
      result = result.filter(r => r.createUser.includes(params.createUser as string));
    }
    if (params.startDate) {
      params.startDate=dayjs(params.startDate as string).format(DateFormatString)
      result = result.filter(r => (r.startDate) >= (params.startDate as string));
    }
    if (params.finishDate) {
      params.finishDate=dayjs(params.finishDate as string).format(DateFormatString)
      result = result.filter(r => (r.startDate) <= (params.finishDate as string));
    }
    return result;
  }, [params, list]);

  const setSelectedRows=(its:string[])=>{
    setSelected(its)
  }
  const onFinish = useCallback((data: ITask) => {
    if(data && data.instrumentCount >0 && data.receivedDeviceCount >0 && data.receivedDeviceCount== data.detectedDeviceCount && data.receivedDeviceCount == data.sentDeviceCount){
      asyncFinishTask(data, (res) => {
      if (res.isOk) {
        message.success("操作成功");
        setList((prev) =>
            prev.map((p) => {
              if (p.id === data.id) {
                return res.data;
              }
              return p;
            })
        );
      }
    });}else{
      message.warn("任务流程未全部完成，请先完成相关任务流程！")
      return false;
    }
  }, []);
  return (
    <StyledContainer>
      <TaskSearch
          onSearch={onSearch}
          codes = {codes}/>
      <TaskTable
        data={filteredList}
        loading={loading}
        onAdd={onAdd}
        onBatchDel={onBatchDel}
        onBatchLock={onBatchLock}
        onEdit={onEdit}
        onDetail={onDetail}
        onDel={onDel}
        onEnterTask={onEnterTask}
        onRefresh={onRefresh}
        setSelectedRows={setSelectedRows}
        its={selectedRows}
       onBatchExport={onBatchExport}
      onFinish={onFinish}
        onBatchFinish={onBatchFinish}/>
      <TaskForm
        visible={formVisible}
        item={item}
        onSave={onSave}
        onCancel={onClose}
        codes = {codes}
      />
      <TaskDetail
          visible={detailVisible}
          onSave={onDetailSave}
          item={item}
          onCancel={onDetailClose}
      />
    </StyledContainer>
  );
};

export default Task;
