<template>
  <div class="layout-nav flex-center-between">
<!--    <el-menu-->
<!--      class="el-menu-demo"-->
<!--      :default-active="navActive"-->
<!--      mode="horizontal"-->
<!--      :router="false"-->
<!--      @select="handleSelect"-->
<!--    >-->
<!--      <el-menu-item v-for="item in menu" :key="item.id" :index="item.index">-->
<!--        {{ item.title }}-->
<!--      </el-menu-item>-->
<!--    </el-menu>-->
<!--    <el-dropdown @command="handleCommand">-->
<!--      <span class="el-dropdown-link">-->
<!--        {{ userInfo.name }}<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
<!--      </span>-->
<!--      <el-dropdown-menu #dropdown>-->
<!--        <el-dropdown-item command="logout">退出登录</el-dropdown-item>-->
<!--      </el-dropdown-menu>-->
<!--    </el-dropdown>-->
  </div>
</template>

<script>
import menu from "../config/menu";
import { mapGetters } from "vuex";
export default {
  name: "layoutNav",
  data() {
    return {
      // 选中菜单
      // navActive: "",
      // 菜单选项
      menu: [],
      // 登录用户
      userInfo: { name: "admin" },
    };
  },
  computed: {
    ...mapGetters(["navIndex"]),
    navActive: {
      get() {
        this.$nextTick(() => {
          // 焦点
          let doms = document.getElementsByClassName("el-menu-item");
          for (let dom of doms) {
            dom.blur();
          }
        });
        return this.navIndex;
      },
      set() {},
    },
  },
  watch: {
    // navIndex(val) {
    //   this.navActive = val;
    // },
  },
  created() {
    this.init();
  },
  methods: {
    /**
     * 初始化
     */
    init() {
      this.menu = menu;
      let navActive = sessionStorage.getItem("navActive");
      if (navActive) {
        this.navActive = navActive;
      } else {
        this.$router.push("/");
      }
    },
    /**
     * 菜单选中回调
     */
    handleSelect(val) {
      this.select(val);
    },
    /**
     * 菜单选中回调
     */
    select(val) {
      let item = menu.find((value) => value.index === val);
      let asideMenu = item && item.children ? item.children : [];
      if (asideMenu && asideMenu.length) {
        let firstItem = this.active(asideMenu[0]);
        let index = firstItem ? firstItem.index : "";
        this.$router.push(index);
      } else {
        this.$router.push(val);
      }
    },
    active(item) {
      if (item.children && item.children.length > 0) {
        return this.active(item.children[0]);
      } else {
        return item;
      }
    },
    /**
     * 退出登录
     */
    handleCommand(val) {
      if (val === "logout") {
        document.cookie =
          "JSESSIONID='';path=/project;expires=" + (new Date().getDate() - 10);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.layout-nav {
  width: calc(100% - #{$aside-width});
  height: 100%;
  padding-right: 16px;
  color: $head-text-color;
  ::v-deep {
    .el-menu {
      background-color: $head-bg-color;
    }
    .el-menu.el-menu--horizontal {
      border-bottom: none;
    }
    .el-menu--horizontal > .el-menu-item {
      height: $head-height;
      line-height: $head-height;
      border-bottom-color: $white;
      color: $head-text-color;
      /*margin: 0 20px;*/
      padding: 0 14px;
      text-shadow: 0 0 14px rgba(213, 213, 228, 0.24);
      &:hover {
        color: $head-nav-color-active;
        background-color: $head-nav-bg-active;
      }
      &.is-active,
      &:active,
      &:focus {
        color: $head-nav-color-active;
        background-color: $head-nav-bg-active;
      }
      &.is-active {
        font-weight: 600;
      }
    }
    .el-dropdown {
      color: $head-text-color;
    }
  }
}
</style>
