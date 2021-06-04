import React, { FC, useCallback, useEffect, useState } from "react";
import {Form, Input, Modal, Radio,Select} from "antd";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import log from "loglevel";
import {ITask} from "../../models/task";
import {ICodecriterion} from "../../models/codecriterion";
import {DateTimeFormatString} from "../../constants/strings";
import {DatePicker} from "../../components/YSDatePicker";

interface Props {
  visible: boolean;
  item?: ITask;
  onSave: (data: ITask) => void;
  onCancel: () => void;
  codes:ICodecriterion[]
}

const TaskForm: FC<Props> = ({ visible, item, onSave, onCancel ,codes}) => {
  const [form] = Form.useForm();
  const { t } = useTranslation(["task", "common"]);


  const [rolesOption, setRolesOption] = useState({id: '',  criterionName:''})

  useEffect(() => {
    if (visible && item && form) {
      if(item.startDate) item.startDate = dayjs(item.startDate);
      form.setFieldsValue(item);
    }else{
      setRolesOption({id:'',criterionName:''})
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
          if(values.startDate) {
            delete item?.startDate
            values.startDate=values.startDate.format(DateTimeFormatString);
          }
          onSave({
            ...values,
            createDate: values.createDate || now,

          });
        })
        .catch((e) => {
          log.error(e);
        });
  }, [form, onSave]);

  function roleChange(value:any,option:any) {
    setRolesOption({
      id: value, criterionName: option.children
    })
  }

  return (
      <Modal
          visible={visible}
          afterClose={afterClose}
          onOk={onOk}
          onCancel={onCancel}
          maskClosable={false}
          forceRender
          title={item ? t("common:edit")+"任务" : t("common:add")+"任务"}
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
              label={t("dutyPerson")}
              name="dutyPerson"
              rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
              label={t("startDate")}
              name="startDate"
              rules={[{ required: true }]}
          >
            <DatePicker showTime ></DatePicker>
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

export default TaskForm;
