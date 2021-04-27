const CracoLessPlugin = require('craco-less');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#2196F3' },
            javascriptEnabled: true,
          },
        },
      },
    },
    { plugin: new AntdDayjsWebpackPlugin() },
  ],
};
