/* @description 全屏组件 */
<template>
  <div class="full-screen">
    <el-tooltip
      v-if="tooltip"
      :content="content"
      effect="dark"
      :placement="placement"
    >
      <span class="full-screen-label" :class="disabled ? ' disabled' : ''" @click="click">全屏</span>
    </el-tooltip>
    <template v-else>
      <span class="full-screen-label" :class="disabled ? ' disabled' : ''" @click="click">全屏</span>
    </template>
  </div>
</template>

<script>
export default {
  name: "FullScreen",
  props: {
    // 要被全屏现实的dom，必传项
    el: {
      required: true,
    },
    // 图标
    icon: {
      type: Object,
      default: () => {
        return {
          fullScreen: "iconfont icon_full_screen",
          cancelFullScreen: "iconfont icon_cancel_full_screen",
        };
      },
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false,
    },
    // 图标大小
    size: {
      type: [Number, String],
      default: 24,
    },
    // 图标颜色
    color: {
      type: String,
      default: "",
    },
    // 提示文字的方向
    placement: {
      type: String,
      default: "bottom",
    },
    // 是否显示提示文字
    tooltip: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // 图标
      iconClass: this.icon.fullScreen,
      // 提示文字
      content: "全屏",
    };
  },
  mounted() {
    window.onresize = () => {
      if (document.fullscreen) {
        this.iconClass = this.icon.cancelFullScreen;
        this.content = "退出全屏";
        this.$emit("fullscreen", true);
      } else {
        this.iconClass = this.icon.fullScreen;
        this.content = "全屏";
        this.$emit("fullscreen", false);
      }
    };
  },
  methods: {
    /**
     * 点击事件
     */
    click() {
      console.log("点击事件", this.el);
      if (document.fullscreen) {
        this.iconClass = this.icon.fullScreen;
        this.content = "全屏";
        this.utilExitFullscreen();
      } else {
        this.iconClass = this.icon.cancelFullScreen;
        this.content = "退出全屏";
        this.utilOpenFullscreen(this.el);
      }
    },
    /**
     * 全屏显示dom
     * @param el 需要全屏显示的dom
     */
    utilOpenFullscreen(el) {
      if (el.requestFullscreen) {
        el.requestFullscreen();
      } else if (el.mozRequestFullScreen) {
        /* Firefox */
        el.mozRequestFullScreen();
      } else if (el.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        el.webkitRequestFullscreen();
      } else if (el.msRequestFullscreen) {
        /* IE/Edge */
        el.msRequestFullscreen();
      }
    },
    /**
     * 退出全屏
     */
    utilExitFullscreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.oRequestFullscreen) {
        document.oCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.full-screen {
  width: 100%;
  .full-screen-label {
    outline: none;
    display: block;
    width: 100%;
  }
  i {
    font-size: 24px;
    outline: none;
  }
}
</style>
