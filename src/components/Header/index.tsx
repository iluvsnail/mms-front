/** 上方标题栏 */
import Avatar from "antd/lib/avatar/avatar";
import { FC, useCallback, useContext } from "react";
import styled from "styled-components";
import icon from "../../assets/icon.png";
import {
  UserOutlined,
  DownOutlined,
  TranslationOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Menu, message } from "antd";
import { useTranslation } from "react-i18next";
import { i18nKey, i18nList } from "../../i18n";
import LanguageContext from "../../i18n/LanguageContext";

const Header: FC = () => {
  const { t, i18n } = useTranslation("common");
  const { setLanguage } = useContext(LanguageContext);

  const onChangeLanguage = useCallback(
    (newLanguage: i18nKey) => {
      i18n.changeLanguage(newLanguage);
      setLanguage(newLanguage);
    },
    [i18n, setLanguage]
  );

  const onLogout = useCallback(() => {
    message.info(t("logout"));
  }, [t]);

  const userOverlay = (
    <Menu>
      <Menu.Item>
        <Button type="text" size="small">
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

  const i18nOverlay = (
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
  );

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
          {"管理员 "}
          <DownOutlined />
        </StyledHeaderUser>
      </Dropdown>
      <Dropdown overlay={i18nOverlay}>
        <StyledHeaderI18n>
          <TranslationOutlined />
        </StyledHeaderI18n>
      </Dropdown>
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
