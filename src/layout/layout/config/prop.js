/**
 * 菜单配置项
 * id id
 * index 唯一标志，
 *       请保证唯一性，
 *       侧边菜单使用 vue-router 的模式，激活导航时以 index 作为 path 进行路由跳转
 * title 菜单中文名
 * fullPath 菜单对应页面完整路径
 * icon 菜单图标
 */
export default {
  id: "id",
  index: "resourceRouting",
  title: "resourceName",
  icon: "icon",
  children: "children",
};
