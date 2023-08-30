<template>
  <div class="line">
    <input v-model="types" type="radio" value="wildcard" />
    <div>每秒 允许的通配符[, - * /]</div>
  </div>
  <div class="line">
    <input v-model="types" type="radio" value="period" />
    <div class="line-flex">
      <span>周期 从</span>
      <input v-model="frequencyStart" :disabled="types !== 'period'" @input="periodInput" />
      <span>-</span>
      <input v-model="frequencyEnd" :disabled="types !== 'period'" @input="periodInput" />秒
    </div>
  </div>
  <div class="line">
    <input v-model="types" type="radio" value="frequency" />
    <div class="line-flex">
      <span>从</span>
      <input v-model="frequencyOnset" :disabled="types !== 'frequency'" @input="frequencyInput" />
      <span>秒开始,每</span>
      <input v-model="frequencyUnit" :disabled="types !== 'frequency'" @input="frequencyInput" />
      <span>秒执行一次</span>
    </div>
  </div>
  <div class="line">
    <input v-model="types" type="radio" value="appoint" />
    <div>指定</div>
  </div>
  <div class="appoint">
    <div v-for="item in appointArr" :key="item" class="appoint-item">
      <input
        v-model="appointValue"
        type="checkbox"
        :value="item"
        :disabled="types !== 'appoint'"
        @input="appointInput(item)"
      />
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
import general from "./general";
export default {
  name: "cronSecond",
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
    let obj = general(props, { emit }, "second");
    return {
      ...obj,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../style/scss";
</style>
