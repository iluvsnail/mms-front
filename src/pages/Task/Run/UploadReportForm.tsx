import React, { FC, useCallback, useEffect, useState } from "react";
import {Button, DatePicker, Form, Input, message, Modal, Upload} from "antd";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import log from "loglevel";
import {ITaskDevice} from "../../../models/taskdevice";
import {BASE_URL} from "../../../utils/apiUtils";
import api from "../../../configs/api";
import {DateTimeFormatString} from "../../../constants/strings";
import {setItem} from "../../../utils/tokenUtils";

interface Props {
  visible: boolean;
  item?: ITaskDevice;
  onSave: (data: ITaskDevice) => void;
  onCancel: () => void;
}

const UploadReportForm: FC<Props> = ({ visible, item, onSave, onCancel}) => {
  const [form] = Form.useForm();
  const { t } = useTranslation(["taskdevice","task", "common"]);
  const [fileList,setFileList] =useState<any[]>([])

  useEffect(() => {
    if (visible && item && form) {
      if(item.detectedDate) item.detectedDate = dayjs(item.detectedDate);
      if(item.validDate) item.validDate = dayjs(item.validDate);
      setFileList([])
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
          if(values.detectedDate) {
            delete item?.detectedDate
            values.detectedDate=values.detectedDate.format(DateTimeFormatString);
          }
          if(values.validDate) {
            delete item?.validDate
            values.validDate=values.validDate.format(DateTimeFormatString);
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
  const props = {
    name: 'file',
    action: `${BASE_URL}/${api.task}/device/upload/${item?.id}`,
    accept:".xlsx",
    headers: {
      authorization: 'authorization-text',
    },
    withCredentials:true,
    onChange(info:any) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        console.log("done")
        message.success(`${info.file.name} 文件上传成功`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 文件上传失败`);
      }
      if(info.fileList){
        setFileList(info.fileList);
      }
    },
  };

  return (
      <Modal
          visible={visible}
          afterClose={afterClose}
          onOk={onOk}
          onCancel={onCancel}
          maskClosable={false}
          forceRender
          title={t("common:operations")}
      >
        <Form
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ offset: 1, span: 16 }}
        >
          <Form.Item
              label={t("device:deviceName")}
          >
            <Input disabled={true} value={item?.device.deviceName}/>
          </Form.Item>

          <Form.Item
              label={t("device:factoryNumber")}
          >
            <Input disabled={true} value={item?.device.factoryNumber}/>
          </Form.Item>
          <Form.Item
              label={t("detectedDate")}
              name="detectedDate"
              rules={[{ required: true }]}
          >
            <DatePicker showTime/>
          </Form.Item>

          <Form.Item
              label={t("validDate")}
              name="validDate"
              rules={[{ required: true }]}
          >
            <DatePicker showTime/>
          </Form.Item>
          <Form.Item
              label={t("detectedPerson")}
              name="detectedPerson"
              rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
              label={t("report")}
          >
            <Upload fileList={fileList} {...props}>
              <Button type="primary"  title={t("upload")}>
                {t("uploadReport")}
              </Button>
            </Upload>
          </Form.Item>


          <div style={{ display: "none" }}>
            <Form.Item label="id" name="id">
              <Input />
            </Form.Item>
            <Form.Item label="device" name="device">
              <Input />
            </Form.Item>
            <Form.Item label="task" name="task">
              <Input />
            </Form.Item>
            <Form.Item label="status" name="status">
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
            <Form.Item
                label={t("receivedDate")}
                name="receivedDate"
            >
              <Input />
            </Form.Item>
            <Form.Item
                label={t("sendDetectedPerson")}
                name="sendDetectedPerson"
            >
              <Input />
            </Form.Item>
            <Form.Item
                label={t("receivedPerson")}
                name="receivedPerson"
            >
              <Input />
            </Form.Item><Form.Item
              label={t("sendDate")}
              name="sendDate"
          >
            <Input />
          </Form.Item>
            <Form.Item
                label={t("sendPerson")}
                name="sendPerson"
            >
              <Input />
            </Form.Item>
            <Form.Item
                label={t("endPerson")}
                name="endPerson"
            >
              <Input />
            </Form.Item>
          </div>
        </Form>
      </Modal>
  );
};

export default UploadReportForm;
