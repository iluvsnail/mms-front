import React, { FC, useCallback, useEffect, useState } from "react";
import {
  Button,
  Col,
  ConfigProvider,
  DatePicker,
  Divider,
  Form,
  Input,
  message,
  Modal,
  Radio,
  Row,
  Select,
  Upload
} from "antd";
import { useTranslation } from "react-i18next";
import {IDevice} from "../../models/device";
import {ITaskDevice} from "../../models/taskdevice";
import RecordTable from "./RecordTable";
import {ICriterion} from "../../models/criterion";
import {ICriterionTrace} from "../../models/criteriontrace";
import {BASE_URL} from "../../utils/apiUtils";
import api from "../../configs/api";
import {UploadListType} from "antd/es/upload/interface";
import dayjs from "dayjs";
import {DateTimeFormatString} from "../../constants/strings";
import log from "loglevel";
import {IInstitution} from "../../models/institution";

interface Props {
  visible: boolean;
  item?: ICriterion;
  onSave: (data:any) => void;
  onCancel: () => void;
  datas:ICriterion[];
  its:string[];
  institutionCodes:IInstitution[];
}

const UpdateTraceForm: FC<Props> = ({ visible, item, onSave, onCancel,datas,its ,institutionCodes}) => {
  const [form] = Form.useForm();
  const { t } = useTranslation(["criterion", "common"]);
  const { TextArea } = Input;
  const [traces,setTraces] = useState<ICriterionTrace[]>([])
  const [dutyOption, setDutyOption] = useState({id: '',  name:''})
  const Option=Select

  useEffect(() => {
    if(its && its.length >0){
      its.map(it=>{
        //组装trace
        let trace:ICriterionTrace = {
          createDate: 0,
          fileName: "",
          id: "",
          institution: "",
          isDelete: "",
          notes: "",
          traceDate: 0,
          traceUnit: "",
          updateDate: 0
        }
        datas.filter(v=>v.id == it).map(v=>{
          trace.criterion = v;
        })
        setTraces((prev) => [trace, ...prev]);
      })
    }
  }, [its]);
  const props = {
    name: 'file',
    action:'',
    listType: "picture" as UploadListType,
    accept:".png,.jpg",
    headers: {
      authorization: 'authorization-text',
    },
    withCredentials:true,
    onChange(info:any) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 文件上传成功`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 文件上传失败`);
      }
    },
  };


  const afterClose = useCallback(() => {
    form.resetFields();
  }, [form]);

  const onOk = useCallback(() => {
    form
        .validateFields()
        .then((values) => {
          const now = dayjs().valueOf();
          if(values.traceDate) {
            values.traceDate=values.traceDate.format(DateTimeFormatString);
          }
          onSave({
            data:{
              ...values,
              traceUnit:dutyOption.name
            },
            its:its
          });
        })
        .catch((e) => {
          log.error(e);
        });
  }, [form, onSave,its,dutyOption]);
  function dutyChange(value:any,option:any) {
    setDutyOption({
      id: value, name: option.children
    })
  }
  return (
      <Modal
          visible={visible}
          afterClose={afterClose}
          onOk={onOk}
          onCancel={onCancel}
          maskClosable={false}
          forceRender
          title="更新溯源"
          width={780}
      >
        <Form
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ offset: 1, span: 16 }}
        >
          <Row>
            <Col span={12}>
              <Form.Item
                  label={t("traceDate")}
                  name="traceDate"
                  rules={[{ required: true }]}
              >
                <DatePicker showTime/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                  label={t("traceUnit")}
                  name="institution"
                  rules={[{ required: true }]}
              >
                {
                  <Select value={dutyOption.id} onChange={dutyChange} >
                    {
                      institutionCodes.map(it =>{
                        return (<Option key={it.id} value={it.id}>{it.unitName}</Option>)}
                      )
                    }
                  </Select>}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                  label={t("notes")}
                  name="notes"
                  rules={[{ required: true }]}
              >
                <TextArea rows={2} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        {
          traces.map(trace=>{
            let prop = {...props};
            prop.action=`${BASE_URL}/${api.criterion}/${trace.criterion?.id}/upload`;
            return (
                <>
                  <Divider></Divider>
                  <Row style={{padding:"5"}}>
                    <Col span={12}>
                      <Col span={6}><label>{t("instrumentName")}:</label><span>{trace.criterion?.instrumentName}</span></Col>
                      <Col span={6}><label>{t("criterionName")}:</label><span>{trace.criterion?.criterion.criterionName}</span></Col>
                      <Col span={6}><label>{t("standardType")}:</label><span>{trace.criterion?.standardType}</span></Col>
                      <Col span={6}><label>{t("factoryNumber")}:</label><span>{trace.criterion?.factoryNumber}</span></Col>
                    </Col>
                    <Col span={12}>
                      <Upload {...prop}>
                        <Button type="primary"  title={t("upload")}>
                          {t("uploadCriterion")}
                        </Button>
                      </Upload>
                    </Col>
                  </Row>
                </>
            )
          })
        }
      </Modal>
  );
};

export default UpdateTraceForm;
