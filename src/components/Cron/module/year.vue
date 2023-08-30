<template>
  <div class="line">
    <input v-model="types" type="radio" value="unAppoint" />
    <div>不指定 允许的通配符[, - * /] 非必填</div>
  </div>
  <div class="line">
    <input v-model="types" type="radio" value="wildcard" />
    <div>每年</div>
  </div>
  <div class="line">
    <input v-model="types" type="radio" value="period" />
    <div class="line-flex">
      <span>周期 从</span>
      <input v-model="frequencyStart" @input="periodInput" />
      <span>-</span>
      <input v-model="frequencyEnd" @input="periodInput" />
    </div>
  </div>
</template>

<script>
import general from "./general";
export default {
  name: "cronYear",
  props: {
    timeItem: {
      type: Object,
      default: () => {},
    },
    value: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "",
    },
  },
  emits: ["update:timeItem", "update:value", "update:type"],
  setup(props, { emit }) {
    let obj = general(props, { emit }, "year");
    return {
      ...obj,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../style/scss";
</style>
