<template>
  <div class="layout-main">
<!--    <div class="layout-main&#45;&#45;inner">-->
<!--      <router-view />-->
<!--    </div>-->
    <router-view />
  </div>
</template>

<script>
export default {
  name: "layoutMain",
};
</script>

<style lang="scss" scoped>
.layout-main {
  width: calc(100% - 200px);
  height: 100%;
  /*overflow: hidden;*/
  flex: 1;
  background-color: $bg-color;
  /*&--inner {
    background-color: $bg-color;
    height: 100%;
    overflow: auto;
  }*/
}
</style>
