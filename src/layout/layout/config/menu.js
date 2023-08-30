/**
 * @description 菜单数据
 * id id
 * index 唯一标志，
 *       请保证唯一性，
 *       侧边菜单使用 vue-router 的模式，激活导航时以 index 作为 path 进行路由跳转
 * title 菜单中文名
 * fullPath 菜单对应页面完整路径
 * icon 菜单图标
 */
const dynamicMenu = [
  {
    id: 15,
    resourceName: "指标引擎",
    resourceType: 1,
    parentId: 0,
    resourceRouting: "123123123123",
    children: null,
  },
  {
    id: 46,
    resourceName: "基础管理",
    resourceType: 1,
    parentId: 0,
    resourceRouting: "http://10.0.2.144:8170/uaa",
    children: [
      {
        id: 47,
        resourceName: "组织机构",
        resourceType: 2,
        parentId: 46,
        resourceRouting: "/organization",
        children: null,
      },
      {
        id: 48,
        resourceName: "角色管理",
        resourceType: 2,
        parentId: 46,
        resourceRouting: "/role",
        children: null,
      },
      {
        id: 52,
        resourceName: "菜单管理",
        resourceType: 2,
        parentId: 46,
        resourceRouting: "/menu",
        children: null,
      },
    ],
  },
  {
    id: 9,
    resourceName: "数据开发",
    resourceType: 1,
    parentId: 0,
    // resourceRouting: "http://10.0.2.144:9100/project/#/",
    resourceRouting: "http://localhost:3001/#/",
    children: [
      {
        id: 12,
        resourceName: "数据查询",
        resourceType: 2,
        parentId: 9,
        resourceRouting: "/dataQuery",
        children: [
          {
            id: 33,
            resourceName: "数据查询",
            resourceType: 2,
            parentId: 12,
            resourceRouting: "/dataQuery",
            children: [
              {
                id: 35,
                resourceName: "新增订阅",
                resourceType: 3,
                parentId: 33,
                resourceRouting: null,
                children: null,
              },
              {
                id: 36,
                resourceName: "历史查询",
                resourceType: 3,
                parentId: 33,
                resourceRouting: null,
                children: null,
              },
              {
                id: 37,
                resourceName: "格式化",
                resourceType: 3,
                parentId: 33,
                resourceRouting: null,
                children: null,
              },
              {
                id: 38,
                resourceName: "执行",
                resourceType: 3,
                parentId: 33,
                resourceRouting: null,
                children: null,
              },
            ],
          },
          {
            id: 34,
            resourceName: "数据订阅",
            resourceType: 2,
            parentId: 12,
            resourceRouting: "/subscribe",
            children: null,
          },
        ],
      },
      {
        id: 31,
        resourceName: "数据开发",
        resourceType: 2,
        parentId: 9,
        resourceRouting: "/dataDevelop",
        children: null,
      },
      {
        id: 54,
        resourceName: "算子管理",
        resourceType: 2,
        parentId: 32,
        resourceRouting: "/algorithmManage",
        children: null,
      },
    ],
  },
  {
    id: 10,
    resourceName: "网络分析",
    resourceType: 1,
    parentId: 0,
    resourceRouting: "http://www.baidu.com",
    children: [
      {
        id: 11,
        resourceName: "default页面",
        resourceType: 2,
        parentId: 10,
        resourceRouting: "23",
        children: [
          {
            id: 13,
            resourceName: "发发发",
            resourceType: 3,
            parentId: 11,
            resourceRouting: "333",
            children: null,
          },
        ],
      },
    ],
  },
  {
    id: 60,
    resourceName: "运维管理",
    resourceType: 1,
    parentId: 0,
    // resourceRouting: "http://10.0.2.144:9100/project/#/dataSource",
    resourceRouting: "http://localhost:3001/#/dataSource",
    children: [
      {
        id: 61,
        resourceName: "资源管理",
        resourceType: 2,
        parentId: 60,
        resourceRouting: "/dataSource",
        children: [
          {
            id: 62,
            resourceName: "数据源管理",
            resourceType: 2,
            parentId: 61,
            resourceRouting: "/dataSource",
            children: null,
          },
        ],
      },
    ],
  },
];

