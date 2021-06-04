/** 上方标题栏 */
import Avatar from "antd/lib/avatar/avatar";
import React, {FC, useCallback, useContext, useEffect, useState} from "react";
import styled from "styled-components";
import icon from "../../assets/icon.png";
import {
  UserOutlined,
  DownOutlined,
} from "@ant-design/icons";
import {Badge, Button, Dropdown, Form, Input, Menu, message, Modal, Popover, Radio, Select} from "antd";
import { useTranslation } from "react-i18next";
import { i18nKey, i18nList } from "../../i18n";
import LanguageContext from "../../i18n/LanguageContext";
import {clearToken, getItem} from "../../utils/tokenUtils";
import {useHistory} from "react-router-dom";
import log from "loglevel";
import {asyncChangePassword} from "../../pages/System/User/user.services";
import { NotificationTwoTone} from '@ant-design/icons';
import {IDevice} from "../../models/device";
import {
    asyncGetAlarmData,
    asyncGetCodeData,
    asyncGetDeviceCodeData,
    asyncGetDeviceData,
    asyncGetInstitutionCodeData
} from "../../pages/Device/device.services";

const Header: FC = () => {
  const { t, i18n } = useTranslation("common");
  const { setLanguage } = useContext(LanguageContext);
    const [list, setList] = useState<IDevice[]>([]);
    const loadData = useCallback(() => {
        asyncGetAlarmData((res) => {
            if (res.isOk) {
                setList(res.data);
            }
        });
    }, []);

    useEffect(() => {
        loadData();
        return () => setList([]);
    }, [loadData]);
  const history = useHistory();
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const [pVisible, setPVisible] = useState(false);
    const onChangeLanguage = useCallback(
    (newLanguage: i18nKey) => {
      i18n.changeLanguage(newLanguage);
      setLanguage(newLanguage);
    },
    [i18n, setLanguage]
  );
    const onChangePassword = useCallback(() => {
            setVisible(true);
        },
        []
    );

  const onLogout = useCallback(() => {
      clearToken();
      history.push("/login")
  }, [t]);
    const onClose = useCallback(() => {
        setVisible(false);
    }, []);
    const onSave = useCallback(
        (data: any) => {
            asyncChangePassword(data, (res) => {
                if (res.isOk) {
                    message.success("密码修改成功");
                    onClose();
                }
            });
        },
        [onClose]
    );
    const onOk = useCallback(() => {
        form
            .validateFields()
            .then((values) => {

                onSave({
                    ...values,
                });
            })
            .catch((e) => {
                log.error(e);
            });
    }, [form]);
  const userOverlay = (
    <Menu>
      <Menu.Item>
        <Button type="text" size="small" onClick={onChangePassword}>
          {t("changePassword")}
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button type="text" size="small" onClick={onLogout}>
          {t("logout")}
        </Button>
      </Menu.Item>
    </Menu>
  );

  /*const i18nOverlay = (
    <Menu
      selectedKeys={[i18n.language]}
      onClick={({ key }) => onChangeLanguage(key as i18nKey)}
    >
      {i18nList.map((l) => (
        <Menu.Item key={l.key}>
          <Button type="text" size="small">
            {l.label}
          </Button>
        </Menu.Item>
      ))}
    </Menu>
  );*/
    const handleVisibleChange = (v:boolean) => {
        setPVisible(v);
    }
  return (
    <StyledHeader>
      <StyledHeaderIcon />
      <StyledHeaderTitle>{t("APP_TITLE")}</StyledHeaderTitle>

      <Dropdown overlay={userOverlay}>
        <StyledHeaderUser>
          <Avatar
            icon={<UserOutlined />}
            size="small"
            style={{ marginRight: ".5rem", backgroundColor: "#2196f3" }}
          />
          {getItem("user")?.name}
          <DownOutlined />
        </StyledHeaderUser>
      </Dropdown>
        <div style={{width:"1em"}}>

            <Popover
                content={(<>
                <ul style={{width:"30em"}}>
                    {
                        list.map(device=>{
                            return (<li style={{listStyle:"none",marginBottom:".5em"}}>
                                {device?.offset<0?`设备 ${device.deviceName} 已超过检定有效期，请及时处理。`:`设备 ${device.deviceName}  距检定有效期失效还有 ${device.offset} 天，请及时处理。`}
                            </li>);
                        })
                    }
                </ul>
                </>)}
                title=""
                trigger="click"
                visible={pVisible}
                onVisibleChange={handleVisibleChange}
            >
            <Badge count={list.length}
                   style={{ marginRight: "1rem",marginLeft:".5em"}}>
                <NotificationTwoTone
                    style={{ marginRight: "1rem",marginLeft:".5em",fontSize:"20px"}}></NotificationTwoTone>
            </Badge>
            </Popover>
        </div>
      {/*<Dropdown overlay={i18nOverlay}>
        <StyledHeaderI18n>
          <TranslationOutlined />
        </StyledHeaderI18n>
      </Dropdown>*/}
        <Modal
            visible={visible}
            afterClose={onClose}
            onOk={onOk}
            onCancel={onClose}
            maskClosable={false}
            forceRender
            title="修改密码"
        >
            <Form
                form={form}
                labelCol={{ span: 6 }}
                wrapperCol={{ offset: 1, span: 16 }}
            >
                <Form.Item
                    name="password"
                    rules={[{ required: true ,message:"请输入密码！"}]}
                >
                    <Input type="password" placeholder={"请输入密码"}/>
                </Form.Item>
            </Form>
        </Modal>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.div`
  width: 100%;
  height: 4rem;
  line-height: 4rem;
  padding: 0 2rem;
  display: flex;
  flex-direction: row;
  z-index: 10;
  box-shadow: 0 2px 8px #f0f1f2;
`;

const StyledHeaderIcon = styled.div`
  width: 2rem;
  height: 2rem;
  margin-top: 1rem;
  background: url(${icon}) center/cover no-repeat;
  margin-right: 1rem;
`;

const StyledHeaderTitle = styled.div`
  flex: 1;
  font-weight: 600;
  font-size: 1.2rem;
`;

const StyledHeaderUser = styled.div`
  width: 8rem;
  text-align: right;
`;

const StyledHeaderI18n = styled.div`
  width: 3rem;
  font-size: 1.2rem;
  text-align: right;
`;
