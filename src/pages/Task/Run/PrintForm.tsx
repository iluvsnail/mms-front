import React, { FC, useCallback, useEffect, useState } from "react";
import {Col, Form, Image, message, Modal, Radio, Row, Select} from "antd";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import log from "loglevel";
import {ITaskDevice} from "../../../models/taskdevice";
import {BASE_URL} from "../../../utils/apiUtils";
import api from "../../../configs/api";
import {isAdmin} from "../../../utils/tokenUtils";

interface Props {
  visible: boolean;
  item?: ITaskDevice;
  onSave: () => void;
  onCancel: () => void;
}

const PrintForm: FC<Props> = ({ visible, item, onSave, onCancel}) => {
  const [form] = Form.useForm();
  const { t } = useTranslation(["device", "common"]);



  useEffect(() => {
    if (visible && item && form) {
      form.setFieldsValue(item);
    }
  }, [visible, item, form]);

  const afterClose = useCallback(() => {
    form.resetFields();
  }, [form]);

  const onOk = useCallback(() => {
    if(!isAdmin()){
      message.info("您没有打印权限！")
      return;
    }
    onSave()
  }, [form, onSave]);
  return (
      <Modal
          visible={visible}
          afterClose={afterClose}
          okText="打印"
          onOk={onOk}
          onCancel={onCancel}
          maskClosable={false}
          forceRender
          title={"打印"}
      >
      <div id="qrcode">
        {item?.ys?.map(ys=>{
          return (<>
            <Image src={`${BASE_URL}/${api.task}/${item?.id}/ysData/${ys}`}></Image>
          </>);
        })}
      </div>
      </Modal>
  );
};

export default PrintForm;
