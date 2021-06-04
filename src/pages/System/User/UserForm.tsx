import React, { FC, useCallback, useEffect, useState } from "react";
import {Form, Input, Modal, Radio,Select} from "antd";
import { IUser } from "../../../models/user";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import log from "loglevel";
import {IRole} from "../../../models/role";
import {ICodecriterion} from "../../../models/codecriterion";

interface Props {
  visible: boolean;
  item?: IUser;
  onSave: (data: IUser) => void;
  onCancel: () => void;
  roles:IRole[];
  codes:ICodecriterion[];
}

const UserForm: FC<Props> = ({ visible, item, onSave, onCancel ,roles,codes}) => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const { t } = useTranslation(["user", "common"]);

  const [rolesOption, setRolesOption] = useState({id: '',  note:''})

  useEffect(() => {
    if (visible && item && form) {
      if(item.special){
        item.special = item.special.split(",")
      }
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
          let sp = "";
          if(values.special && values.special.length>0){
            for(let n in values.special){
              sp=sp+values.special[n];
              if(n!=new String((values.special.length-1))){
                sp=sp+",";
              }
            }
          }
          debugger;
          onSave({
            ...values,
            createDate: values.createDate || now,
            special:sp,
            role:rolesOption.id
          });
        })
        .catch((e) => {
          log.error(e);
        });
  }, [form, onSave,rolesOption]);

  function roleChange(value:any,option:any) {
    setRolesOption({
      id: value, note: option.children
    })
  }
  function codeChange(value:any,option:any) {
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
          {/*<Form.Item
              label={t("special")}
              name="special"
              rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>*/}
          <Form.Item
              label={t("special")}
              name="special"
              rules={[{ required: true }]}
          >
            {
              <Select mode="tags" tokenSeparators={[',']}  onChange={codeChange} >
                {
                  codes.map(it =>{
                    return (<Option key={it.id} value={it.criterionName.replace("标准","")}>{it.criterionName.replace("标准","")}</Option>)}
                  )
                }
              </Select>}
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
