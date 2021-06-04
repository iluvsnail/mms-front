import React, { FC, useCallback, useEffect, useState } from "react";
import {Form, Input, Modal, Radio,Select} from "antd";
import { IConfig } from "../../../models/config";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import log from "loglevel";
import {IRole} from "../../../models/role";

interface Props {
  visible: boolean;
  item?: IConfig;
  onSave: (data: IConfig) => void;
  onCancel: () => void;
  roles:IRole[]
}

const ConfigForm: FC<Props> = ({ visible, item, onSave, onCancel ,roles}) => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const { t } = useTranslation(["config", "common"]);

  // let currentEditOption:IRole= {
  //   createDate: 0, isDelete: "", isLock: 0, name: "", updateDate: 0,
  //   id: item?.role.id || '',
  //   note: item?.role.note || ''
  // };

  const [rolesOption, setRolesOption] = useState({id: '',  note:''})

  useEffect(() => {
    if (visible && item && form) {
      form.setFieldsValue(item);
    }else{
      setRolesOption({id:'',note:''})
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
      id: value, note: option.children
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
          title={item ? t("common:edit") +"系统配置": t("common:add")+"系统配置"}
      >
        <Form
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ offset: 1, span: 16 }}
        >
          <Form.Item
              label={t("nameCn")}
              name="nameCn"
              rules={[{ required: true }]}
          >
            {item?.nameCn}
          </Form.Item>
          <Form.Item
              label={t("v")}
              name="v"
              rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <div style={{ display: "none" }}>
            <Form.Item label="id" name="id">
              <Input />
            </Form.Item>
            <Form.Item label="name" name="name">
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

export default ConfigForm;
