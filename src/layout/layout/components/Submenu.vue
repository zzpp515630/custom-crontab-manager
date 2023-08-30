<template>
  <div>
    <template v-for="item in menu">
      <el-submenu
        v-if="item[prop.children] && item[prop.children].length > 0"
        :key="item[prop.id]"
        :index="item[prop.index]"
      >
        <template slot="title">
          <i
            v-if="item[prop.icon]"
            class="menu-icon"
            :class="item[prop.icon]"
          ></i>
          <span slot="title">{{ item[prop.title] }}</span>
        </template>
        <submenu :menu="item[prop.children]"></submenu>
      </el-submenu>
      <el-menu-item v-else :key="item[prop.id]" :index="item[prop.index]">
        <i
          v-if="item[prop.icon]"
          class="menu-icon"
          :class="item[prop.icon]"
        ></i>
        <span>{{ item[prop.title] }}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
import prop from "@/layout/config/prop";
export default {
  name: "submenu",
  props: {
    menu: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      prop: prop,
    };
  },
  methods: {},
};
</script>

<style lang="scss">
.menu-icon {
  font-size: 14px;
  margin-right: 6px;
}
</style>
