import React, { FC, useCallback, useEffect, useState } from "react";
import {Col, ConfigProvider, DatePicker, Form, Input, Modal, Radio, Row, Select} from "antd";
import { useTranslation } from "react-i18next";
import {IDevice} from "../../../models/device";
import {ITaskDevice} from "../../../models/taskdevice";
import BatchReceiveTable from "./BatchReceiveTable";
import {ICriterion} from "../../../models/criterion";
import {ICriterionTrace} from "../../../models/criteriontrace";
import dayjs from "dayjs";
import {DateTimeFormatString} from "../../../constants/strings";
import log from "loglevel";

interface Props {
  visible: boolean;
  item?: ITaskDevice;
  onSave: (data:any) => void;
  onCancel: () => void;
  datas:ITaskDevice[];
}

const BatchReceiveForm: FC<Props> = ({ visible, item, onSave, onCancel,datas }) => {
  const [form] = Form.useForm();
  const { t } = useTranslation(["taskdevice", "common"]);

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
    form
        .validateFields()
        .then((values) => {
          const now = dayjs().valueOf();
          if(values.receivedDate) {
            delete item?.receivedDate
            values.receivedDate=values.receivedDate.format(DateTimeFormatString);
          }
          onSave({data:{...values},datas:datas});
        })
        .catch((e) => {
          log.error(e);
        });
  }, [form, onSave,datas]);

  return (
      <Modal
          visible={visible}
          afterClose={afterClose}
          onOk={onOk}
          onCancel={onCancel}
          maskClosable={false}
          forceRender
          title="批量处理"
          width={920}
      >
        <Form
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ offset: 1, span: 16 }}
        >
          <Row>
            <Col span={8}>
              <Form.Item
                  label={t("receivedDate")}
                  name="receivedDate"
                  rules={[{ required: true }]}
              >
                <DatePicker showTime/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                  label={t("sendDetectedPerson")}
                  name="sendDetectedPerson"
                  rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                  label={t("receivedPerson")}
                  name="receivedPerson"
                  rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

        </Form>
        <BatchReceiveTable data={datas}/>

      </Modal>
  );
};

export default BatchReceiveForm;
