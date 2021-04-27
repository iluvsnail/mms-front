/** 组件容器
 * 用此组件包裹模块组件
 */
import styled from "styled-components";

interface Props {
  direction?: "column" | "row"; // 布局方向
}

const StyledContainer = styled.div<Props>`
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: ${props => props.direction || 'column'};
`;

export default StyledContainer;
