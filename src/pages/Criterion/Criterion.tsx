import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { StyledContainer } from "../../components/StyledComponents";
import CriterionSearch from "./CriterionSearch";
import CriterionTable from "./CriterionTable";
import {ICodecriterion} from "../../models/codecriterion";
import {
  asyncDelCriterion,
  asyncGetCriterionData,
  asyncPutCriterion,
  asyncGetCodeData,
  asyncDelCriterions,
  asyncLockUsers,
  asyncResetUsersPassword, asyncGetTraceRecord, asyncUpdateTrace, asyncExportCriterions
} from "./criterion.services";
import CriterionForm from "./CriterionForm";
import { message } from "antd";
import {ICriterion} from "../../models/criterion";
import CriterionDetail from "./CriterionDetail";
import {IInstitution} from "../../models/institution";
import {asyncExportDevices, asyncGetInstitutionCodeData} from "../Device/device.services";
import {ITaskDevice} from "../../models/taskdevice";
import {ICriterionTrace} from "../../models/criteriontrace";
import RecordForm from "./RecordForm";
import UpdateTraceForm from "./UpdateTraceForm";
import {BASE_URL} from "../../utils/apiUtils";
import api from "../../configs/api";
import DeviceTable from "../Device/DeviceTable";
import dayjs from "dayjs";
import {DateFormatString} from "../../constants/strings";

const Criterion: FC = () => {
  const [list, setList] = useState<ICriterion[]>([]);
  const [codes,setCodes] = useState<ICodecriterion[]>([]);
  const [institutionCodes,setInstitutionCodes] = useState<IInstitution[]>([]);
  const [traceRecord,setTraceRecord]=useState<ICriterionTrace[]>([]);

  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState<ICriterion>();
  const [formVisible, setFormVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [recordFormVisible, setRecordFormVisible] = useState(false);
  const [updateTraceFormVisible, setUpdateTraceFormVisible] = useState(false);


  const [params, setParams] = useState<Record<string, unknown>>();
  let [selectedRows,setSelected]=useState<string[]>([])
  useEffect(()=>{
    setSelected(selectedRows)
  },[selectedRows])
  const loadData = useCallback(() => {
    setLoading(true);
    asyncGetCriterionData((res) => {
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
    asyncGetInstitutionCodeData((res) => {
      if (res.isOk) {
        setInstitutionCodes(res.data);
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
    asyncDelCriterions(its, (res) => {
      if (res.isOk) {
        message.success("删除成功");
        onRefresh()
      }
    });
  },[]);
  const onUpdateTracing =useCallback((its:string[]) => {
    if(!its || its.length<1){
      message.warn("未选中数据");
      return false;
    }
    setSelectedRows(its);
    setUpdateTraceFormVisible(true);
  },[]);
  const onEdit = useCallback((editItem: ICriterion) => {
    setItem(editItem);
    setFormVisible(true);
  }, []);
  const onBatchTodo = useCallback((its:string[]) => {
    message.warn("待实现！");
  }, []);
  const onDetail = useCallback((editItem: ICriterion) => {
    setItem(editItem);
    setDetailVisible(true);
  }, []);
  const onDetailClose = useCallback(() => {
    setItem(undefined);
    setDetailVisible(false);
  }, []);
  const onClose = useCallback(() => {
    delete item?.lastTracingDate
    setItem(undefined);
    setFormVisible(false);
  }, [item]);
  const onRecordClose = useCallback(() => {
    setTraceRecord([]);
    setRecordFormVisible(false);
  }, []);
  const onUpdateTraceClose = useCallback(() => {
    setUpdateTraceFormVisible(false);
  }, []);
  const onDel = useCallback((data: ICriterion) => {
    asyncDelCriterion(data, (res) => {
      if (res.isOk) {
        message.success("删除成功");
        setList((prev) => prev.filter((p) => p.id !== data.id));
      }
    });
  }, []);
  const onRecord = useCallback((data: ICriterion) => {
    setItem(data);
    asyncGetTraceRecord(data, (res) => {
      if (res.isOk) {
        setTraceRecord(res.data);
        setRecordFormVisible(true);
      }
    });
  }, []);
  const onSave = useCallback(
    (data: ICriterion) => {
      setLoading(true);
        asyncPutCriterion(data, (res) => {
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

  const onSaveTrace = useCallback(
      (data:any) => {
        asyncUpdateTrace(data, (res) => {
          if (res.isOk) {{
              message.success("更新溯源信息成功");
            }
            onUpdateTraceClose();
          }
        });
      },
      [onUpdateTraceClose]
  );

  const onRecordSave = () => {
    onRecordClose();
  }
  const onDetailSave = useCallback(
      (data: ICriterion) => {
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
    if (params.instrumentName) {
      result = result.filter(r => r.instrumentName.includes(params.instrumentName as string));
    }
    if (params.criterion) {
      result = result.filter(r => r.criterion.id.includes(params.criterion as string));
    }
    if (params.standardType) {
      result = result.filter(r => r.standardType.includes(params.standardType as string));
    }
    if (params.status || params.status == "0") {
      result = result.filter(r => r.status == params.status);
    }
    if (params.lastTracingUnit) {
      result = result.filter(r => r.lastTracingUnit.includes(params.lastTracingUnit as string));
    }
    if (params.lastTracingDate) {
      params.lastTracingDate=dayjs(params.lastTracingDate as string).format(DateFormatString)
      result = result.filter(r=>r.lastTracingDate!=null).filter(r => r.lastTracingDate.toString().includes(params.lastTracingDate as string));
    }
    return result;
  }, [params, list]);

  const setSelectedRows=(its:string[])=>{
    setSelected(its)
  }
  const onBatchExport = useCallback((its:string[]) => {
    if(!its || its.length<1){
      message.warn("未选中数据");
      return false;
    }
    asyncExportCriterions(its);
  }, []);
  return (
    <StyledContainer>
      <CriterionSearch
          onSearch={onSearch}
          codes = {codes}/>
      <CriterionTable
        data={filteredList}
        loading={loading}
        onAdd={onAdd}
        onBatchPrint={onBatchTodo}
        onBatchExport={onBatchExport}
        onBatchImport={onBatchTodo}
        onBatchDel={onBatchDel}
        onEdit={onEdit}
        onDetail={onDetail}
        onDel={onDel}
        onRefresh={onRefresh}
        setSelectedRows={setSelectedRows}
        its={selectedRows}
        onRecord={onRecord}
        onUpdateTracing={onUpdateTracing}
        importUrl={`${BASE_URL}/${api.criterion}/importCriterions`}
      />
      <CriterionForm
        visible={formVisible}
        item={item}
        onSave={onSave}
        onCancel={onClose}
        codes = {codes}
        institutionCodes = {institutionCodes}
      />
      <CriterionDetail
          visible={detailVisible}
          onSave={onDetailSave}
          item={item}
          onCancel={onDetailClose}
      />
      <RecordForm  datas={traceRecord} onSave={onRecordSave} visible={recordFormVisible} onCancel={onRecordClose} item={item}/>
      <UpdateTraceForm visible={updateTraceFormVisible} onSave={onSaveTrace} onCancel={onUpdateTraceClose} datas={list} its={selectedRows} institutionCodes = {institutionCodes}/>
    </StyledContainer>
  );
};

export default Criterion;
