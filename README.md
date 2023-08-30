# nas-crontab-manager

## 一、项目概述
nas定时任务管理系统；
- > 基于定时系统执行shell命令和http命令，获得的结果可以进行比较再发送邮件，本系统主要用于配置定时任务，并查看管理定时任务

## 二、项目环境

### 2.1**项目架构：**

vue3.0 + element-plus

### 2.2**开发环境：**

Windows+ IDEA + Node.js + Git

## 三、系统模块

### 3.1**系统模块：**
```aidl
├── package.json               // 公共依赖
├── vue.config.js              // 后端代理配置文件                 
├── public                     // 公共资源
|     └── index.html           // 页面入口  
├── src                        // 源码目录
   ├── api                     // 后端接口api文件
   ├── App.vue                 // vue入口       
   ├── assets                  // 样式目录
   ├── axios                   // http请求组件 
   ├── components              // 自定义组件库（查询组件，表单组件，分页组件）
   ├── layout                  // 布局配置
      ├── components
      ├── config
      |      └── menu.js       // 菜单js文件
      ├── index.vue
      ├── layout
      └── module
   ├── main.js                 //主js
   ├── router                  //存放路由                  
   ├── store                   //菜单组件  
   ├── utils                   //工具类
   └── views                   //编写页面
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

    