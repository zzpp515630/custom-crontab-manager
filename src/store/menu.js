/**
 * @description 菜单
 */
const state = () => ({
  // 一级导航
  navIndex: "",
  // 侧边数据
  aside: {
    menu: [], // 菜单数据
    index: "", // 激活菜单
    title: "", // 标题
  },
});
const getters = {
  navIndex: (state) => state.navIndex,
  aside: (state) => state.aside,
};
const mutations = {
  setAsideMenu(state, obj) {
    if (obj) {
      state.aside = obj;
    } else {
      state.aside = {
        menu: [],
        index: "",
        title: "",
      };
    }
  },
  setAsideIndex(state, index) {
    state.aside.index = index;
  },
  setNavIndex(state, index) {
    state.navIndex = index;
    sessionStorage.setItem("navActive", index);
  },
};
// const actions = {}
export default { state, getters, mutations };
