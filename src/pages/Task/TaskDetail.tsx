import React, { FC, useCallback, useEffect, useState } from "react";
import {Form, Input, Modal, Radio,Select} from "antd";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import log from "loglevel";
import {ITask} from "../../models/task";
import {ICodecriterion} from "../../models/codecriterion";

interface Props {
  visible: boolean;
  item?: ITask;
  onSave: (data: ITask) => void;
  onCancel: () => void;
}

const TaskDetail: FC<Props> = ({ visible, item, onSave,onCancel}) => {
  const [form] = Form.useForm();
  const { t } = useTranslation(["task", "common"]);

  useEffect(() => {
    form.setFieldsValue(item);
  }, [visible, item, form]);

  const afterClose = useCallback(() => {
    form.resetFields();
  }, [form]);

  const onOk = useCallback(() => {
  }, [form, onSave]);
  return (
      <Modal
          visible={visible}
          afterClose={afterClose}
          onOk={onCancel}
          onCancel={onCancel}
          maskClosable={false}
          forceRender
          title={"任务"+t("common:detail")}
      >
        <Form
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ offset: 1, span: 16 }}
        >
          <Form.Item
              label={t("name")}
              name="name"
          >
            {item?.name}
          </Form.Item>
          <Form.Item
              label={t("startDate")}
              name="startDate"
          >
            {item?.startDate}
          </Form.Item>
          <Form.Item
              label={t("finishDate")}
              name="finishDate"
          >
            {item?.finishDate}
          </Form.Item>
          <Form.Item
              label={t("status")}
              name="status"
          >
            {item?.status?t(`status${item?.status}`):""}
          </Form.Item>
          <Form.Item
              label={t("dutyPerson")}
              name="dutyPerson"
          >
            {item?.dutyPerson}
          </Form.Item>
          <Form.Item
              label={t("createUser")}
              name="createUser"
          >
            {item?.createUser}
          </Form.Item>

          <Form.Item
              label={t("instrumentCount")}
              name="instrumentCount"
          >
            {item?.instrumentCount}
          </Form.Item>
          <Form.Item
              label={t("receivedDeviceCount")}
              name="receivedDeviceCount"
          >
            {item?.receivedDeviceCount}
          </Form.Item>
          <Form.Item
              label={t("detectedDeviceCount")}
              name="detectedDeviceCount"
          >
            {item?.detectedDeviceCount}
          </Form.Item>
          <Form.Item
              label={t("sentDeviceCount")}
              name="sentDeviceCount"
          >
            {item?.sentDeviceCount}
          </Form.Item>

        </Form>
      </Modal>
  );
};

export default TaskDetail;
