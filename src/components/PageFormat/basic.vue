<template>
  <div class="page-format--basic">
    <div class="page-format-title flex-center-between">
      <slot name="page-title">
        <span>{{ title }}</span>
      </slot>
      <div>
        <slot name="title-right"></slot>
      </div>
    </div>
    <div class="page-basic">
      <div class="page-basic-inner">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "basic",
    props: {
      title: {
        type: String,
        default: "",
      },
    },
  };
</script>

<style lang="scss" scoped>
.page-format--basic {
  /*width: calc(100% - 32px);*/
  width: calc(100% - 33px);
  height: calc(100% - 32px);
  margin: 16px;
  box-sizing: border-box;
  $title-height: 48px;
  .page-format-title {
    height: $title-height;
    padding: 0 16px;
    box-sizing: border-box;
    margin-bottom: 16px;
    background-color: $white;
  }
  .page-basic {
    height: calc(100% - #{$title-height} - 16px);
    box-sizing: border-box;
    overflow: hidden;
    background-color: $white;
    .page-basic-inner {
      height: 100%;
      padding: 16px;
      box-sizing: border-box;
      overflow: auto;
    }
  }
}
</style>
