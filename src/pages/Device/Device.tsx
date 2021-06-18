import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { StyledContainer } from "../../components/StyledComponents";
import DeviceSearch from "./DeviceSearch";
import DeviceTable from "./DeviceTable";
import {ICodecriterion} from "../../models/codecriterion";
import {
  asyncDelDevice,
  asyncGetDeviceData,
  asyncPutDevice,
  asyncGetCodeData,
  asyncDelDevices,
  asyncGetDeviceCodeData,
  asyncGetInstitutionCodeData,
  asyncGetDeviceRecord,
  asyncExportDevices,
  asyncPrintItem,
  asyncPrintItems
} from "./device.services";
import DeviceForm from "./DeviceForm";
import { message } from "antd";
import {IDevice} from "../../models/device";
import DeviceDetail from "./DeviceDetail";
import {ICode} from "../../models/code";
import PrintForm from "./PrintForm";
import {IInstitution} from "../../models/institution";
import {ITaskDevice} from "../../models/taskdevice";
import RecordForm from "./RecordForm";
import {BASE_URL} from "../../utils/apiUtils";
import api from "../../configs/api";
import BatchPrintForm from "./BatchPrintForm";

const Device: FC = () => {
  const [list, setList] = useState<IDevice[]>([]);
  const [codes,setCodes] = useState<ICodecriterion[]>([]);
  const [deviceCodes,setDeviceCodes] = useState<ICode[]>([]);
  const [institutionCodes,setInstitutionCodes] = useState<IInstitution[]>([]);
  const [deviceRecord,setDeviceRecord]=useState<ITaskDevice[]>([]);

  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState<IDevice>();
  const [items,setItems] = useState<IDevice[]>([]);
  const [formVisible, setFormVisible] = useState(false);
  const [recordFormVisible, setRecordFormVisible] = useState(false);
  const [printVisible, setPrintVisible] = useState(false);
  const [batchPrintVisible, setBatchPrintVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [params, setParams] = useState<Record<string, unknown>>();
  let [selectedRows,setSelected]=useState<string[]>([])
  useEffect(()=>{
    setSelected(selectedRows)
  },[selectedRows])
  const loadData = useCallback(() => {
    setLoading(true);
    asyncGetDeviceData((res) => {
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
    asyncGetDeviceCodeData((res) => {
      if (res.isOk) {
        setDeviceCodes(res.data);
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
    asyncDelDevices(its, (res) => {
      if (res.isOk) {
        message.success("删除成功");
        onRefresh()
      }
    });
  },[]);
  const onEdit = useCallback((editItem: IDevice) => {
    setItem(editItem);
    setFormVisible(true);
  }, []);
  const onPrint = useCallback((editItem: IDevice) => {
    asyncPrintItem(editItem, (res) => {
      if (res.isOk) {
        setItem(res.data);
        setPrintVisible(true);
      }
    });
  }, []);

  const onBatchPrint = useCallback((its: string[]) => {
    if(!its || its.length<1){
      message.warn("未选中数据");
      return false;
    }
    asyncPrintItems(its, (res) => {
      if (res.isOk) {
        setItems(res.data);
        setBatchPrintVisible(true);
      }
    });
  }, []);
  const onTodo = useCallback((editItem: IDevice) => {
    message.warn("待实现！");
  }, []);
  const onBatchTodo = useCallback((its:string[]) => {
    message.warn("待实现！");
  }, []);
  const onDetail = useCallback((editItem: IDevice) => {
    setItem(editItem);
    setDetailVisible(true);
  }, []);
  const onDetailClose = useCallback(() => {
    setItem(undefined);
    setDetailVisible(false);
  }, []);
  const onClose = useCallback(() => {
    setItem(undefined);
    setFormVisible(false);
  }, []);
  const onRecordClose = useCallback(() => {
    setDeviceRecord([]);
    setRecordFormVisible(false);
  }, []);
  const onPrintClose = useCallback(() => {
    setItem(undefined);
    setPrintVisible(false);
  }, []);
  const onBatchPrintClose = useCallback(() => {
    setItems([]);
    setBatchPrintVisible(false);
  }, []);
  const onDel = useCallback((data: IDevice) => {
    asyncDelDevice(data, (res) => {
      if (res.isOk) {
        message.success("删除成功");
        setList((prev) => prev.filter((p) => p.id !== data.id));
      }
    });
  }, []);
  const onRecord = useCallback((data: IDevice) => {
    setItem(data);
    asyncGetDeviceRecord(data, (res) => {
      if (res.isOk) {
        setDeviceRecord(res.data);
        setRecordFormVisible(true);
      }
    });
  }, []);

  const onSave = useCallback(
    (data: IDevice) => {
      setLoading(true);
        asyncPutDevice(data, (res) => {
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

  const onRecordSave = () => {
            onRecordClose();
      }
  const onDetailSave = useCallback(
      (data: IDevice) => {
      },
      [onDetailClose]
  );
  const onPrintSave = useCallback(
      () => {
        let el = document.getElementById("qrcode");
        let iframe = document.createElement('IFRAME') as HTMLIFrameElement;
        let doc = null;
        iframe.setAttribute('style', 'position:absolute;width:0px;height:0px;left:-500px;top:-500px;');
        document.body.appendChild(iframe);
        doc = iframe.contentWindow?.document;
        doc?.write(el?.outerHTML||"");
        doc?.close();
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
        if (navigator.userAgent.indexOf("MSIE") > 0)
        {
          document.body.removeChild(iframe);
        }
      },
      [onPrintClose]
  );

  const onBatchPrintSave = useCallback(
      () => {
        let el = document.getElementById("qrcodes");
        let iframe = document.createElement('IFRAME') as HTMLIFrameElement;
        let doc = null;
        iframe.setAttribute('style', 'position:absolute;width:0px;height:0px;left:-500px;top:-500px;');
        document.body.appendChild(iframe);
        doc = iframe.contentWindow?.document;
        doc?.write(el?.outerHTML||"");
        doc?.close();
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
        if (navigator.userAgent.indexOf("MSIE") > 0)
        {
          document.body.removeChild(iframe);
        }
      },
      [onBatchPrintClose]
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
    if (params.deviceName) {
      result = result.filter(r => r.deviceName.includes(params.deviceName as string));
    }
    if (params.criterion) {
      result = result.filter(r => r.criterion.id.includes(params.criterion as string));
    }
    if (params.standardType) {
      result = result.filter(r => r.standardType.includes(params.standardType as string));
    }
    if (params.factoryNumber) {
      result = result.filter(r => r.factoryNumber.includes(params.factoryNumber as string));
    }
    if (params.manufacturer) {
      result = result.filter(r => r.manufacturer.includes(params.manufacturer as string));
    }
    if (params.lastAuthenticationDate) {
      result = result.filter(r => r.lastAuthenticationDate?r.lastAuthenticationDate.toString().includes(params.lastAuthenticationDate as string):false);
    }
    if (params.validDate) {
      result = result.filter(r => r.validDate.toString().includes(params.validDate as string));
    }
    if (params.verifier) {
      result = result.filter(r => r.verifier.toString().includes(params.verifier as string));
    }
    if (params.dutyUnit) {
      result = result.filter(r => r.dutyUnit.toString().includes(params.dutyUnit as string));
    }
    if (params.dutyPerson) {
      result = result.filter(r => r.dutyPerson.toString().includes(params.dutyPerson as string));
    }
    if (params.status || params.status == "0") {
      result = result.filter(r => r.status == params.status);
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
    asyncExportDevices(its);
  }, []);
  return (
    <StyledContainer>
      <DeviceSearch
          onSearch={onSearch}
          codes = {codes}/>
      <DeviceTable
        data={filteredList}
        loading={loading}
        onAdd={onAdd}
        onBatchPrint={onBatchPrint}
        onBatchExport={onBatchExport}
        onBatchImport={onBatchTodo}
        onBatchDel={onBatchDel}
        onEdit={onEdit}
        onDetail={onDetail}
        onDel={onDel}
        onPrint={onPrint}
        onRefresh={onRefresh}
        setSelectedRows={setSelectedRows}
        its={selectedRows}
        onRecord={onRecord}
        importUrl={`${BASE_URL}/${api.device}/importDevices`}
      />
      <DeviceForm
        visible={formVisible}
        item={item}
        onSave={onSave}
        onCancel={onClose}
        codes = {codes}
        deviceCodes = {deviceCodes}
        institutionCodes = {institutionCodes}
      />
      <PrintForm item={item} visible={printVisible} onSave={onPrintSave} onCancel={onPrintClose}/>
      <BatchPrintForm items={items} visible={batchPrintVisible} onSave={onBatchPrintSave} onCancel={onBatchPrintClose}/>
      <DeviceDetail
          visible={detailVisible}
          onSave={onDetailSave}
          item={item}
          onCancel={onDetailClose}
      />
      <RecordForm item={item} visible={recordFormVisible} onSave={onRecordSave} onCancel={onRecordClose} datas={deviceRecord}  />
    </StyledContainer>
  );
};

export default Device;
