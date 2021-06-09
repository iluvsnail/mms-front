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
  onSave: () => void;
  onCancel: () => void;
}

const DetailForm: FC<Props> = ({ visible, item, onSave, onCancel}) => {
  const [form] = Form.useForm();
  const { t } = useTranslation(["taskdevice","task", "common"]);


  useEffect(() => {
    if (visible && item && form) {
      form.setFieldsValue(item);
    }
  }, [visible, item, form]);

  const afterClose = useCallback(() => {
    form.resetFields();
  }, [form]);

  const onOk = useCallback(() => {
      onSave()
  }, [form, onSave]);

  return (
      <Modal
          visible={visible}
          afterClose={afterClose}
          onOk={onOk}
          onCancel={onCancel}
          maskClosable={false}
          forceRender
          title={t("common:detail")}
      >
        <Form
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ offset: 1, span: 16 }}
        >
          <Form.Item
              label={t("device:deviceName")}
          >
            {item?.device.deviceName}
          </Form.Item>

          <Form.Item
              label={t("device:factoryNumber")}
          >
            {item?.device.factoryNumber}
          </Form.Item>
          <Form.Item
              label={t("status")}
          >
            {t(`status${item?.status}`)}
          </Form.Item>
          <Form.Item
              label={t("receivedDate")}
          >
            {item?.receivedDate}
          </Form.Item>
          <Form.Item
              label={t("sendDetectedPerson")}
          >
            {item?.sendDetectedPerson}
          </Form.Item>
          <Form.Item
              label={t("receivedPerson")}
          >
            {item?.receivedPerson}
          </Form.Item>
          <Form.Item
              label={t("detectedDate")}
          >
            {item?.detectedDate}
          </Form.Item>
          <Form.Item
              label={t("detectedPerson")}
          >
            {item?.detectedPerson}
          </Form.Item>
          <Form.Item
              label={t("sendDate")}
          >
            {item?.sendDate}
          </Form.Item>
          <Form.Item
              label={t("sendPerson")}
          >
            {item?.sendPerson}
          </Form.Item>
          <Form.Item
              label={t("endPerson")}
          >
            {item?.endPerson}
          </Form.Item>
        </Form>
      </Modal>
  );
};

export default DetailForm;
