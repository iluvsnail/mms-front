/**
 * App Container
 */
import { useState } from "react";
import dayjs from "dayjs";
import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import enUS from "antd/lib/locale/en_US";
import history from "./utils/history";
import { Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./components/Home";
import { i18nKey, i18nList } from "./i18n";
import LanguageContext from "./i18n/LanguageContext";

import "./index.css";
import "./i18n";
import "./App.less";
import "dayjs/locale/zh-cn";

const dayjsLocaleMap = {
  zh: "zh",
  en: "en-us",
};

dayjs.locale(dayjsLocaleMap[i18nList[0].key]);

const antdLocaleMap = {
  zh: zhCN,
  en: enUS,
};

function App() {
  const [language, setLanguage] = useState(i18nList[0].key);

  const languageContextValue = {
    language,
    setLanguage: (newLanguage: i18nKey) => {
      setLanguage(newLanguage);
      dayjs.locale(dayjsLocaleMap[newLanguage]);
    },
  };

  return (
    <LanguageContext.Provider value={languageContextValue}>
      <ConfigProvider locale={antdLocaleMap[language]}>
        <Router history={history}>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/" component={Home} />
          </Switch>
        </Router>
      </ConfigProvider>
    </LanguageContext.Provider>
  );
}

export default App;
