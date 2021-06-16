import React, { FC, useCallback, useEffect, useMemo, useState} from "react";
import { StyledContainer } from "../../../components/StyledComponents";
import {ICodecriterion} from "../../../models/codecriterion";
import {
  asyncDelInstitution,
  asyncGetInstitutionData,
  asyncPutInstitution,
} from "./institution.services";
import InstitutionForm from "./InstitutionForm";
import {message, Row, Col, Divider, Tree, Popconfirm, Button} from "antd";
import {ICriterion} from "../../../models/criterion";
import { PlusCircleTwoTone, FormOutlined,DeleteOutlined} from '@ant-design/icons';
import {IDeviceType} from "../../../models/devicetype";
import {useTranslation} from "react-i18next";
import {IInstitution} from "../../../models/institution";
import InstitutionDetail from "./InstitutionDetail";
const Institution: FC = () => {
  const { t } = useTranslation(["deviceType", "common", "dict"]);
  const [list, setList] = useState<IInstitution[]>([]);
  const [pt, setPt] = useState<string>("");
  const [level, setLevel] = useState<string>("");
  const [codes,setCodes] = useState<ICodecriterion[]>([]);
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState<IInstitution>();
  const [formVisible, setFormVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [params, setParams] = useState<Record<string, unknown>>();
  const [treeData,setTreeData] = useState<{key:string}[]>([])
  let [selectedRows,setSelected]=useState<string[]>([])
  useEffect(()=>{
    setSelected(selectedRows)
  },[selectedRows])
  const loadData = useCallback(() => {
    asyncGetInstitutionData((res) => {
      if (res.isOk) {
        setList(res.data);
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
    //第一次遍历list，设置相关信息
    list.map((it)=>{
        let title = (<></>);
        if(it.level=="0"){
          title = (<>
            {it.unitName}
            <FormOutlined style={{"margin":"0px 0px 0px 25px"}} onClick={(e)=>onEdit(it,e)}/>

            <Popconfirm
                onConfirm={(e) => onDel(it,e)}
                onCancel={e=>e?.stopPropagation()}
                title={t("common:confirmDelete")}
            >
              <DeleteOutlined style={{"margin":"0px 0px 0px 5px"}} onClick={e=>e.stopPropagation()}/>
            </Popconfirm>
            <PlusCircleTwoTone  style={{"margin":"0px 0px 0px 5px"}} onClick={(e)=>onAddInstitution(it.id,it.level,e)}/>
          </>);
          tda.push({
            title: title,
            key:it.id
          })
        }else if(it.level=="1"){
          title = (<>
            {it.unitName}
            <FormOutlined style={{"margin":"0px 0px 0px 25px"}} onClick={(e)=>onEdit(it,e)}/>
            <Popconfirm
                onConfirm={(e) => onDel(it,e)}
                onCancel={e=>e?.stopPropagation()}
                title={t("common:confirmDelete")}
            >
            <DeleteOutlined style={{"margin":"0px 0px 0px 5px"}} onClick={e=>e.stopPropagation()}/>
            </Popconfirm>
            <PlusCircleTwoTone  style={{"margin":"0px 0px 0px 5px"}} onClick={(e)=>onBindDevice(it.id,it.level,e)}/>
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
            {it.unitName}
            <FormOutlined style={{"margin":"0px 0px 0px 25px"}} onClick={(e)=>onEdit(it,e)}/>
            <Popconfirm
                onConfirm={(e) => onDel(it,e)}
                onCancel={e=>e?.stopPropagation()}
                title={t("common:confirmDelete")}
            >
            <DeleteOutlined style={{"margin":"0px 0px 0px 5px"}} onClick={e=>e.stopPropagation()}/>
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
    //第二次遍历，设置子节点
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
    //第三次遍历tda，设置子节点
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
  const onSelect = (selectedKeys:any[], info:any) => {
    let item ;
    if(selectedKeys && selectedKeys.length>0){
      const sk = selectedKeys[0]
      list.filter(ist=>ist.id==sk).forEach(v=>{
        item=v;
      })
      setItem(item)
      setDetailVisible(true)
    }
  };
  const onEdit = useCallback((editItem: IInstitution,e?) => {
    if(e)e.stopPropagation();
    setItem(editItem);
    setFormVisible(true);
  }, []);
  const onTodo = useCallback((editItem: ICriterion) => {
    message.warn("待实现！");
  }, []);
  const onBatchTodo = useCallback((its:string[]) => {
    message.warn("待实现！");
  }, []);
  const onDetail = useCallback((editItem: IInstitution) => {
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

  const onDel = useCallback((data: IInstitution,e?) => {
    if(e){
      e.stopPropagation();
    }
    asyncDelInstitution(data, (res) => {
      if (res.isOk) {
        message.success("删除成功");
        setList((prev) => prev.filter((p) => p.id !== data.id));
      }
    });
  }, []);
  const onSave = useCallback(
    (data: IInstitution) => {
      setLoading(true);
      if(data.pt){
        if(Array.isArray(data.pt) && data.pt.length){
          data.pt=data.pt[0]
        }
      }
        asyncPutInstitution(data, (res) => {
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
      (data: IInstitution) => {
      },
      [onClose]
  );

  const onAddInstitution=useCallback((pt?,level?,e?)=>{
    if(e)e.stopPropagation();
    if(pt && pt.length) setPt(pt)
    if(level || level =="0") setLevel(level)
    setFormVisible(true);
  },[])
  const onBindDevice=useCallback((pt?,level?,e?)=>{
    if(e)e.stopPropagation();
    if(pt && pt.length) setPt(pt)
    if(level || level =="0") setLevel(level)
    setFormVisible(true);
  },[])
  const onClick2=useCallback((e,parent?:string)=>{
    e.stopPropagation()
    message.warn("bbb")
  },[])
  return (
    <StyledContainer>
        <Row>
          <Col span={8}>
            <Divider></Divider>
            组织机构管理树状图<PlusCircleTwoTone onClick={(e)=>onAddInstitution(e)}/>
            <Divider></Divider>
            {treeData.length>0 &&
            <Tree
                showLine={true}
                treeData={treeData}
                defaultExpandAll
                onSelect={(sk,info)=>onSelect(sk,info)}
            />}
          </Col>
          <Col span={16}></Col>
        </Row>
      <InstitutionForm
          visible={formVisible}
          onSave={onSave}
          onCancel={onClose}
          pt={pt}
          level={level}
          item={item}
      ></InstitutionForm>
      <InstitutionDetail
          visible={detailVisible}
          onSave={onDetailSave}
          item={item}
          onCancel={onDetailClose}
      />
    </StyledContainer>
  );
};

export default Institution;
