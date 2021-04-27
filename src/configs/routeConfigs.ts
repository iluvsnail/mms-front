/**
 * 路由-菜单配置文件
 * @author donghui
 */
import { ComponentClass, FC, lazy } from "react";
import DemoForm from "../components/Demo/DemoForm";
// 使用延迟加载的方式引入组件
const Demo = lazy(() => import("../components/Demo"));
const BasicForm = lazy(() => import("../components/DemoForm/BasicForm"));
const StepForm = lazy(() => import("../components/DemoForm/StepForm"));
const ComplexForm = lazy(() => import("../components/DemoForm/ComplexForm"));
const User = lazy(()=> import("../pages/System/User"))

// 主页路径
export const HOME_PATH = "/system";

/**
 * 页面/路由配置
 * 多级菜单可根据业务需求调整数据结构，但考虑到后续权限控制的实现，推荐将所有菜单项平铺，通过字段逻辑来进行分组或嵌套
 */
const routeConfigs: RouterConfigItem[] = [/*
  { path: "page1", component: Demo },
  { path: "page2", component: BasicForm },
  { path: "page3", component: StepForm },
  { path: "page4", component: ComplexForm },*/
  { path: "system",
    children:[{ path: "system/user", component: User },
      { path: "system/data", component: ComplexForm },
      { path: "system/config", component: ComplexForm }]
  },
];

export default routeConfigs;

interface RouterConfigItem {
  path: string;
  component?: FC | ComponentClass;
  children?:Array<RouterConfigItem>;
}
