import React, { FC, useCallback, useEffect } from "react";
import { Form, Modal} from "antd";
import { useTranslation } from "react-i18next";
import {IDevice} from "../../models/device";

interface Props {
  visible: boolean;
  item?: IDevice;
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
      >
      <div id="qrcode">
        <div  style={{width:"400px",height:"200px",display:"inline-block"}}>
          <div style={{width:"40%",height:"160px",display:"inline-block"}}>
            <img
                style={{display:"block"}}
                width={"160px"}
                height={"160px"}
                src={item?.base64 }
            />
          </div>
          <div style={{width:"55%",height:"160px","fontSize":"20px",display:"inline-block",paddingLeft:"10px"}}>
            <div style={{"height":"40px"}}>
              {item?.dutyUnit}
            </div>
            <div style={{"height":"40px"}}>
              {item?.deviceName}
            </div>
            <div style={{"height":"40px"}}>
              {item?.standardType}
            </div>
            <div style={{"height":"40px"}}>
              {item?.factoryNumber}
            </div>
          </div>
          <div style={{width:"100%",height:"40px","fontSize":"20px",display:"inline-block",textAlign:"center"}}>
            {item?.lastAuthenticationInstitution}
          </div>
        </div>
      </div>
      </Modal>
  );
};

export default PrintForm;
