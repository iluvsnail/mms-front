import React, { FC, useCallback, useEffect, useState } from "react";
import {Col, ConfigProvider, Form, Input, Modal, Radio, Row, Select} from "antd";
import { useTranslation } from "react-i18next";
import {IDevice} from "../../models/device";
import {ITaskDevice} from "../../models/taskdevice";
import RecordTable from "./RecordTable";
import {ICriterion} from "../../models/criterion";
import {ICriterionTrace} from "../../models/criteriontrace";

interface Props {
  visible: boolean;
  item?: ICriterion;
  onSave: () => void;
  onCancel: () => void;
  datas:ICriterionTrace[];
}

const RecordForm: FC<Props> = ({ visible, item, onSave, onCancel,datas }) => {
  const [form] = Form.useForm();
  const { t } = useTranslation(["criterion", "common"]);

  useEffect(() => {
    if (visible && item && form) {
      form.setFieldsValue(item);
    }else{
    }
  }, [visible, item, form]);

  const afterClose = useCallback(() => {
    form.resetFields();
  }, [form]);

  const onOk = useCallback(() => {
    onSave();
  }, [form, onSave]);

  return (
      <Modal
          visible={visible}
          afterClose={afterClose}
          onOk={onOk}
          onCancel={onCancel}
          maskClosable={false}
          forceRender
          title="溯源记录"
          width={1040}
      >
        <Form
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ offset: 1, span: 16 }}
        >
          <Row>
            <Col span={6}>
              <Form.Item
                  label={t("instrumentName")}
                  name="instrumentName"
              >
                {item?.instrumentName}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                  label={t("criterionName")}
                  name="criterion"
              >
                {item?.criterion?item.criterion.criterionName:""}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                  label={t("standardType")}
                  name="standardType"
              >
                {item?.standardType}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                  label={t("factoryNumber")}
                  name="factoryNumber"
              >
                {item?.factoryNumber}
              </Form.Item>
            </Col>
          </Row>

        </Form>
        <RecordTable data={datas}/>

      </Modal>
  );
};

export default RecordForm;
