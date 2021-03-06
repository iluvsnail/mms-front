import React, { FC, useCallback, useEffect, useMemo, useState} from "react";
import { StyledContainer } from "../../../components/StyledComponents";
import {
  asyncDelDeviceType, asyncDeviceType, asyncDownloadTemplate,
  asyncGetDeviceTypeData,
  asyncPutDeviceType,
} from "./deviceType.services";
import DeviceTypeForm from "./DeviceTypeForm";
import {message, Row, Col, Divider, Tree, Popconfirm, Button, Form, Input, Upload, Image, Spin} from "antd";
import { PlusCircleTwoTone, FormOutlined,DeleteOutlined} from '@ant-design/icons';
import {IDeviceType} from "../../../models/devicetype";
import {useTranslation} from "react-i18next";
import {BASE_URL} from "../../../utils/apiUtils";
import api from "../../../configs/api";
import {asyncGetCodeData} from "../../Device/device.services";
import {ICodecriterion} from "../../../models/codecriterion";
const DeviceType: FC = () => {
  const { t } = useTranslation(["deviceType", "common", "dict"]);
  const [list, setList] = useState<IDeviceType[]>([]);
  const [pt, setPt] = useState<string>("");
  const [level, setLevel] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [fileList,setFileList] =useState<any[]>([]);
  const [item, setItem] = useState<IDeviceType>();
  const [editItem, setEditItem] = useState<IDeviceType>();
  const [formVisible, setFormVisible] = useState(false);
  const [treeData,setTreeData] = useState<{key:string}[]>([])
  let [selectedRows,setSelected]=useState<string[]>([])
  const [codes,setCodes] = useState<ICodecriterion[]>([]);
  const [spinning, setSpinning] = useState<boolean>(true);
  const [form] = Form.useForm();
  useEffect(() => {
    if (item && form) {
      form.setFieldsValue(item);
    }
  }, [ item]);
  useEffect(()=>{
    setSelected(selectedRows)
  },[selectedRows])
  const loadData = useCallback(() => {
    setSpinning(true);
    asyncGetDeviceTypeData((res) => {
      if (res.isOk) {
        setList(res.data);
      }
      setSpinning(false);
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

  const setTreeDatas = useCallback(()=>{
    const tda=new Array();
    const children = new Map();
    //???????????????list?????????????????????
    list.map((it)=>{
        let title = (<></>);
        if(it.level=="0"){
          title = (<>
            {it.name}
            <FormOutlined style={{"margin":"0px 0px 0px 25px"}} onClick={()=>onEdit(it)}/>

            <Popconfirm
                onConfirm={(e) => onDel(it,e)}
                onCancel={e=>e?.stopPropagation()}
                title={t("common:confirmDelete")}
            >
              <DeleteOutlined style={{"margin":"0px 0px 0px 5px"}}/>
            </Popconfirm>
            <PlusCircleTwoTone  style={{"margin":"0px 0px 0px 5px"}} onClick={()=>onAddDeviceType(it.id,it.level)}/>
          </>);
          tda.push({
            title: title,
            key:it.id
          })
        }else if(it.level=="1"){
          title = (<>
            {it.name}
            <FormOutlined style={{"margin":"0px 0px 0px 25px"}} onClick={()=>onEdit(it)}/>
            <Popconfirm
                onConfirm={(e) => onDel(it,e)}
                onCancel={e=>e?.stopPropagation()}
                title={t("common:confirmDelete")}
            >
            <DeleteOutlined style={{"margin":"0px 0px 0px 5px"}}/>
            </Popconfirm>
            <PlusCircleTwoTone  style={{"margin":"0px 0px 0px 5px"}} onClick={()=>onBindDevice(it.id,it.level)}/>
          </>);
          if(!children.get(it.pt)){
            children.set(it.pt,new Array())
          }
          children.get(it.pt).push({
            title: title,
            key:it.id
          })
        }else if(it.level=="2"){
          title = (<>
            {it.name}
            <FormOutlined style={{"margin":"0px 0px 0px 25px"}} onClick={()=>onEdit(it)}/>
            <Popconfirm
                onConfirm={(e) => onDel(it,e)}
                onCancel={e=>e?.stopPropagation()}
                title={t("common:confirmDelete")}
            >
            <DeleteOutlined style={{"margin":"0px 0px 0px 5px"}}/>
            </Popconfirm>
          </>);
          if(!children.get(it.pt)){
            children.set(it.pt,new Array())
          }
          children.get(it.pt).push({
            title: title,
            key:it.id
          })
        }
    })
    //?????????????????????????????????
    list.filter((v)=>v.level=="0").map(it=>{
      const p=children.get(it.id);
      if(p){
        for (let cdr in p) {
          const pp=children.get(p[cdr].key)
          if(pp){
            if(!p[cdr].children) p[cdr].children=new Array();
            p[cdr].children=pp
          }
        }
      }
    })
    //???????????????tda??????????????????
    for (let td of tda) {
      if(children.get(td.key)){
        td.children=children.get(td.key);
      }
    }
    setTreeData(tda)
  },[list])

  useEffect(() => {
      setTreeDatas();
    return () => setTreeData([]);
  }, [list]);

  const onAdd = useCallback(() => {
    setFormVisible(true);
  }, []);
  const onEdit = useCallback((editItem: IDeviceType) => {
    setEditItem(editItem);
    setFormVisible(true);
  }, []);
  const onClose = useCallback(() => {
    setEditItem(undefined);
    setFormVisible(false);
  }, []);

  const onDel = useCallback((data: IDeviceType,e) => {
    if(e)e.stopPropagation();
    asyncDelDeviceType(data, (res) => {
      if (res.isOk) {
        message.success("????????????");
        setItem(undefined);
        setList((prev) => prev.filter((p) => p.id !== data.id));
      }
    });
  }, []);
  const refreshItem = useCallback((data: IDeviceType) => {
    asyncDeviceType(data, (res) => {
      if (res.isOk) {
        setItem(res.data);
        setList((prev) => prev.map(pre=>{
          if(pre.id==res.data.id) return res.data;
          return pre;
        }));
      }
    });
  }, []);
  const onSave = useCallback(
    (data: IDeviceType) => {
      setLoading(true);
      if(data.pt){
        if(Array.isArray(data.pt) && data.pt.length){
          data.pt=data.pt[0]
        }
      }
        asyncPutDeviceType(data, (res) => {
          setLoading(false);
          if (res.isOk) {
            let flg = false;
            setItem(res.data);
            setList((prev) =>
              prev.map((p) => {
                if (p.id == data.id) {
                  flg=true;
                  return res.data;
                }
                return p;
              })
            );
            if(flg){
              message.success("????????????");
            }else{
              message.success("????????????");
            }
            if(!flg){
              debugger;
              setList((prev) => [res.data, ...prev]);
            }
            onClose();
          }
        });
    },
    [onClose]
  );


  const onAddDeviceType=useCallback((pt?,level?)=>{
    if(pt && pt.length) setPt(pt)
    setLevel(level)
    setFormVisible(true);
  },[])
  const onBindDevice=useCallback((pt?,level?)=>{
    if(pt && pt.length) setPt(pt)
    if(level || level =="0") setLevel(level)
    setFormVisible(true);
  },[])
  const onSelect = (selectedKeys:any[], info:any) => {
    if(selectedKeys && selectedKeys.length>0){
      const sk = selectedKeys[0]
      list.filter(ist=>ist.id==sk).forEach(v=>{
        if(v.level=="2"){
          setItem(v)
          setFileList([])
        }else{
          setItem(undefined)
        }
      })
    }
  };
  const onDownloadTemplate = useCallback(() => {
    asyncDownloadTemplate(item);
  }, [item]);
  const props = {
    name: 'file',
    action: `${BASE_URL}/${api.deviceType}/upload/${item?.id}`,
    accept:".xlsx",
    headers: {
      authorization: 'authorization-text',
    },
    withCredentials:true,
    showUploadList:false,
    onChange(info:any) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        if(item) refreshItem(item);
        message.success(`${info.file.name} ??????????????????`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} ??????????????????`);
      }
      setFileList(info.fileList);
    },
  };

  return (
    <StyledContainer>
        <Row>
          <Col span={8}>
            <Divider></Divider>
            ???????????????????????????<PlusCircleTwoTone onClick={(e)=>onAddDeviceType(e)}/>
            <Divider></Divider>
            {treeData.length>0 &&
                <Spin spinning={spinning}>
                  <Tree
                      showLine={true}
                      treeData={treeData}
                      defaultExpandAll
                      onSelect={(sk,info)=>onSelect(sk,info)}
                  />
                </Spin>}
          </Col>
          <Col span={16} style={{display:`${item&&item.level=='2'?"block":"none"}`}}>
            <Form
                form={form}
                labelCol={{ span: 6 }}
                wrapperCol={{ offset: 1, span: 16 }}
            >
              <Form.Item
                  label={t("deviceName")}
                  name="name"
              >
                {item?.name}
              </Form.Item>
              <Form.Item
                  label={"????????????"}
                  name="standardType"
              >
                {item?.standardType}
              </Form.Item>
              <Form.Item
                  label={t("criterionName")}
                  name="criterion"
              >
                {item?.criterion?.criterionName}
              </Form.Item>
              <Form.Item
                  label={t("cycle")}
                  name="cycle"
              >
                {item?.cycle}
              </Form.Item>
              {
                item?.ys?(
                    <>
                    <Form.Item
                        label={t("downloadTemplate")}
                    >
                      <Button onClick={() =>onDownloadTemplate()} title={t("downloadTemplate")} type="link" style={{cursor: "pointer" }}>
                        {t("downloadTemplate")}
                      </Button>
                    </Form.Item>
                    <Form.Item label={t("preview")}></Form.Item>
                    </>
                ):""
              }
            </Form>

            <Divider></Divider>
            <Row>
              {item?.ys?.map(ys=>{
                return (<>
                <Image src={`${BASE_URL}/${api.deviceType}/${item?.id}/ysData/${ys}`}></Image>
                </>);
              })}
            </Row>
            <Row>
              <Col span={4} offset={10}>
                <Upload fileList={fileList} {...props}>
                <Button type="primary"  title={t("upload")}>
                   {t("uploadTemplate")}
                </Button>
                </Upload>
              </Col>
            </Row>
          </Col>
        </Row>
      <DeviceTypeForm
          visible={formVisible}
          onSave={onSave}
          onCancel={onClose}
          pt={pt}
          level={level}
          item={editItem}
          codes={codes}
      ></DeviceTypeForm>
    </StyledContainer>
  );
};

export default DeviceType;
