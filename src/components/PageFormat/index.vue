<!--页面版型-->
<template>
  <div class="page-format">
    <div class="page-format-title flex-center-between">
      <slot name="page-title">
        <span>{{ title }}</span>
      </slot>
      <div>
        <slot name="title-right"></slot>
      </div>
    </div>
    <div class="page-format-body">
      <div v-if="component === 'basic'" class="page-format-body__basic">
        <slot></slot>
      </div>
      <div v-if="component === 'lr'" class="page-format-body__lr">
        <div class="page-format-body__left">
          <div>
            <slot name="page-left"></slot>
          </div>
        </div>
        <div class="page-format-body__right">
          <div>
            <slot name="page-right"></slot>
          </div>
        </div>
        <slot></slot>
      </div>
    </div>
  </div>
  <!--  <component :is="component">-->
  <!--    <template #title-right>-->
  <!--      <slot name="title-right"></slot>-->
  <!--    </template>-->
  <!--    <template #default>-->
  <!--      <slot></slot>-->
  <!--    </template>-->
  <!--  </component>-->
</template>

<script>
import basic from "./basic";
export default {
  name: "PageFormat",
  components: { basic },
  props: {
    // 标题
    title: {
      type: String,
      default: "",
    },
    /**
     * 页面基础布局类型
     * @enum basic 基础样式
     *       lr 左右两列
     *       tb 上线两行
     */
    component: {
      type: String,
      default: "basic",
      validator: (value) => {
        return ["basic", "lr"].indexOf(value) !== -1;
      },
    },
    // /**
    //  * 类别
    //  * @enum basic 基础样式
    //  *       lr 左右两列
    //  *       tb 上线两行
    //  */
    // component: {
    //   type: String,
    //   default: "basic",
    //   validator: (value) => {
    //     return ["basic", "lr", ].indexOf(value) !== -1;
    //   },
    // },
  },
};
</script>

<style lang="scss" scoped>
// 标题栏高度
$title-height: 52px;
// lr模式下，左侧默认宽度
$page-left: 200px;
.page-format {
  width: calc(100% - 33px);
  height: calc(100% - 32px);
  margin: 16px;
  box-sizing: border-box;
  .page-format-title {
    height: $title-height;
    padding: 0 16px;
    box-sizing: border-box;
    margin-bottom: 16px;
    background-color: $white;
  }
  .page-format-body {
    height: calc(100% - #{$title-height} - 16px);
    box-sizing: border-box;
    overflow: hidden;
    background-color: $white;
    &__basic {
      height: 100%;
      padding: 16px;
      box-sizing: border-box;
      overflow: auto;
    }
    &__lr {
      height: 100%;
      @include flex-center;
    }
    &__left,
    &__right {
      overflow: hidden;
      height: 100%;
      /*padding: 16px;*/
      box-sizing: border-box;
      & > div {
        overflow: auto;
        height: 100%;
      }
    }
    &__left {
      width: $page-left;
      padding: 16px 0;
      border-right: 1px solid $border-color;
    }
    &__right {
      width: calc(100% - #{$page-left});
      padding: 16px;
    }
  }
}
</style>
