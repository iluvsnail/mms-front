import React, { FC, useCallback, useEffect, useState } from "react";
import {ConfigProvider, Form, Input, Modal, Radio, Select} from "antd";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import log from "loglevel";
import {IDevice} from "../../models/device";
import {ICodecriterion} from "../../models/codecriterion";
import {ICode} from "../../models/code";
import {IInstitution} from "../../models/institution";
import {DatePicker} from "../../components/YSDatePicker/";
import locale from 'antd/es/date-picker/locale/zh_CN';
import {DateTimeFormatString} from "../../constants/strings";

interface Props {
  visible: boolean;
  item?: IDevice;
  onSave: (data: IDevice) => void;
  onCancel: () => void;
  codes:ICodecriterion[];
  deviceCodes:ICode[];
  institutionCodes:IInstitution[];
}

const DeviceForm: FC<Props> = ({ visible, item, onSave, onCancel ,codes,deviceCodes,institutionCodes}) => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const { t } = useTranslation(["device", "common"]);

  const [rolesOption, setRolesOption] = useState({id: '',  criterionName:''})
  const [deviceOption, setDeviceOption] = useState({id: '',  name:''})
  const [dutyOption, setDutyOption] = useState({id: '',  name:''})

  useEffect(() => {
    if (visible && item && form) {
      if(item.validDate) item.validDate = dayjs(item.validDate);
      if(item.lastAuthenticationDate) item.lastAuthenticationDate = dayjs(item.lastAuthenticationDate)
      form.setFieldsValue(item);
      setRolesOption({
        id: item?.criterion.id || '',
        criterionName: item?.criterion.criterionName || ''})
      setDeviceOption({
        id:item?.deviceType || '',
        name:item?.deviceName || ''
      })
      setDutyOption({
        id:item?.institution || '',
        name:item?.dutyUnit || ''
      })
    }else{
      setRolesOption({id:'',criterionName:''})
      setDeviceOption({id: '',  name:''})
      setDutyOption({id: '',  name:''})
    }
  }, [visible, item, form]);

  const afterClose = useCallback(() => {
    form.resetFields();
  }, [form]);

  const onOk = useCallback(() => {
    form
        .validateFields()
        .then((values) => {
          const now = dayjs().valueOf();
          if(values.validDate) {
            delete item?.validDate
            values.validDate=values.validDate.format(DateTimeFormatString);
          }
          if(values.lastAuthenticationDate){
            delete item?.lastAuthenticationDate
            values.lastAuthenticationDate=values.lastAuthenticationDate.format(DateTimeFormatString)
          }
          onSave({
            ...values,
            createDate: values.createDate || now,

            deviceName:deviceOption.name,
            dutyUnit:dutyOption.name
          });
        })
        .catch((e) => {
          log.error(e);
        });
  }, [form, onSave,deviceOption,dutyOption]);

  function roleChange(value:any,option:any) {
    setRolesOption({
      id: value, criterionName: option.children
    })
  }
  function deviceChange(value:any,option:any) {
    setDeviceOption({
      id: value, name: option.children
    })
  }
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
          title={item ? t("common:edit")+"设备" : t("common:add")+"设备"}
      >
        <Form
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ offset: 1, span: 16 }}
        >
          <Form.Item
              label={t("deviceName")}
              name="deviceType"
              rules={[{ required: true }]}
          >
            {
              <Select value={deviceOption.id} onChange={deviceChange} >
                {
                  deviceCodes.map(it =>{
                    return (<Option key={it.id} value={it.id}>{it.name}</Option>)}
                  )
                }
              </Select>}
          </Form.Item>
          <Form.Item
              label={t("criterionName")}
              name="criterion"
              rules={[{ required: true }]}
              valuePropName={"criterion"}
          >
            {
              <Select value={rolesOption.id} onChange={roleChange} >
                {
                  codes.map(it =>{
                    return (<Option key={it.id} value={it.id}>{it.criterionName}</Option>)}
                  )
                }
              </Select>}
          </Form.Item>
          <Form.Item
              label={t("standardType")}
              name="standardType"
              rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
              label={t("factoryNumber")}
              name="factoryNumber"
              rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
              label={t("manufacturer")}
              name="manufacturer"
              rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
              label={t("currentStatus")}
              name="status"
              rules={[{ required: true }]}
          >
            <Radio.Group>
              <Radio value={"1"}>{t("status1")}</Radio>
              <Radio value={"0"}>{t("status0")}</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
              label={t("dutyUnit")}
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

          <Form.Item
              label={t("dutyPerson")}
              name="dutyPerson"
              rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
              label={t("verifier")}
              name="verifier"
              rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
              label={t("lastAuthenticationDate")}
              name="lastAuthenticationDate"
              rules={[{ required: false }]}
          >
            <DatePicker  showTime ></DatePicker>
          </Form.Item>
          <Form.Item
              label={t("lastAuthenticationInstitution")}
              name="lastAuthenticationInstitution"
              rules={[{ required: false }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
              label={t("location")}
              name="location"
              rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
              label={t("validDate")}
              name="validDate"
              rules={[{ required: true }]
              }
          >
            <DatePicker  showTime ></DatePicker>
          </Form.Item>
          <Form.Item
              label={t("notes")}
              name="notes"
              rules={[{ required: false }]}
          >
            <Input />
          </Form.Item>
          <div style={{ display: "none" }}>
            <Form.Item label="id" name="id">
              <Input />
            </Form.Item>
            <Form.Item label="createDate" name="createDate">
              <Input />
            </Form.Item>
            <Form.Item label="updateDate" name="updateDate">
              <Input />
            </Form.Item>
            <Form.Item label="isDelete" name="isDelete">
              <Input />
            </Form.Item>
          </div>
        </Form>
      </Modal>
  );
};

export default DeviceForm;
