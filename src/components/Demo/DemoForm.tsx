import { FC, useCallback, useEffect } from "react";
import { Form, Input, Modal, Radio } from "antd";
import { IDemo } from "../../models/demo";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import log from "loglevel";

interface Props {
  visible: boolean;
  item?: IDemo;
  onSave: (data: IDemo) => void;
  onCancel: () => void;
}

const DemoForm: FC<Props> = ({ visible, item, onSave, onCancel }) => {
  const [form] = Form.useForm();
  const { t } = useTranslation(["demo", "common"]);

  useEffect(() => {
    if (visible && item && form) {
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
        const now = dayjs().valueOf();
        onSave({
          ...values,
          createDate: values.createDate || now,
          updateDate: now,
        });
      })
      .catch((e) => {
        log.error(e);
      });
  }, [form, onSave]);

  return (
    <Modal
      visible={visible}
      afterClose={afterClose}
      onOk={onOk}
      onCancel={onCancel}
      maskClosable={false}
      forceRender
      title={item ? t("common:edit") : t("common:add")}
    >
      <Form
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ offset: 1, span: 16 }}
      >
        <Form.Item
          label={t("name")}
          name="name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t("sex")}
          name="sex"
          rules={[{ required: true }]}
        >
          <Radio.Group>
            <Radio value={1}>{t("sex1")}</Radio>
            <Radio value={0}>{t("sex0")}</Radio>
          </Radio.Group>
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
        </div>
      </Form>
    </Modal>
  );
};

export default DemoForm;
