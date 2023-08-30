<template>
  <div class="layout-main">
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
  // overflow: hidden;
  flex: 1;
  & > div {
    height: 100%;
    overflow: auto;
  }
}
</style>
<style>
/*  */
</style>
