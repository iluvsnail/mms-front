import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { StyledContainer } from "../../components/StyledComponents";
import CertificateSearch from "./CertificateSearch";
import CertificateTable from "./CertificateTable";
import {ICodecriterion} from "../../models/codecriterion";
import {
  asyncDelDevice,
  asyncGetCertificateData,
  asyncPutDevice,
  asyncGetCodeData,
  asyncDelDevices,
  asyncLockUser,
  asyncResetPassword,
  asyncLockUsers,
  asyncResetUsersPassword, asyncExportCertificates,asyncPrintItem
} from "./certificate.services";
import CertificateForm from "./CertificateForm";
import { message } from "antd";
import {ICertificate} from "../../models/certificate";
import CertificateDetail from "./CertificateDetail";
import PrintForm from "./PrintForm";

const Certificate: FC = () => {
  const [list, setList] = useState<ICertificate[]>([]);
  const [codes,setCodes] = useState<ICodecriterion[]>([]);
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState<ICertificate>();
  const [formVisible, setFormVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [params, setParams] = useState<Record<string, unknown>>();
  let [selectedRows,setSelected]=useState<string[]>([])
  const [printVisible, setPrintVisible] = useState(false);
  useEffect(()=>{
    setSelected(selectedRows)
  },[selectedRows])
  const loadData = useCallback(() => {
    setLoading(true);
    asyncGetCertificateData((res) => {
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
    asyncDelDevices(its, (res) => {
      if (res.isOk) {
        message.success("删除成功");
        onRefresh()
      }
    });
  },[]);
  const onBatchLock = useCallback((its:string[]) => {
    asyncLockUsers(its, (res) => {
      if (res.isOk) {
        message.success("锁定用户成功");
        onRefresh()
      }
    });
  }, []);
  const onBatchResetPassword = useCallback((its:string[]) => {
    asyncResetUsersPassword(its, (res) => {
      if (res.isOk) {
        message.success("重置密码成功");
        onRefresh()
      }
    });
  }, []);
  const onEdit = useCallback((editItem: ICertificate) => {
    setItem(editItem);
    setFormVisible(true);
  }, []);
  const onTodo = useCallback((editItem: ICertificate) => {
    message.warn("待实现！");
  }, []);
  const onBatchTodo = useCallback((its:string[]) => {
    message.warn("待实现！");
  }, []);
  const onDetail = useCallback((editItem: ICertificate) => {
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

  const onDel = useCallback((data: ICertificate) => {
    asyncDelDevice(data, (res) => {
      if (res.isOk) {
        message.success("删除成功");
        setList((prev) => prev.filter((p) => p.id !== data.id));
      }
    });
  }, []);
  const onResetPassword = useCallback((data: ICertificate) => {
    asyncResetPassword(data, (res) => {
      if (res.isOk) {
        message.success("重置密码成功");
        setList((prev) =>
            prev.map((p) => {
              if (p.id === data.id) {
                return res.data;
              }
              return p;
            })
        );
      }
    });
  }, []);
  const onLock = useCallback((data: ICertificate) => {
    asyncLockUser(data, (res) => {
      if (res.isOk) {
        message.success("冻结用户成功");
        setList((prev) =>
            prev.map((p) => {
              if (p.id === data.id) {
                return res.data;
              }
              return p;
            })
        );
      }
    });
  }, []);
  const onSave = useCallback(
    (data: ICertificate) => {
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
  const onDetailSave = useCallback(
      (data: ICertificate) => {
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
    if (params.certificateNumber) {
      result = result.filter(r => r.certificateNumber.includes(params.certificateNumber as string));
    }
    if (params.deviceName) {
      result = result.filter(r => r.device.deviceName.includes(params.deviceName as string));
    }
    if (params.verifyResult) {
      result = result.filter(r => r.verifyResult.includes(params.verifyResult as string));
    }
    if (params.entrustUnit) {
      result = result.filter(r => r.entrustUnit.includes(params.entrustUnit as string));
    }
    return result;
  }, [params, list]);

  const setSelectedRows=(its:string[])=>{
    setSelected(its)
  }
  const onBatchExport = useCallback((its:string[]) => {
    asyncExportCertificates(its);
  }, []);
  const onPrint = useCallback((editItem: ICertificate) => {
    setPrintVisible(true);
    asyncPrintItem(editItem, (res) => {
      if (res.isOk) {
        setItem(res.data);
      }
    });
  }, []);
  const onPrintClose = useCallback(() => {
    setItem(undefined);
    setPrintVisible(false);
  }, []);
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
  return (
    <StyledContainer>
      <CertificateSearch
          onSearch={onSearch}
          codes = {codes}/>
      <CertificateTable
        data={filteredList}
        loading={loading}
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
        onPrint={onPrint}
      />
      <CertificateForm
        visible={formVisible}
        item={item}
        onSave={onSave}
        onCancel={onClose}
        codes = {codes}
      />
      <CertificateDetail
          visible={detailVisible}
          onSave={onDetailSave}
          item={item}
          onCancel={onDetailClose}
      />
      <PrintForm item={item} visible={printVisible} onSave={onPrintSave} onCancel={onPrintClose}/>
    </StyledContainer>
  );
};

export default Certificate;
