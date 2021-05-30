/**
 * 路由-菜单配置文件
 * @author donghui
 */
import { ComponentClass, FC, lazy } from "react";
// 使用延迟加载的方式引入组件
const User = lazy(()=> import("../pages/System/User/User"))
const Device = lazy(()=>import("../pages/Device"))
const Criterion = lazy(()=>import("../pages/Criterion"))
const DeviceType = lazy(()=>import("../pages/BasicData/DeviceType"))
const Institution = lazy(()=>import("../pages/BasicData/Institution"))
const Certificate = lazy(()=>import("../pages/Certificate"))
const Task = lazy(()=>import("../pages/Task"))
const TaskRun = lazy(()=>import("../pages/Task/Run"))
const Data = lazy(()=>import("../pages/System/Data"))
const Config = lazy(()=>import("../pages/System/Config"))





// 主页路径
export const HOME_PATH = "/login";

/**
 * 页面/路由配置
 * 多级菜单可根据业务需求调整数据结构，但考虑到后续权限控制的实现，推荐将所有菜单项平铺，通过字段逻辑来进行分组或嵌套
 */
const routeConfigs: RouterConfigItem[] = [
  { path: "device",
    children:[{ path: "device/list", component: Device }]
  },
  { path: "criterion",
    children:[{ path: "criterion/list", component: Criterion }]
  },
  { path: "task",
    children:[{ path: "task/list", component: Task }
    ,{ path: "task/run", isHidden:true,component:TaskRun}]
  },
  { path: "certificate",
    children:[{ path: "certificate/list", component: Certificate }]
  },
  { path: "baseData",
    children:[{ path: "baseData/deviceType",component:DeviceType},
      { path: "baseData/institution",component:Institution}]
  },
  { path: "system",
    children:[{ path: "system/user", component: User },
      { path: "system/data",component:Data},
      { path: "system/config",component:Config}]
  },
];

export default routeConfigs;

interface RouterConfigItem {
  path: string;
  isHidden?:boolean;
  component?: FC | ComponentClass;
  children?:Array<RouterConfigItem>;
}
