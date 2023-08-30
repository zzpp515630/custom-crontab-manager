<template>
  <div class="layout">
    <div class="head flex-center">
      <layout-logo></layout-logo>
<!--      <layout-nav></layout-nav>-->
    </div>
    <div class="main flex">
      <layout-aside></layout-aside>
      <layout-main></layout-main>
    </div>
  </div>
</template>

<script>
import LayoutLogo from "./module/layoutLogo";
import LayoutNav from "./module/layoutNav";
import LayoutAside from "./module/layoutAside";
import LayoutMain from "./module/layoutMain";
export default {
  name: "index",
  components: { LayoutLogo, LayoutNav, LayoutAside, LayoutMain },
  data() {
    return {
      path: this.$route.path,
    };
  },
  watch: {
    "$route.path"(val) {
      this.path = val;
    },
  },
  mounted() {},
};
</script>

<style lang="scss">
.layout {
  width: 100%;
  height: 100%;
  .head {
    height: $head-height;
    box-sizing: border-box;
    position: relative;
    z-index: 100;
    background-color: $head-bg-color;
    border-bottom: $head-border-bottom;
    box-shadow: $head-box-shadow;
  }
  .main {
    width: 100%;
    height: calc(100% - #{$head-height});
  }
}
</style>
