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
}

const CertificateDetail: FC<Props> = ({ visible, item, onSave,onCancel}) => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const { t } = useTranslation(["certificate", "common"]);

  // let currentEditOption:IRole= {
  //   createDate: 0, isDelete: "", isLock: 0, name: "", updateDate: 0,
  //   id: item?.role.id || '',
  //   note: item?.role.note || ''
  // };

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
          title={"证书"+t("common:detail")}
      >
        <Form
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ offset: 1, span: 16 }}
        >
         <Form.Item
              label={t("certificateNumber")}
              name="certificateNumber"
          >
            {item?.certificateNumber}
          </Form.Item>
          <Form.Item
              label={t("deviceName")}
              name="deviceName"
          >
            {item?.device.deviceName}
          </Form.Item>
          <Form.Item
              label={t("standardType")}
              name="standardType"
          >
            {item?.device.standardType}
          </Form.Item>
          <Form.Item
              label={t("factoryNumber")}
              name="factoryNumber"
          >
            {item?.device.factoryNumber}
          </Form.Item>
          <Form.Item
              label={t("verifyResult")}
              name="verifyResult"
          >
            {t(`verifyResult${item?.verifyResult}`)}
          </Form.Item>
          <Form.Item
              label={t("entrustUnit")}
              name="entrustUnit"
          >
            {item?.entrustUnit}
          </Form.Item>
          <Form.Item
              label={t("verifier")}
              name="verifier"
          >
            {item?.verifier}
          </Form.Item>

          <Form.Item
              label={t("submitDate")}
              name="submitDate"
          >
            {item?.submitDate}
          </Form.Item>
          <Form.Item
              label={t("verifyDate")}
              name="verifyDate"
          >
            {item?.verifyDate}
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

export default CertificateDetail;
