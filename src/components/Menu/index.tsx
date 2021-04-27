/** 左侧菜单 */
import { FC, useMemo } from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import styled from "styled-components";
import routeConfigs from "../../configs/routeConfigs";
import { Menu as AntdMenu } from "antd";
import { useTranslation } from "react-i18next";

const StyledMenu = styled.div`
  width: 15rem;
  height: 100%;
  border-right: 1px solid #f0f0f0;
  margin: 2rem 0;
`;

const Menu: FC<RouteComponentProps> = ({ location }) => {
  const { t } = useTranslation("menu");

  const activity = useMemo(() => {
      let act = routeConfigs.find((r) => {
          if(!r.children){
              return  location.pathname.indexOf(r.path) === 1
          }
      })?.path || ""
      if(!act){
          routeConfigs.map((c)=>{
              if(c.children && !act){
                  act = c.children.find((r) => location.pathname.indexOf(r.path) === 1)?.path || ""
              }
          })
      }
    return (act);
  }, [location]);

  const menus = useMemo(() => {
    return routeConfigs.map((c) => {
      let menu ;
      if(!c.children){
      menu=
        <AntdMenu.Item style={{ fontSize: "1rem" }} key={c.path}>
          <Link to={`/${c.path}`}>{t(c.path)}</Link>
        </AntdMenu.Item>
      }else{
        let children =
            c.children.map((gc) => {
              return (<AntdMenu.Item style={{ fontSize: "1rem" }} key={gc.path}>
                <Link to={`/${gc.path}`}>{t(gc.path)}</Link>
              </AntdMenu.Item>)
            })
        menu = <AntdMenu.ItemGroup title={t(c.path)} key={c.path}>
          {children}
        </AntdMenu.ItemGroup>
      }
      return (menu);
    });
  }, [t]);

  return (
    <StyledMenu>
      <AntdMenu mode="inline" selectedKeys={[activity]}>
        {menus}
      </AntdMenu>
    </StyledMenu>
  );
};

export default withRouter(Menu);