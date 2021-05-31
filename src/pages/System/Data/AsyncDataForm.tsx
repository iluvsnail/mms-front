import React, { FC, useCallback, useEffect, useState } from "react";
import {Form, Input, Modal, Radio,Select} from "antd";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import log from "loglevel";
import {ICriterion} from "../../../models/criterion";
import {IDeviceType} from "../../../models/devicetype";
import {IInstitution} from "../../../models/institution";

interface Props {
  visible: boolean;
}

const AsyncDataForm: FC<Props> = ({ visible}) => {
  return (
      <Modal
          visible={visible}
          maskClosable={false}
          forceRender
          title={"同步数据"}
      >
      正在与服务器同步数据中，请勿关闭该窗口！
      </Modal>
  );
};

export default AsyncDataForm;
