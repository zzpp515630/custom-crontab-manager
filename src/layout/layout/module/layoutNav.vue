<template>
  <div class="layout-nav flex-center-between">
    <el-menu
      class="el-menu-demo"
      :default-active="navActive"
      mode="horizontal"
      :router="false"
      @select="handleSelect"
    >
      <el-menu-item
        v-for="item in dynamicMenu"
        :key="item.id"
        :index="item[prop.index]"
      >
        {{ item[prop.title] }}
      </el-menu-item>
    </el-menu>
    <user-info></user-info>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import prop from "@/layout/config/prop";
import UserInfo from "@/layout/components/UserInfo";
export default {
  name: "layoutNav",
  components: { UserInfo },
  data() {
    return {
      prop: prop,
    };
  },
  computed: {
    ...mapGetters(["navIndex", "loginInfo", "dynamicMenu", "aside"]),
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
    dynamicMenu: {
      handler() {
        console.log(111111, this.dynamicMenu);
        // this.asideFn();
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {},
  created() {},
  methods: {
    /**
     * 菜单选中回调
     */
    handleSelect(val) {
      console.log("菜单选中回调", val);
      window.location.href = val;
    },
    /**
     * 构建侧边栏数据
     */
    asideFn() {
      let active =
        this.$route.meta && this.$route.meta.menu
          ? this.$route.meta.menu
          : this.$route.path;
      let activeArr = this.activeItem(this.dynamicMenu, active);
      console.log("activeArr", activeArr);
      if (activeArr) {
        let navActive = activeArr[0];
        let item = this.dynamicMenu.find(
          (value) => value[this.prop.index] === navActive
        );
        this.$store.commit("setNavIndex", navActive);
        if (activeArr.length > 1) {
          let aside = {
            menu:
              item && item[this.prop.children] ? item[this.prop.children] : [],
            index: activeArr[activeArr.length - 1],
            title: item[this.prop.title] + "平台",
          };
          this.$store.commit("setAsideMenu", aside);
        } else if (activeArr.length === 1) {
          this.$store.commit("setAsideMenu", null);
        }
      }
    },
    /**
     * 获取
     * @param menu
     * @param active
     * @return {[...[], ...[]|null]|null|[]}
     */
    activeItem(menu, active) {
      for (let i = 0; i < menu.length; i++) {
        let path = [];
        path.push(menu[i][this.prop.index]);
        if (menu[i][this.prop.index] === active) {
          return path;
        }
        if (
          menu[i][this.prop.children] &&
          menu[i][this.prop.children].length > 0
        ) {
          let arr = this.activeItem(menu[i][this.prop.children], active);
          if (arr) {
            path = [...path, ...arr];
            return path;
          }
        }
      }
      return null;
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep {
  .el-dropdown-menu__item {
    a {
      text-decoration: none;
    }
  }
}
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
