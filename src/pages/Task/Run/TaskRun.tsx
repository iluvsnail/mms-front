import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import {useHistory, useLocation,useParams} from "react-router-dom";
import { StyledContainer } from "../../../components/StyledComponents";
import TaskRunCriterionTable from "./TaskRunCriterionTable";
import {ICodecriterion} from "../../../models/codecriterion";
import {
  asyncGetCriterionData,
  asyncGetCodeData,
  asyncGetTaskDeviceData,
  asyncGetSelectedData,
  asyncPutTaskDevice,
  asyncDownloadTemplate,
  asyncBatchReceiveTaskDevice, asyncBatchSendTaskDevice, asyncBatchUploadTaskDevice
} from "./taskrun.services";
import {Button, Col, Divider, message, Row, Tabs,Form,Input} from "antd";
import {ITask} from "../../../models/task";
import {useTranslation} from "react-i18next";
import {ICriterion} from "../../../models/criterion";
import {IDevice} from "../../../models/device";
import {ITaskDevice} from "../../../models/taskdevice";
import TaskRunDeviceTable from "./TaskRunDeviceTable";
import TaskRunDetectedDeviceTable from "./TaskRunDetectedDeviceTable";
import TaskRunSendTable from "./TaskRunSendTable";
import {asyncBatchRevoke, asyncFinishTask, asyncPutTask, asyncSaveCriterions} from "../task.services";
import dayjs from "dayjs";
import log from "loglevel";
import ReceiveForm from "./ReceiveForm";
import SendForm from "./SendForm";
import UploadReportForm from "./UploadReportForm";
import ScanForm from "./ScanForm";
import BatchReceiveForm from "./BatchReceiveForm";
import BatchSendForm from "./BatchSendForm";
import BatchUploadForm from "./BatchUploadForm";
import {ICertificate} from "../../../models/certificate";
import PrintForm from "./PrintForm";

