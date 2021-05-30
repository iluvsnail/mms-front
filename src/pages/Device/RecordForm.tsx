import React, { FC, useCallback, useEffect, useState } from "react";
import {Col, ConfigProvider, Form, Input, Modal, Radio, Row, Select} from "antd";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import log from "loglevel";
import {IDevice} from "../../models/device";
import {ICodecriterion} from "../../models/codecriterion";
import {ICode} from "../../models/code";
import {IInstitution} from "../../models/institution";
import {DatePicker} from "../../components/YSDatePicker/";
import locale from 'antd/es/date-picker/locale/zh_CN';
import {DateTimeFormatString} from "../../constants/strings";
import RecordTable from "./RecordTable";
import {ITaskDevice} from "../../models/taskdevice";

interface Props {
  visible: boolean;
  item?: IDevice;
  onSave: () => void;
  onCancel: () => void;
  datas:ITaskDevice[];
}

const RecordForm: FC<Props> = ({ visible, item, onSave, onCancel,datas }) => {
  const [form] = Form.useForm();
  const { t } = useTranslation(["device", "common"]);

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
          title="检定记录"
          width={1040}
      >
        <Form
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ offset: 1, span: 16 }}
        >
          <Row>
            <Col span={8}>
              <Form.Item
                  label={t("deviceName")}
                  name="deviceType"
                  rules={[{ required: true }]}
              >
                {item?.deviceName}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                  label={t("standardType")}
                  name="standardType"
                  rules={[{ required: true }]}
              >
                {item?.standardType}
              </Form.Item>
            </Col>
            <Col span={8}>

              <Form.Item
                  label={t("factoryNumber")}
                  name="factoryNumber"
                  rules={[{ required: true }]}
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
