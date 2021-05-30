# YS Web Application Boilerplate

## Technology Stack

- react: created by `create-react-app`
- typescript
- ant-design
- styled-component
- react-i18next

## !重要

### dayjs 的兼容性问题

- DatePicker、TimePicker、Calendar 组件需要从 `src/components/YSDatePicker/` 目录引入，直接引入 antd 组件会出现 dayjs 的兼容性 bug，原因参照 [Antd 官方文档相关说明](https://ant.design/docs/react/replace-moment-cn)。

### i18n

- [react-i18next 官方文档](https://react.i18next.com/)
- 字符串需提取到 `/public/locales/{languageName}/{moduleName}.json` 文件中，并通过 `react-i18next` 库相关方法引入，可参考 `src/components/Institution` 组件写法，详情参照 `react-i18next` 文档中的 `useTranslation` 以及 `namespace` 相关用法。

## Project Catalog

- public：图标、导出配置、js 文件引入
  - config.js 导出配置文件
  - locales 国际化配置文件
- src
  - assets：代码中使用的静态资源如图片、语音等
  - components：组件
    - 公共组件名称以 `YS` 开头
  - configs：项目配置：路由、菜单等
    - api.ts api 配置
    - api.dev.json 开发环境配置
    - api.prod.json 生产环境配置
    - routeConfigs.ts 菜单-路由-组件配置
  - models：实体 Interface 或 Types
  - pages：独立页面
  - utils：工具类
  - data：基于 `SWR` 的公共数据请求管理

## Tips

### 状态管理

推荐使用 Hooks 进行状态管理：

- 组件/模块内部状态：useState、useReducer
- 全局状态：useContext

### 样式

- 推荐：采用 css-in-js 方案，使用 `styled-components` 实现
  - 将公共样式封装为独立的 Styled 组件
  - `src/components`目录下以“YS”开头的组件为内置的公共组件，大多是对 ant-design 进行较为松散的定制
- 也可采用 CSS Module 方案

### 表单

- 简单表单可采用 `Modal` 弹出层展示，简单表单一般指：

  - 无嵌套表格、表单
  - 无大量数据展示

- 复杂表单根据设计或需要可选择：
  - 单独的表单页：内容应有条理性，分组或分块展示、突出重点，可无限向下滚动
  - 分标签、分步骤的弹出层：每个标签或步骤应满足简单表单要求
  - 侧边抽屉
