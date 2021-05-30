import React, { FC, useCallback, useEffect, useState } from "react";
import {Form, Input, Modal, Radio,Select} from "antd";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import log from "loglevel";
import {ICriterion} from "../../../models/criterion";
import {ICodecriterion} from "../../../models/codecriterion";
import {IInstitution} from "../../../models/institution";

interface Props {
  visible: boolean;
  item?: IInstitution;
  onSave: (data: IInstitution) => void;
  onCancel: () => void;
}

const InstitutionDetail: FC<Props> = ({ visible, item, onSave,onCancel}) => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const { t } = useTranslation(["institution", "common"]);

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
          title={"组织机构"+t("common:detail")}
      >
        <Form
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ offset: 1, span: 16 }}
        >
          <Form.Item
              label={t("unitName")}
              name="unitName"
          >
            {item?.unitName}
          </Form.Item>
          <Form.Item
          label={t("contacts")}
          name="contacts"
          >
          {item?.contacts}
        </Form.Item>
          <Form.Item
              label={t("phone")}
              name="phone"
          >
            {item?.phone}
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

export default InstitutionDetail;
