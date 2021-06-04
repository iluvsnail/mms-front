import React, { FC, useCallback, useEffect, useState } from "react";
import {Form, Input, Modal, Radio,Select} from "antd";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import log from "loglevel";
import {IDevice} from "../../models/device";
import {ICodecriterion} from "../../models/codecriterion";

interface Props {
  visible: boolean;
  item?: IDevice;
  onSave: (data: IDevice) => void;
  onCancel: () => void;
}

const DeviceDetail: FC<Props> = ({ visible, item, onSave,onCancel}) => {
  const [form] = Form.useForm();
  const { t } = useTranslation(["device", "common"]);

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
          title={"设备"+t("common:detail")}
      >
        <Form
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ offset: 1, span: 16 }}
        >
          <Form.Item
              label={t("deviceName")}
              name="deviceName"
          >
            {item?.deviceName}
          </Form.Item>
          <Form.Item
          label={t("criterionName")}
          name="criterionName"
          >
          {item?.criterion.criterionName}
        </Form.Item>
          <Form.Item
              label={t("standardType")}
              name="standardType"
          >
            {item?.standardType}
          </Form.Item>
          <Form.Item
              label={t("factoryNumber")}
              name="factoryNumber"
          >
            {item?.factoryNumber}
          </Form.Item>
          <Form.Item
              label={t("manufacturer")}
              name="manufacturer"
          >
            {item?.manufacturer}
          </Form.Item>
          <Form.Item
              label={t("currentStatus")}
              name="status"
          >
            {item?.status=="0"?t("status0"):t("status1")}
          </Form.Item>

          <Form.Item
              label={t("dutyUnit")}
              name="dutyUnit"
          >
            {item?.dutyUnit}
          </Form.Item>

          <Form.Item
              label={t("dutyPerson")}
              name="dutyPerson"
          >
            {item?.dutyPerson}
          </Form.Item>
          <Form.Item
              label={t("verifier")}
              name="verifier"
          >
            {item?.verifier}
          </Form.Item>

          <Form.Item
              label={t("lastAuthenticationDate")}
              name="lastAuthenticationDate"
          >
            {item?.lastAuthenticationDate}
          </Form.Item><Form.Item
            label={t("lastAuthenticationInstitution")}
            name="lastAuthenticationInstitution"
        >
          {item?.lastAuthenticationInstitution}
        </Form.Item>
          <Form.Item
              label={t("location")}
              name="location"
          >
            {item?.location}
          </Form.Item>
          <Form.Item
              label={t("validDate")}
              name="validDate"
          >
            {item?.validDate}
          </Form.Item>
          <Form.Item
              label={t("notes")}
              name="notes"
          >
            {item?.notes}
          </Form.Item>
        </Form>
      </Modal>
  );
};

export default DeviceDetail;
