import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { StyledContainer } from "../../../components/StyledComponents";
import {Button, message, Row, Col, Upload} from "antd";
import {useTranslation} from "react-i18next";
import {asyncbackup, asyncData} from "./data.services";
import {BASE_URL} from "../../../utils/apiUtils";
import api from "../../../configs/api";
import AsyncDataForm from "./AsyncDataForm";

const Data: FC = () => {
  const { t } = useTranslation(["common", "dict"]);
  const [visible, setVisible] = useState(false);
  const props = {
    name: 'file',
    action: `${BASE_URL}/${api.data}/restore/`,
    accept:".zip",
    headers: {
      authorization: 'authorization-text',
    },
    withCredentials:true,
    onChange(info:any) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 文件上传成功,请重新启动服务！`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 文件上传失败`);
      }
    },
  };
  const onAsyncData = useCallback(() => {
    setVisible(true)
    asyncData( setVisible,(res) => {
      if (res.isOk) {
        setVisible(false)
        if(res.data=="success"){
          message.info("数据同步完成！")
        }else{
          message.warn(res.data);
        }
      }
    });
  }, []);
  return (
    <StyledContainer >
      <Row >
        <Col span={2}><Button type="primary" onClick={()=>asyncbackup()} title={t("backup")}>
          {t("backup")}
        </Button></Col>
        <Col span={2} >
          <Upload showUploadList={false} {...props}>
            <Button  title={t("restore")}>
              {t("restore")}
            </Button>
          </Upload>
        </Col>
        <Col span={2}><Button  onClick={onAsyncData} title={t("async")}>
          {t("async")}
        </Button></Col>
      </Row>
      <AsyncDataForm visible={visible}/>
    </StyledContainer>
  );
};

export default Data;
