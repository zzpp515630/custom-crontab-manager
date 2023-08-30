<template>
  <div class="layout-logo flex-center" :class="logo.light ? 'light' : 'dark'">
<!--    <img alt="logo" class="logo" :src="`${logo.src}`" @click="logoClick" />-->
  </div>
</template>

<script>
export default {
  name: "layoutLogo",
  data() {
    return {
      // 平台名称
      // title: "虚拟",
      // logo
      logo: {
        // src: require("../assets/images/logo-light.svg"),
        light: false,
      },
    };
  },
  watch: {},
  methods: {
    logoClick() {
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
.layout-logo {
  width: $aside-width;
  height: 100%;
  flex-shrink: 0;
  transition: background-color 0.3s;
  .logo {
    width: 193px;
    height: 64px;
  }
  &.light {
    background-color: $white;
  }
  &.dark {
    background-color: $logo-bg-color;
  }
}
</style>
