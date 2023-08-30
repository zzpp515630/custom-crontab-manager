import store from "@/store";
import prop from "@/layout/config/prop";

/**
 * 构建侧边栏数据
 */
export function setAside(menu, active) {
  let activeArr = activeItem(menu, active);
  console.log("activeArr---", activeArr);
  if (activeArr) {
    let navActive = activeArr[0];
    let item = menu.find((value) => value[prop.index] === navActive);
    store.commit("setNavIndex", navActive);
    if (activeArr.length > 1) {
      let aside = {
        menu: item && item[prop.children] ? item[prop.children] : [],
        index: activeArr[activeArr.length - 1],
        title: item[prop.title] + "平台",
      };
      store.commit("setAsideMenu", aside);
    } else if (activeArr.length === 1) {
      store.commit("setAsideMenu", null);
    }
  } else {
    store.commit("setNavIndex", "");
    store.commit("setAsideMenu", null);
  }
}

/**
 * 查找菜单项
 * @param menu
 * @param active
 * @returns {[]}
 */
function activeItem(menu, active) {
  for (let i = 0; i < menu.length; i++) {
    let path = [];
    path.push(menu[i][prop.index]);
    if (menu[i][prop.index] === active) {
      return path;
    }
    if (menu[i][prop.children] && menu[i][prop.children].length > 0) {
      let arr = activeItem(menu[i][prop.children], active);
      if (arr) {
        path = [...path, ...arr];
        return path;
      }
    }
  }
  return null;
}