const TaskRun: FC = () => {
  const [criterionList, setCriterionList] = useState<ICriterion[]>([]);
  const [deviceList, setDeviceList] = useState<IDevice[]>([]);
  const [taskDeviceList, setTaskDeviceList] = useState<ITaskDevice[]>([]);
  const [codes,setCodes] = useState<ICodecriterion[]>([]);
  const [codeV,setCodeV] = useState<string>("");
  const [formVisible, setFormVisible] = useState(false);
  const [sendFormVisible, setSendFormVisible] = useState(false);
  const [sendEditVisible, setSendEditFormVisible] = useState(false);
  const [uploadFormVisible, setUploadFormVisible] = useState(false);
  const [scanFormVisible, setScanFormVisible] = useState(false);
  const [printVisible, setPrintVisible] = useState(false);


  const [batchReceiveFormVisible, setBatchReceiveFormVisible] = useState(false);
  const [batchReceiveTaskDeviceList, setBatchReceiveTaskDeviceList] = useState<ITaskDevice[]>([]);

  const [batchSendFormVisible, setBatchSendFormVisible] = useState(false);
  const [batchSendTaskDeviceList, setBatchSendTaskDeviceList] = useState<ITaskDevice[]>([]);

  const [batchUploadFormVisible, setBatchUploadFormVisible] = useState(false);
  const [batchUploadTaskDeviceList, setBatchUploadTaskDeviceList] = useState<ITaskDevice[]>([]);

  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState<ITask>();
  const [receivedItem, setReceivedItem] = useState<ITaskDevice>();
  const [scanItem, setScanItem] = useState<ITaskDevice>();
  const [sendItem, setSendItem] = useState<ITaskDevice>();
  const [editItem, setEditItem] = useState<ITaskDevice>();
  const [uploadItem, setUploadItem] = useState<ITaskDevice>();
  const [printItem, setPrintItem] = useState<ITaskDevice>();
  const [params, setParams] = useState<Record<string, unknown>>();
  const [deviceParams, setDeviceParams] = useState<Record<string, unknown>>();
  const [form] = Form.useForm();
  const location = useLocation();
  let [selectedRows,setSelected]=useState<string[]>([])
  let [selectedDeviceRows,setDeviceSelected]=useState<string[]>([])
  //
  useEffect(() => {
    setItem(location.state ? location.state as ITask : undefined);
    if (item && form) {
      form.setFieldsValue(item);
    }
  }, [item, form]);
  const { t } = useTranslation(["task", "common", "dict"]);
  const { TabPane } = Tabs;
  useEffect(()=>{
    setSelected(selectedRows)
  },[selectedRows])

  useEffect(()=>{
    setDeviceSelected(selectedDeviceRows)
  },[selectedDeviceRows])

  const loadCriterionData = useCallback(() => {
    setLoading(true);
    asyncGetCriterionData((res) => {
      setLoading(false);
      if (res.isOk) {
        setCriterionList(res.data);
      }
    });
    asyncGetCodeData((res) => {
      if (res.isOk) {
        setCodes(res.data);
      }
    });
  }, []);

  useEffect(() => {
    loadCriterionData();
    return () => setCriterionList([]);
  }, [loadCriterionData]);

  const loadTaskDeviceData = useCallback(() => {
    if(item){
      setLoading(true);
      asyncGetTaskDeviceData(item.id,(res) => {
        setLoading(false);
        if (res.isOk) {
          setTaskDeviceList(res.data);
        }
      });
    }
  }, [item]);

  useEffect(() => {
    loadTaskDeviceData();
    return () => setTaskDeviceList([]);
  }, [loadTaskDeviceData]);

  const loadSelectedData = useCallback(() => {
    if(item){
      asyncGetSelectedData(item.id,(res) => {
        if (res.isOk) {
          setSelected(res.data);
        }
      });
    }

  }, [item]);

  useEffect(() => {
    loadSelectedData();
    return () => setSelected([]);
  }, [loadSelectedData]);

  const filteredCriterionList = useMemo(() => {
    if (params) {
      let result = [...criterionList];
      if (params.instrumentName) {
        result = result.filter(r => r.instrumentName?.includes(params.instrumentName as string));
      }
      return result;
    }
    if (codeV) {
      let result = [...criterionList];
      result = result.filter(r => r.criterion.id == codeV);
      return result;
    }
    return criterionList;

  }, [params, criterionList,codeV]);

  const filteredDeviceList = useMemo(() => {
    if (deviceParams) {
      let result = [...deviceList];
      if (deviceParams.deviceName) {
        result = result.filter(r => r.deviceName?.includes(deviceParams.deviceName as string));
      }
      return result;
    }
    return deviceList;
  }, [deviceParams, deviceList]);
  //组装taskdevice
  useEffect(() => {
    debugger;
    if(deviceList && deviceList.length>0){
      const tdl:ITaskDevice[] = []
      deviceList.map((device)=>{
        let taskDevice:ITaskDevice={
          endPerson: "",
          sendDate: 0,
          validDate:0,
          sendPerson: "",
          detectedDate: 0,
          detectedPerson: "",
          receivedDate: 0,
          receivedPerson: "",
          sendDetectedPerson: "",
          createDate: 0,
          device: device,
          id: "",
          isDelete: "0",
          task: item,
          updateDate: 0,
          status:"0"
        };
        taskDeviceList.map((td)=>{
          if(td.device.id == device.id) taskDevice =td;
        })
        tdl.push(taskDevice);
      })
      setTaskDeviceList(tdl);
    }
  }, [deviceList]);
  const filteredTaskDeviceList = useMemo(() => {
    if (deviceParams) {
      let result = [...taskDeviceList];
      if (deviceParams.showAdded) {
        result = result.filter(r => r.status == "1" || r.status == "2"|| r.status == "3"|| r.status == "4"|| r.status == "5");
      }
      return result;
    }
    return taskDeviceList;
  }, [deviceParams, taskDeviceList]);

  const onCodeChange = (v:string)=>{
    setCodeV(v)
  }
  const onSearch = (v:string)=>{
    setParams({"instrumentName":v})
  }
  const onDeviceSearch = (v:string)=>{
    setDeviceParams({"deviceName":v})
  }
  const onShowAdded = (v:boolean)=>{
    setDeviceParams({"showAdded":v})
  }
  const setSelectedRows=(its:string[])=>{
    setSelected(its)
  }
  const onFinish = useCallback((data: ITask) => {
    asyncFinishTask(data, (res) => {
      if (res.isOk) {
        message.success("操作成功");
        if(res.data) setItem(res.data)
      }
    });
  }, []);
  const onSave = useCallback(
      (data: ITask) => {
        asyncPutTask(data, (res) => {
          if (res.isOk) {
            console.log("保存任务信息成功");
          }
          //保存标准仪器
          asyncSaveCriterions(selectedRows,data.id,(res)=>{
            if (res.isOk) {
              message.success("保存成功");
            }
          });
        });

      },
      [selectedRows]
  );
  const onOk = useCallback(() => {
    form
        .validateFields()
        .then((values) => {
          const now = dayjs().valueOf();
          onSave({
            ...values,
            createDate: values.createDate || now,
            updateDate: now,
          });
        })
        .catch((e) => {
          log.error(e);
        });

  }, [form, onSave]);

  const onReceiveClose = useCallback(() => {
    setReceivedItem(undefined);
    setFormVisible(false);
  }, []);

  const onSaveReceive = useCallback(
      (data: ITaskDevice) => {
        setLoading(true);
        if(data.status=="0") data.status="1";
        asyncPutTaskDevice(data, (res) => {
          setLoading(false);
          if (res.isOk) {
            setTaskDeviceList((prev) =>
                prev.map((p) => {
                  if (p.device.id === data.device.id) {
                    return res.data;
                  }
                  return p;
                })
            );
              message.success("操作成功");
            onReceiveClose();
          }
        });
      },
      [onReceiveClose]
  );
  const onScanClose = useCallback(() => {
    setScanItem(undefined);
    setScanFormVisible(false);
  }, []);
  const onBatchReceivedClose = useCallback(() => {
    setBatchReceiveTaskDeviceList([]);
    setBatchReceiveFormVisible(false);
  }, []);
  const onBatchSendClose = useCallback(() => {
    setBatchSendTaskDeviceList([]);
    setBatchSendFormVisible(false);
  }, []);
  const onBatchUploadClose = useCallback(() => {
    setBatchUploadTaskDeviceList([]);
    setBatchUploadFormVisible(false);
  }, []);
  const onSaveScan = useCallback(
      (data: ITaskDevice) => {
        setLoading(true);
        if(data.status=="0" || !data.status) data.status="1";
        asyncPutTaskDevice(data, (res) => {
          setLoading(false);
          if (res.isOk) {
            setTaskDeviceList((prev) =>
                prev.map((p) => {
                  if (p.device.factoryNumber == data.device.factoryNumber) {
                    return res.data;
                  }
                  return p;
                })
            );
            message.success("操作成功");
            onScanClose();
          }
        });
      },
      [onScanClose]
  );
  const onBatchReceivedSave = useCallback(
      (data: any) => {
        setLoading(true);
        asyncBatchReceiveTaskDevice(data, (res) => {
          setLoading(false);
          if (res.isOk) {
            setTaskDeviceList((prev) =>
                prev.map((p) => {
                  for(let idx in res.data){
                    let td = res.data[idx];
                    if(td.id == p.id) return td;
                  }
                  return p;
                })
            );
            message.success("操作成功");
            onBatchReceivedClose();
          }
        });
      },
      [onBatchReceivedClose]
  );
  const onBatchSendSave = useCallback(
      (data: any) => {
        setLoading(true);
        asyncBatchSendTaskDevice(data, (res) => {
          setLoading(false);
          if (res.isOk) {
            setTaskDeviceList((prev) =>
                prev.map((p) => {
                  for(let idx in res.data){
                    let td = res.data[idx];
                    if(td.id == p.id) return td;
                  }
                  return p;
                })
            );
            message.success("操作成功");
            onBatchSendClose();
          }
        });
      },
      [onBatchSendClose]
  );

  const onBatchUploadSave = useCallback(
      (data: any) => {
        setLoading(true);
        asyncBatchUploadTaskDevice(data, (res) => {
          setLoading(false);
          if (res.isOk) {
            setTaskDeviceList((prev) =>
                prev.map((p) => {
                  for(let idx in res.data){
                    let td = res.data[idx];
                    if(td.id == p.id) return td;
                  }
                  return p;
                })
            );
            message.success("操作成功");
            onBatchUploadClose();
          }
        });
      },
      [onBatchUploadClose]
  );

  const onReceived = useCallback((editItem: ITaskDevice) => {
    setReceivedItem(editItem);
    setFormVisible(true);
  }, []);

  const onSendClose = useCallback(() => {
    setSendItem(undefined);
    setSendFormVisible(false);
  }, []);
  const onSendEditClose = useCallback(() => {
    setEditItem(undefined);
    setSendEditFormVisible(false);
  }, []);

  const onSaveSend = useCallback(
      (data: ITaskDevice) => {
        setLoading(true);
        data.status="3";
        asyncPutTaskDevice(data, (res) => {
          setLoading(false);
          if (res.isOk) {
            setTaskDeviceList((prev) =>
                prev.map((p) => {
                  if (p.device.factoryNumber == data.device.factoryNumber) {
                    return res.data;
                  }
                  return p;
                })
            );
            message.success("操作成功");
            onSendClose();
          }
        });
      },
      [onSendClose]
  );
  const onSaveSendEdit = useCallback(
      (data: ITaskDevice) => {
        setLoading(true);
        asyncPutTaskDevice(data, (res) => {
          setLoading(false);
          if (res.isOk) {
            setTaskDeviceList((prev) =>
                prev.map((p) => {
                  if (p.id == data.id) {
                    return res.data;
                  }
                  return p;
                })
            );
            message.success("保存成功");
            onSendEditClose();
          }
        });
      },
      [onSendEditClose]
  );
  const onSend = useCallback((editItem: ITaskDevice) => {
    setSendItem(editItem);
    setSendFormVisible(true);
  }, []);
  const onEdit = useCallback((editItem: ITaskDevice) => {
    setEditItem(editItem);
    setSendEditFormVisible(true);
  }, []);
  //uploadReport
  const onUploadClose = useCallback(() => {
    setUploadItem(undefined);
    setUploadFormVisible(false);
  }, []);

  const onSaveUpload = useCallback(
      (data: ITaskDevice) => {
        setLoading(true);
        data.status="2";
        asyncPutTaskDevice(data, (res) => {
          setLoading(false);
          if (res.isOk) {
            setTaskDeviceList((prev) =>
                prev.map((p) => {
                  if (p.device.id === data.device.id) {
                    return res.data;
                  }
                  return p;
                })
            );
            message.success("操作成功");
            onUploadClose();
          }
        });
      },
      [onUploadClose]
  );
  const onUpload = useCallback((editItem: ITaskDevice) => {
    setUploadItem(editItem)
    setUploadFormVisible(true);
  }, []);
  /////////

  const onRevoke = useCallback(
      (data: ITaskDevice) => {
        setLoading(true);
        data.status="4";
        asyncPutTaskDevice(data, (res) => {
          setLoading(false);
          if (res.isOk) {
            setTaskDeviceList((prev) =>
                prev.map((p) => {
                  if (p.device.id === data.device.id) {
                    return res.data;
                  }
                  return p;
                })
            );
            message.success("操作成功");
            onReceiveClose();
          }
        });
      },
      [onReceiveClose]
  );
  const onDownloadTemplate = useCallback((data: ITaskDevice) => {
    asyncDownloadTemplate(data);
  }, []);
  const onBatchRevoke=useCallback((its:string[]) => {
    asyncBatchRevoke(its, (res) => {
      if (res.isOk) {
        message.success("操作成功");
        setTaskDeviceList((prev) =>
            prev.map((p) => {
              its.map(it=>{
                if(it==p.id){
                  p.status = "4";
                }
              })
              return p;
            })
        );
      }
    });
  },[]);
  const onBatchReceived=useCallback((its:string[]) => {
    const rst = new Array();
    its.map(it=>{
      taskDeviceList.filter(td=>td.id==it).filter(td=>{
        rst.push(td)
      })
    })
    setBatchReceiveTaskDeviceList(rst);
    setBatchReceiveFormVisible(true);
  },[taskDeviceList]);
  const onBatchSend=useCallback((its:string[]) => {
    const rst = new Array();
    its.map(it=>{
      taskDeviceList.filter(td=>td.id==it).filter(td=>{
        rst.push(td)
      })
    })
    setBatchSendTaskDeviceList(rst);
    setBatchSendFormVisible(true);
  },[taskDeviceList]);
  const onBatchUploadReport=useCallback((its:string[]) => {
    const rst = new Array();
    its.map(it=>{
      taskDeviceList.filter(td=>td.id==it).filter(td=>{
        rst.push(td)
      })
    })
    setBatchUploadTaskDeviceList(rst);
    setBatchUploadFormVisible(true);
  },[taskDeviceList]);
  const onScan = useCallback(() => {
    setScanFormVisible(true);
  }, []);
  const onPrint = useCallback((editItem: ITaskDevice) => {
    setPrintItem(editItem);
    setPrintVisible(true);
  }, []);
  const onPrintClose = useCallback(() => {
    setPrintItem(undefined);
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
      <StyledContainer style={{padding: "24px"}}>
        <>
          <Form form={form}>
            <Row>
              <Col span={5}><Form.Item
                  label={t("name")}
                  name="name"
                  rules={[{required: true}]}
              >
                <Input/>
              </Form.Item></Col>
            </Row>
            <Row>
              <Col span={5}><Form.Item
                  label={t("dutyPerson")}
                  name="dutyPerson"
                  rules={[{required: true}]}
              >
                <Input/>
              </Form.Item></Col>
              <Col span={5}><Form.Item
                  label={t("startDate")}
                  name="startDate"
                  rules={[{required: true}]}
              >
                <Input/>
              </Form.Item></Col>
              <Col span={5}><Form.Item
                  label={t("finishDate")}
              >
                {item?.finishDate}
              </Form.Item></Col>
              <Col span={4}><Form.Item
                  label={t("currentStatus")}
              >{item?t("status"+item.status):""}
              </Form.Item></Col>
            </Row>
            <Row style={{"display":"none"}}>
              <Form.Item name="id"><Input/></Form.Item>
              <Form.Item name="createDate"><Input/></Form.Item>
              <Form.Item name="createUser"><Input/></Form.Item>
              <Form.Item name="detectedDeviceCount"><Input/></Form.Item>
              <Form.Item name="finishDate"><Input/></Form.Item>
              <Form.Item name="instrumentCount"><Input/></Form.Item>
              <Form.Item name="isDelete"><Input/></Form.Item>
              <Form.Item name="receivedDeviceCount"><Input/></Form.Item>
              <Form.Item name="sentDeviceCount"><Input/></Form.Item>
              <Form.Item name="status"><Input/></Form.Item>
              <Form.Item name="updateDate"><Input/></Form.Item>
            </Row>
          </Form>
          <Divider></Divider>
          <Tabs defaultActiveKey="1">
            <TabPane tab={t("instrument")} key="1">
              <TaskRunCriterionTable
                  data={filteredCriterionList}
                  loading={loading}
                  setSelectedRows={setSelectedRows}
                  its={selectedRows}
                  codes={codes}
                  onCodeChange={onCodeChange}
                  onSearch={onSearch}
              />
            </TabPane>
            <TabPane tab={t("received")} key="2">
              <TaskRunDeviceTable
                  data={filteredTaskDeviceList}
                  its={selectedDeviceRows}
                  loading={loading}
                  setSelectedRows={setDeviceSelected}
                  onShowAdded={onShowAdded}
                  onScan={onScan}
                  onBatchReceived={onBatchReceived}
                  onBatchRevoke={onBatchRevoke}
                  onReceived={onReceived}
                  onRevoke = {onRevoke}
              />
            </TabPane>
            <TabPane tab={t("detected")} key="3">

              <TaskRunDetectedDeviceTable
                  data={filteredTaskDeviceList}
                  its={selectedDeviceRows}
                  loading={loading}
                  setSelectedRows={setDeviceSelected}
                  onShowAdded={onShowAdded}
                  onBatchRevoke={onBatchRevoke}
                  onRevoke = {onRevoke}
                  onDownloadTemplate={onDownloadTemplate}
                  onUpload = {onUpload}
                  onBatchUploadReport={onBatchUploadReport}
                  onPrint={onPrint}
              />
            </TabPane>
            <TabPane tab={t("sent")} key="4">

              <TaskRunSendTable
                  data={filteredTaskDeviceList}
                  its={selectedDeviceRows}
                  loading={loading}
                  setSelectedRows={setDeviceSelected}
                  onShowAdded={onShowAdded}
                  onBatchRevoke={onBatchRevoke}
                  onRevoke = {onRevoke}
                  onSend = {onSend}
                  onEdit={onEdit}
                  onBatchSend={onBatchSend}
              />
            </TabPane>
          </Tabs>
          <Divider></Divider>
          <Row>
            <Col span={2} offset={9}><Button type="primary" onClick={() => {
              if(item)onFinish(item)
            }} title={t("finish")}>
              {t("finish")}
            </Button></Col>
            <Col span={2}><Button onClick={() => {
              onOk()
            }} title={t("save")}>
              {t("save")}
            </Button></Col>
          </Row>
          <ReceiveForm  item={receivedItem} visible={formVisible} onSave={onSaveReceive} onCancel={onReceiveClose}></ReceiveForm>
          <SendForm  item={sendItem} visible={sendFormVisible} onSave={onSaveSend} onCancel={onSendClose}></SendForm>
          <SendForm  item={editItem} visible={sendEditVisible} onSave={onSaveSendEdit} onCancel={onSendEditClose}></SendForm>
          <UploadReportForm  item={uploadItem} visible={uploadFormVisible} onSave={onSaveUpload} onCancel={onUploadClose}></UploadReportForm>
          <ScanForm  item={scanItem} task={item} visible={scanFormVisible} onSave={onSaveScan} onCancel={onScanClose}></ScanForm>
          <BatchReceiveForm visible={batchReceiveFormVisible} onSave={onBatchReceivedSave} onCancel={onBatchReceivedClose} datas={batchReceiveTaskDeviceList}/>
          <BatchSendForm visible={batchSendFormVisible} onSave={onBatchSendSave} onCancel={onBatchSendClose} datas={batchSendTaskDeviceList}/>
          <BatchUploadForm visible={batchUploadFormVisible} onSave={onBatchUploadSave} onCancel={onBatchUploadClose} datas={batchUploadTaskDeviceList}/>
          <PrintForm item={printItem} visible={printVisible} onSave={onPrintSave} onCancel={onPrintClose}/>
          </>
      </StyledContainer>
  );
};

export default TaskRun;