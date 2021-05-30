import React, { FC, useCallback, useEffect, useState } from "react";
import {Form, Input, Modal, Radio,Select} from "antd";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import log from "loglevel";
import {ICriterion} from "../../../models/criterion";
import {IDeviceType} from "../../../models/devicetype";

interface Props {
  visible: boolean;
  pt:string;
  level:string;
  item?: IDeviceType;
  onSave: (data: IDeviceType) => void;
  onCancel: () => void;
}

const DeviceTypeForm: FC<Props> = ({ visible, item, onSave, onCancel,pt,level}) => {
  const [form] = Form.useForm();
  const { t } = useTranslation(["deviceType", "common"]);

  useEffect(() => {
    if (visible && item && form) {
      form.setFieldsValue(item);
    }else{
      item = {createDate: 0, id: "", isDelete: "0", level: level, name: "", pt: pt, updateDate: 0}
      form.setFieldsValue(item);

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
            updateDate: now,
          });
        })
        .catch((e) => {
          log.error(e);
        });
  }, [form, onSave]);

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
              label={t("name")}
              name="name"
              rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
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