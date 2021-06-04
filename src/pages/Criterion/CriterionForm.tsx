import React, { FC, useCallback, useEffect, useState } from "react";
import {Form, Input, Modal, Radio,Select} from "antd";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import log from "loglevel";
import {ICriterion} from "../../models/criterion";
import {ICodecriterion} from "../../models/codecriterion";
import {IInstitution} from "../../models/institution";
import {DateTimeFormatString} from "../../constants/strings";
import {DatePicker} from "../../components/YSDatePicker";

interface Props {
  visible: boolean;
  item?: ICriterion;
  onSave: (data: ICriterion) => void;
  onCancel: () => void;
  codes:ICodecriterion[];
  institutionCodes:IInstitution[];
}

const CriterionForm: FC<Props> = ({ visible, item, onSave, onCancel ,codes,institutionCodes}) => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const { t } = useTranslation(["criterion", "common"]);

  const [rolesOption, setRolesOption] = useState({id: '',  criterionName:''})
  const [dutyOption, setDutyOption] = useState({id: '',  name:''})

  useEffect(() => {
    if (visible && item && form) {
      if(item.lastTracingDate) item.lastTracingDate = dayjs(item.lastTracingDate);
      form.setFieldsValue(item);
      setRolesOption({
        id: item?.criterion.id || '',
        criterionName: item?.criterion.criterionName || ''})
      setDutyOption({
        id:item?.institution || '',
        name:item?.dutyUnit || ''
      })
    }else{
      setRolesOption({id:'',criterionName:''})
      setDutyOption({
        id:item?.institution || '',
        name:item?.dutyUnit || ''
      })
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
          if(values.lastTracingDate) {
            delete item?.lastTracingDate
            values.lastTracingDate=values.lastTracingDate.format(DateTimeFormatString);
          }
          onSave({
            ...values,
            createDate: values.createDate || now,
            updateDate: now,
            dutyUnit:dutyOption.name
          });
        })
        .catch((e) => {
          log.error(e);
        });
  }, [form, onSave,dutyOption]);

  function roleChange(value:any,option:any) {
    setRolesOption({
      id: value, criterionName: option.children
    })
  }
  function dutyChange(value:any,option:any) {
    setDutyOption({
      id: value, name: option.children
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
          title={item ? t("common:edit")+"仪器" : t("common:add")+"仪器"}
      >
        <Form
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ offset: 1, span: 16 }}
        >
          <Form.Item
              label={t("instrumentName")}
              name="instrumentName"
              rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
              label={t("criterion")}
              name="criterion"
              rules={[{ required: true }]}
              valuePropName={"criterion"}
          >
            {
              <Select value={rolesOption.id} onChange={roleChange} >
                {
                  codes.map(it =>{
                    return (<Option key={it.id} value={it.id}>{it.criterionName}</Option>)}
                  )
                }
              </Select>}
          </Form.Item>
          <Form.Item
              label={t("standardType")}
              name="standardType"
              rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
              label={t("factoryNumber")}
              name="factoryNumber"
              rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
              label={t("manufacturer")}
              name="manufacturer"
              rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
              label={t("currentStatus")}
              name="status"
              rules={[{ required: true }]}
          >
            <Radio.Group>
              <Radio value={"1"}>{t("status1")}</Radio>
              <Radio value={"0"}>{t("status0")}</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
              label={t("dutyUnit")}
              name="institution"
              rules={[{ required: true }]}
          >
            {
              <Select value={dutyOption.id} onChange={dutyChange} >
                {
                  institutionCodes.map(it =>{
                    return (<Option key={it.id} value={it.id}>{it.unitName}</Option>)}
                  )
                }
              </Select>}
          </Form.Item>

          <Form.Item
              label={t("dutyPerson")}
              name="dutyPerson"
              rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
              label={t("lastTracingUnit")}
              name="lastTracingUnit"
          >
            <Input />
          </Form.Item>

          <Form.Item
              label={t("lastTracingDate")}
              name="lastTracingDate"
          >
            <DatePicker  showTime ></DatePicker>
          </Form.Item>
          <Form.Item
              label={"末次溯源"+t("certificateNumber")}
              name="certificateNumber"
          >
            <Input />
          </Form.Item>
          <Form.Item
              label={t("location")}
              name="location"
              rules={[{ required: false }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
              label={t("notes")}
              name="notes"
              rules={[{ required: false }]}
          >
            <Input />
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

export default CriterionForm;
