import React, { FC, useCallback, useEffect, useState } from "react";
import {Form, Input, Modal, Radio,Select} from "antd";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import log from "loglevel";
import {ICriterion} from "../../models/criterion";
import {ICodecriterion} from "../../models/codecriterion";

interface Props {
  visible: boolean;
  item?: ICriterion;
  onSave: (data: ICriterion) => void;
  onCancel: () => void;
}

const CriterionDetail: FC<Props> = ({ visible, item, onSave,onCancel}) => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const { t } = useTranslation(["criterion", "common"]);

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
          title={"设备"+t("common:detail")}
      >
        <Form
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ offset: 1, span: 16 }}
        >
          <Form.Item
              label={t("instrumentName")}
              name="instrumentName"
          >
            {item?.instrumentName}
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
              label={t("lastTracingUnit")}
              name="lastTracingUnit"
          >
            {item?.lastTracingUnit}
          </Form.Item>

          <Form.Item
              label={t("lastTracingDate")}
              name="lastTracingDate"
          >
            {item?.lastTracingDate}
          </Form.Item>
          <Form.Item
              label={"末次溯源"+t("certificateNumber")}
              name="certificateNumber"
          >
            {item?.certificateNumber}
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

export default CriterionDetail;
