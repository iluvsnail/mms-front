import { Button } from "antd";
import { FC, useCallback, useMemo } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import styled from "styled-components";
import { StyledContainer } from "../../components/StyledComponents";
import { HOME_PATH } from "../../configs/routeConfigs";

/**
 * 错误页
 */
const ErrorPage: FC<RouteComponentProps> = ({ location, history }) => {
  const code = useMemo(() => location.pathname.slice(location.pathname.lastIndexOf('/') + 1), [location]);

  const backHome = useCallback(() => history.push(HOME_PATH), [history]);

  return (
    <StyledContainer>
      <StyledErrorCode>{code}</StyledErrorCode>
      <div style={{ textAlign: 'center' }}><Button type="primary" title="回到主页" onClick={backHome}>回到主页</Button>
        </div>
    </StyledContainer>
  );
}


export default withRouter(ErrorPage);

const StyledErrorCode = styled.div`
    height: 30vh;
    padding-top: 10vh;
    line-height: 20vh;
    font-size: 6rem;
    font-weight: 600;
    margin: 0 auto;
    color: grey;
`;