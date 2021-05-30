import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { StyledContainer } from "../../../components/StyledComponents";
import {Button, message, Row, Col, Upload} from "antd";
import {useTranslation} from "react-i18next";
import {asyncbackup} from "./data.services";
import {BASE_URL} from "../../../utils/apiUtils";
import api from "../../../configs/api";

const Data: FC = () => {
  const { t } = useTranslation(["common", "dict"]);
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
        message.success(`${info.file.name} 文件上传成功`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 文件上传失败`);
      }
    },
  };
  return (
    <StyledContainer>
      <Row>
        <Col span={2}><Button type="primary" onClick={()=>asyncbackup()} title={t("backup")}>
          {t("backup")}
        </Button></Col>
        <Col span={2} >
          <Upload {...props}>
            <Button  title={t("restore")}>
              {t("restore")}
            </Button>
          </Upload>
        </Col>
        <Col span={2}><Button  onClick={()=>{message.error("未实现")}} title={t("async")}>
          {t("async")}
        </Button></Col>
      </Row>

    </StyledContainer>
  );
};

export default Data;
