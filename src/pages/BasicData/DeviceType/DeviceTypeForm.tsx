import React, { FC, useCallback, useEffect, useState } from "react";
import {Form, Input, InputNumber, Modal, Radio, Select} from "antd";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import log from "loglevel";
import {ICriterion} from "../../../models/criterion";
import {IDeviceType} from "../../../models/devicetype";
import {ICodecriterion} from "../../../models/codecriterion";

interface Props {
  visible: boolean;
  pt:string;
  level:string;
  item?: IDeviceType;
  onSave: (data: IDeviceType) => void;
  onCancel: () => void;
  codes:ICodecriterion[];
}

const DeviceTypeForm: FC<Props> = ({ visible, item, onSave, onCancel,pt,level,codes}) => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const { t } = useTranslation(["deviceType", "common"]);
  const [rolesOption, setRolesOption] = useState({id: '',  criterionName:''})

  useEffect(() => {
    if (visible && item && form) {
      form.setFieldsValue(item);
      setRolesOption({
        id: item?.criterion?.id || '',
        criterionName: item?.criterion?.criterionName || ''})
    }else{
      item = {
        criterion: {id:"",criterionName:""} ,
        cycle: "",
        standardType: "",
        ys: undefined,
        createDate: 0, id: "", isDelete: "0", level: level, name: "", pt: pt, updateDate: 0}
      form.setFieldsValue(item);

      setRolesOption({id:'',criterionName:''})
    }
  }, [visible, item, form,pt,level]);

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
  }
  return (
      <Modal
          visible={visible}
          afterClose={afterClose}
          onOk={onOk}
          onCancel={onCancel}
          maskClosable={false}
          forceRender
          title={item ? t("common:edit")+"设备类型" : t("common:add")+"设备类型"}
      >
        <Form
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ offset: 1, span: 16 }}
        >
          <Form.Item
              label={"设备名称"}
              name="name"
              rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          {(item?item.level=="2":level=="1")?(<>
          <Form.Item
              label={"规格型号"}
              name="standardType"
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
              label={t("cycle")}
              name="cycle"
              rules={[{ required: true}]}
          >
            <InputNumber />
          </Form.Item></>):""}
          <div style={{ display: "none" }}>
            <Form.Item label="id" name="id">
              <Input />
            </Form.Item>
            <Form.Item label="pt" name="pt">
              <Input />
            </Form.Item>
            <Form.Item label="level" name="level">
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

export default DeviceTypeForm;
