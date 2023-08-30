<template>
  <div>
    <template v-for="item in menu">
      <el-sub-menu
        v-if="item.children && item.children.length > 0"
        :key="item.index"
        :index="item.index"
      >
        <template v-slot:title>
          <i v-if="item.icon" class="menu-icon" :class="item.icon"></i>
          <span>{{ item.title }}</span>
        </template>
        <submenu :menu="item.children">
          <template
            v-for="child in item.children"
            v-slot:[child.index]="{ item }"
          >
            <slot :item="child" :name="child.index"></slot>
          </template>
        </submenu>
      </el-sub-menu>
      <slot v-else :item="item" :name="item.index">
        <el-menu-item :key="item.index" :index="item.index">
          <i v-if="item.icon" class="menu-icon" :class="item.icon"></i>
          <span>{{ item.title }}</span>
        </el-menu-item>
      </slot>
    </template>
  </div>
</template>
<script>
export default {
  name: "submenu",
  props: {
    menu: {
      type: Array,
      default: () => [],
    },
  },
  methods: {},
  setup(props) {
    console.log(props.menu);
    return {};
  },
};
</script>

<style lang="scss">
.menu-icon {
  font-size: 14px;
  margin-right: 6px;
}
</style>
