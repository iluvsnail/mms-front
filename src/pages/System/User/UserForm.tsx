import React, { FC, useCallback, useEffect, useState } from "react";
import {Form, Input, Modal, Radio,Select} from "antd";
import { IUser } from "../../../models/user";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import log from "loglevel";
import {IRole} from "../../../models/role";

interface Props {
  visible: boolean;
  item?: IUser;
  onSave: (data: IUser) => void;
  onCancel: () => void;
  roles:IRole[]
}

const UserForm: FC<Props> = ({ visible, item, onSave, onCancel ,roles}) => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const { t } = useTranslation(["user", "common"]);

  // let currentEditOption:IRole= {
  //   createDate: 0, isDelete: "", isLock: 0, name: "", updateDate: 0,
  //   id: item?.role.id || '',
  //   note: item?.role.note || ''
  // };

  const [rolesOption, setRolesOption] = useState({id: '',  note:''})

  useEffect(() => {
    if (visible && item && form) {
      form.setFieldsValue(item);
      setRolesOption({
        id: item?.role.id || '',
        note: item?.role.note || ''})
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
            updateDate: now,
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
          title={item ? t("common:edit") : t("common:add")}
      >
        <Form
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ offset: 1, span: 16 }}
        >
          <Form.Item
              label={t("userName")}
              name="userName"
              rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
              label={t("isLock")}
              name="isLock"
              rules={[{ required: true }]}
          >
            <Radio.Group>
              <Radio value={"1"}>{t("isLock1")}</Radio>
              <Radio value={"0"}>{t("isLock0")}</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
              label={t("role")}
              name="role"
              rules={[{ required: true }]}
              valuePropName={"role"}
          >
            {
              <Select value={rolesOption.id} onChange={roleChange} >
                {
                  roles.map(it =>{
                    return (<Option key={it.id} value={it.id}>{it.note}</Option>)}
                  )
                }
              </Select>}
          </Form.Item>
          <Form.Item
              label={t("name")}
              name="name"
              rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
              label={t("special")}
              name="special"
              rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
              label={t("department")}
              name="department"
              rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
              label={t("position")}
              name="position"
              rules={[{ required: true }]}
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
            <Form.Item label="password" name="password">
              <Input />
            </Form.Item>
          </div>
        </Form>
      </Modal>
  );
};

export default UserForm;
