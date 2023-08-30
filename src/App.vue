<template>
  <router-view />
</template>

<style lang="scss">
@import "assets/styles/element/custom";
@import "assets/styles/common/index";
@import "assets/styles/common/custom";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $base-text-color-regular;
  height: 100%;
  font-size: 14px;
}
* {
  padding: 0;
  margin: 0;
}
a {
  text-decoration: none;
}
html,
body {
  width: 100%;
  height: 100%;
}
</style>
