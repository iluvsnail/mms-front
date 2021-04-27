/** 底部Footer */
import { FC } from "react";
import styled from "styled-components";
import { CopyrightOutlined } from "@ant-design/icons";

interface Props {
  copyright: string;
}

const StyledFooter = styled.div`
  width: 100%;
  height: 3rem;
  line-height: 3rem;
  text-align: center;
  color: grey;
`;

const Footer: FC<Props> = ({ copyright }) => {
  return (
    <StyledFooter>
      {"Copyright "}
      <CopyrightOutlined /> {copyright}
    </StyledFooter>
  );
};

export default Footer;
