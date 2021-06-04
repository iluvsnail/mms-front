import React, { FC, useCallback, useEffect, useState } from "react";
import {Form, Input, Modal, Radio,Select} from "antd";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import log from "loglevel";
import {ICertificate} from "../../models/certificate";
import {ICodecriterion} from "../../models/codecriterion";

interface Props {
  visible: boolean;
  item?: ICertificate;
  onSave: (data: ICertificate) => void;
  onCancel: () => void;
  codes:ICodecriterion[]
}

const CertificateForm: FC<Props> = ({ visible, item, onSave, onCancel ,codes}) => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const { t } = useTranslation(["device", "common"]);

  // let currentEditOption:IRole= {
  //   createDate: 0, isDelete: "", isLock: 0, name: "", updateDate: 0,
  //   id: item?.role.id || '',
  //   note: item?.role.note || ''
  // };

  const [rolesOption, setRolesOption] = useState({id: '',  criterionName:''})

  useEffect(() => {
    if (visible && item && form) {
      form.setFieldsValue(item);/*
      setRolesOption({
        id: item?.criterion.id || '',
        criterionName: item?.criterion.criterionName || ''})*/
    }else{
      setRolesOption({id:'',criterionName:''})
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
          onSave({
            ...values,
            createDate: values.createDate || now,

          });
        })
        .catch((e) => {
          log.error(e);
        });
  }, [form, onSave]);

  function roleChange(value:any,option:any) {
    setRolesOption({
      id: value, criterionName: option.children
    })
    // console.log(item)
    // currentEditOption.id=value
    // currentEditOption.note=option.children;
    // if(item){
    //   item.role = currentEditOption
    // }
    // form.setFieldsValue(item);
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
              name="deviceName"
              rules={[{ required: true }]}
          >
            <Input />
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
              name="dutyUnit"
              rules={[{ required: true }]}
          >
            <Input />
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
            <Input />
          </Form.Item>
          <Form.Item
              label={t("validDate")}
              name="validDate"
              rules={[{ required: true }]}
          >
            <Input />
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

export default CertificateForm;
