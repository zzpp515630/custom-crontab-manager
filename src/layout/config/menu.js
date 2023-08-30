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
export default [
  {
    index: "/task",
    title: "定时任务",
    fullPath: "@/views/task.vue",
  },
  {
    index: "/appList",
    title: "应用列表",
    fullPath: "@/views/codeEdit.vue",
  },
  {
    index: "/system",
    title: "系统配置",
    fullPath: "@/views/system.vue",
  }

];
