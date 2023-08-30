import { createApp } from "vue";
import "./assets/styles/element/index.scss";
import ElementPlus from "element-plus";
import * as elIcons from "@element-plus/icons";
import * as components from "./components/index";
import "dayjs/locale/zh-cn";
import locale from "element-plus/lib/locale/lang/zh-cn";
import App from "./App.vue";
import router from "./router";
import * as util from "./utils/index";

import "./axios";
let app = createApp(App);
app.use(router).use(ElementPlus, { locale, size: "small" }).mount("#app");

// 注册全局组件
Object.keys(components).forEach((key) => {
  app.component(key, components[key]);
});
// 注册图标组件
Object.keys(elIcons).forEach((key) => {
  app.component(key, elIcons[key]);
});
// 添加到全局
app.config.globalProperties.$elIcons = elIcons;
app.config.globalProperties.$util = util;
