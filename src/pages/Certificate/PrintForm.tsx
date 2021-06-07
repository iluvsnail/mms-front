import React, { FC, useCallback, useEffect, useState } from "react";
import {Col, Form, Image, Modal, Radio, Row, Select} from "antd";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import log from "loglevel";
import {IDevice} from "../../models/device";
import {ICodecriterion} from "../../models/codecriterion";
import {ICode} from "../../models/code";
import {BASE_URL} from "../../utils/apiUtils";
import api from "../../configs/api";
import {ICertificate} from "../../models/certificate";

interface Props {
  visible: boolean;
  item?: ICertificate;
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
          width={820}
      >
      <div id="qrcode">
          {item?.ys?.map(ys=>{
            return (<>
              <img src={`${ys}`}></img>
            </>);
          })}
      </div>
      </Modal>
  );
};

export default PrintForm;
