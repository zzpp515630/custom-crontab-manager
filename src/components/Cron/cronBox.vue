<template>
  <div class="cron-box">
    <el-icon><edit /></el-icon>
    <cron class="cron"></cron>
  </div>
</template>

<script>
import Cron from "./index";
export default {
  name: "cronBox",
  components: { Cron },
  props: {
    modelValue: String, // 以前是`value：String`
  },
  emits: ["update:modelValue"],
};
</script>

<style lang="scss" scoped>
.cron-box {
  position: relative;
  .cron {
    position: absolute;
    z-index: 1000;
    width: 500px;
    background-color: #fff;
    border: 1px solid #ddd;
    padding: 12px;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgb(0 0 0 / 15%);
  }
}
</style>
