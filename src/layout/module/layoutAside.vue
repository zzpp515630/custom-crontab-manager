<template>
  <div
    v-show="asideMenu && asideMenu.length > 0"
    class="layout-aside"
    :class="{ 'layout-aside-collapse': isCollapse }"
  >
    <el-menu
      ref="menu"
      :collapse="isCollapse"
      :default-active="asideActive"
      :router="true"
      unique-opened
    >
      <submenu :menu="asideMenu"></submenu>
    </el-menu>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
import menu from "../config/menu";
import Submenu from "../components/Submenu";
export default {
  name: "layoutAside",
  components: { Submenu },
  data() {
    return {
      // aside: {},
      // 是否收缩
      isCollapse: false,
    };
  },
  computed: {
    // ...mapGetters(["aside"]),
    // 默认选中的菜单
    asideActive() {
      this.$nextTick(() => {
        // 焦点
        let doms = document.getElementsByClassName("el-menu-item");
        for (let dom of doms) {
          dom.blur();
        }
      });
      // return this.aside.index;
      return this.asideMenu[0].index;
    },
    // 侧边栏菜单
    asideMenu() {
      return menu;
    },
  },
};
</script>

<style lang="scss">
.layout-aside {
  flex-shrink: 0;
  width: $aside-width;
  height: 100%;
  background-color: $aside-bg-color;
  //border-right: 1px solid $border-color-lighter;
  box-shadow: $base-box-shadow;
  position: relative;
  z-index: 10;
  transition: width 0.3s;
  .collapse-button {
    width: 100%;
    height: 56px;
    padding-left: $aside-menu-padding;
    box-sizing: border-box;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: 0.3s all ease-in-out;
    .fold {
      margin-right: 16px;
      transition: 0.3s margin-right ease-in-out;
    }
    .aside-title {
      white-space: nowrap;
      transition: 0.3s width ease-in-out, 0.3s height ease-in-out;
    }
  }
  .el-menu {
    border-right: none;
    background-color: $aside-bg-color;
    .el-submenu__title,
    .el-menu-item {
      height: $aside-menu-height;
      line-height: $aside-menu-height;
      color: $aside-menu-color;
      font-size: $aside-font-size;
      margin-top: 8px;
      border-left: 2px solid transparent;
      font-weight: 500;
      min-width: calc(#{$aside-width--collapse} - 2px);
    }
    .el-menu-item.is-active {
      color: $aside-menu-color-active;
      background-color: $aside-menu-bg-active;
      border-left: 2px solid $primary;
    }
    .el-menu-item,
    .el-submenu > .el-submenu__title {
      .menu-icon {
        color: $aside-menu-color;
        font-size: 16px;
        transition: 0.3s margin-right ease-in-out;
      }
      span {
        transition: 0.3s width ease-in-out, 0.3s height ease-in-out;
      }
    }
    .el-menu-item.is-active {
      color: $aside-menu-color-active;
      background-color: $aside-menu-bg-active;
      border-left: 2px solid $primary;
      .menu-icon {
        color: $aside-menu-color-active;
      }
    }
    .el-submenu {
      .el-menu {
        background-color: #f5f6f8;
      }
      &.is-active {
        .menu-icon,
        .el-submenu__title {
          color: $base-text-color;
        }
      }
    }
    .el-menu-item:hover,
    .el-menu-item:focus {
      background-color: $aside-menu-bg-hover;
    }
    .el-submenu__title:hover,
    .el-submenu__title:focus {
      background-color: $aside-menu-bg-hover;
    }
  }
  .el-menu.el-menu--collapse {
    .el-submenu,
    .el-menu-item {
      border-left: 2px solid transparent;
    }
    .el-menu-item.is-active {
      color: $aside-menu-color-active;
      background-color: $aside-menu-bg-active;
      border-left: 2px solid $primary;
    }
    .el-submenu.is-active {
      color: $aside-menu-color-active;
      background-color: $aside-menu-bg-active;
      border-left: 2px solid $primary;
      .el-submenu__title i {
        color: $aside-menu-color-active;
      }
    }
  }
  &-collapse {
    width: $aside-width--collapse;
    .el-menu-item,
    .el-submenu > .el-submenu__title {
      text-align: center;
      .menu-icon {
        margin-right: 4px;
      }
      .el-submenu__icon-arrow {
        display: none;
      }
      span {
        opacity: 0;
        height: 0;
        width: 0;
        overflow: hidden;
        visibility: hidden;
        display: inline-block;
      }
    }
    .collapse-button {
      padding-left: 24px;
      .fold {
        margin-right: 0;
      }
      .aside-title {
        width: 0;
        height: 0;
        opacity: 0;
      }
    }
  }
}
</style>
