import React, { FC, useCallback, useEffect, useState } from "react";
import {DatePicker, Form, Input, Modal} from "antd";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import log from "loglevel";
import {ITask} from "../../../models/task";
import {ITaskDevice} from "../../../models/taskdevice";
import {DateTimeFormatString} from "../../../constants/strings";

interface Props {
  visible: boolean;
  item?: ITaskDevice;
  task?:ITask;
  onSave: (data: ITaskDevice) => void;
  onCancel: () => void;
}

const ScanSendForm: FC<Props> = ({ visible, item,task, onSave, onCancel}) => {
  const [form] = Form.useForm();
  const { t } = useTranslation(["taskdevice","task", "common"]);


  useEffect(() => {
    if (visible && item && form) {
      if(item.sendDate) item.sendDate = dayjs(item.sendDate);
      form.setFieldsValue(item);
    }
  }, [visible, item, form]);

  const afterClose = useCallback(() => {
    form.resetFields();
  }, [form]);

  const onOk = useCallback(() => {
    form
        .validateFields()
        .then((values) => {
          if(values.sendDate) {
            delete item?.sendDate
            values.sendDate=values.sendDate.format(DateTimeFormatString);
          }
          onSave({
            ...values,
            status:"3",
            device:{factoryNumber:values.factoryNumber},
            task:task
          });
        })
        .catch((e) => {
          log.error(e);
        });
  }, [form, onSave,task]);

  return (
      <Modal
          visible={visible}
          afterClose={afterClose}
          onOk={onOk}
          onCancel={onCancel}
          maskClosable={false}
          forceRender
          title={t("common:operations")}
      >
        <Form
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ offset: 1, span: 16 }}
        >

          <Form.Item
              label={t("device:factoryNumber")}
              name="factoryNumber"
              rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
              label={t("sendDate")}
              name="sendDate"
              rules={[{ required: true }]}
          >
            <DatePicker showTime/>
          </Form.Item>
          <Form.Item
              label={t("sendPerson")}
              name="sendPerson"
              rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
              label={t("endPerson")}
              name="endPerson"
              rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <div style={{ display: "none" }}>
            <Form.Item label="id" name="id">
              <Input />
            </Form.Item>
            <Form.Item label="device" name="device">
              <Input />
            </Form.Item>
            <Form.Item label="task" name="task">
              <Input />
            </Form.Item>
            <Form.Item label="status" name="status">
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
            <Form.Item
                label={t("receivedDate")}
                name="receivedDate"
            >
              <Input />
            </Form.Item>
            <Form.Item
                label={t("sendDetectedPerson")}
                name="sendDetectedPerson"
            >
              <Input />
            </Form.Item>
            <Form.Item
                label={t("receivedPerson")}
                name="receivedPerson"
            >
              <Input />
            </Form.Item>
            <Form.Item
                label={t("detectedDate")}
                name="detectedDate"
            >
              <Input />
            </Form.Item>
            <Form.Item
                label={t("detectedPerson")}
                name="detectedPerson"
            >
              <Input />
            </Form.Item>
          </div>
        </Form>
      </Modal>
  );
};

export default ScanSendForm;
