<template>
  <div class="layout">
    <div class="head flex-center">
      <layout-logo></layout-logo>
      <layout-nav></layout-nav>
    </div>
    <div class="main flex">
      <layout-aside></layout-aside>
      <layout-main></layout-main>
    </div>
  </div>
<!--  <div class="layout flex">-->
<!--    <layout-aside></layout-aside>-->
<!--    <layout-main></layout-main>-->
<!--  </div>-->
</template>

<script>
import LayoutLogo from "./module/layoutLogo";
import LayoutNav from "./module/layoutNav";
import LayoutAside from "./module/layoutAside";
import LayoutMain from "./module/layoutMain";
export default {
  name: "layout",
  components: { LayoutLogo, LayoutNav, LayoutAside, LayoutMain },
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