/**
 * id id
 * index 唯一标志，
 *       请保证唯一性，
 *       侧边菜单使用 vue-router 的模式，激活导航时以 index 作为 path 进行路由跳转
 * title 菜单中文名
 * fullPath 菜单对应页面完整路径
 * icon 菜单图标
 */
const menu = [
  {
    index: "/dataManager",
    title: "数据管理",
    fullPath: "../views/dataManager/index.vue",
  },
  {
    index: "/dataCollection",
    title: "数据采集",
    fullPath: "../views/dataCollection/index.vue",
  },
  {
    index: "1",
    title: "数据开发",
    children: [
      {
        index: "11",
        title: "数据查询",
        icon: "iconfont icon_data_query",
        children: [
          {
            index: "/dataQuery",
            title: "数据查询",
            icon: "iconfont",
            fullPath: "../views/dataQuery/dataQuery/index.vue",
          },
          {
            index: "/subscribe",
            title: "数据订阅",
            icon: "iconfont",
            fullPath: "../views/dataQuery/subscribe/index.vue",
          },
        ],
      },
      {
        index: "/dataDevelop",
        icon: "iconfont icon_data_development",
        title: "数据开发",
      },
      {
        index: "/algorithmManage",
        icon: "iconfont icon_operator",
        title: "算子管理",
        fullPath: "../views/algorithmManage/index.vue",
      },
    ],
  },
  {
    index: "/dataAnalysis",
    title: "数据分析",
    fullPath: "../views/dataAnalysis/index.vue",
  },
  {
    index: "/networkAnalysis",
    title: "网络分析",
    fullPath: "../views/networkAnalysis/index.vue",
  },
  {
    index: "/visual",
    title: "数据可视化",
    fullPath: "../views/visual/index.vue",
  },
  {
    index: "/dataProduct",
    title: "数据产品",
    fullPath: "../views/dataProduct/index.vue",
  },
  {
    index: "/dataService",
    title: "数据服务",
    fullPath: "../views/dataService/index.vue",
  },
  {
    index: "2",
    title: "运维管理",
    children: [
      // {
      //   index: "/dataSource",
      //   icon: "el-icon-coin",
      //   title: "数据源管理",
      //   fullPath: "../views/dataSource/index.vue",
      // },
      {
        index: "22",
        icon: "iconfont icon_data_source",
        title: "资源管理",
        children: [
          {
            index: "/dataSource",
            title: "数据源管理",
            fullPath: "../views/dataSource/index.vue",
          },
          {
            index: "/fileManagement",
            title: "文件管理",
            fullPath: "../views/fileManagement/index.vue",
          },
        ],
      },
      {
        index: "3",
        icon: "iconfont icon_task_management",
        title: "任务管理",
        children: [
          {
            index: "/taskType",
            icon: "",
            title: "任务分类",
            fullPath: "../views/opsManage/tasks/taskType",
          },
          {
            index: "/taskList",
            icon: "",
            title: "任务列表",
            fullPath: "../views/opsManage/tasks/taskList",
          },
          {
            index: "/taskMonitoring",
            icon: "",
            title: "任务监控",
            fullPath: "../views/opsManage/tasks/taskMonitoring",
          },
          {
            index: "31",
            icon: "",
            title: "资源监控",
            children: [
              {
                index: "/resourceMonitoring/systemService",
                icon: "",
                title: "系统服务监控",
              },
              {
                index: "/resourceMonitoring/bigdataCluster",
                icon: "",
                title: "集群监控",
              },
              {
                index: "/resourceMonitoring/bigdataService",
                icon: "",
                title: "大数据服务监控",
              },
            ],
          },
          {
            index: "/alarmManage",
            icon: "",
            title: "预警管理",
            fullPath: "../views/opsManage/tasks/alarmManage",
          },
        ],
      },
    ],
  },
];
export default dynamicMenu;
