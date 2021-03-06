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
import {ITaskDevice} from "../../models/taskdevice";

interface Props {
  visible: boolean;
  item?: ITaskDevice;
  onSave: () => void;
  onCancel: () => void;
}

const RecordPrintForm: FC<Props> = ({ visible, item, onSave, onCancel}) => {
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
          okText="确定"
          onOk={onOk}
          onCancel={onCancel}
          maskClosable={false}
          forceRender
          title={"检定记录详情"}
          width={1040}
      >
      <div id="qrcode" style={{textAlign:"center"}}>
          {item?.ys?.map(ys=>{
            return (<>
              <Image src={`${ys}`}></Image>
            </>);
          })}
      </div>
      </Modal>
  );
};

export default RecordPrintForm;
