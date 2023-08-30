<template>
  <div class="line">
    <input v-model="types" type="radio" value="wildcard" />
    <div>每日 允许的通配符[, - * / L W]</div>
  </div>
  <div class="line">
    <input v-model="types" type="radio" value="unAppoint" />
    <div>不指定</div>
  </div>
  <div class="line">
    <input v-model="types" type="radio" value="period" />
    <div class="line-flex">
      <span>周期 从</span>
      <input v-model="frequencyStart" @input="periodInput" />
      <span>-</span>
      <input v-model="frequencyEnd" @input="periodInput" />日
    </div>
  </div>
  <div class="line">
    <input v-model="types" type="radio" value="frequency" />
    <div class="line-flex">
      <span>从</span>
      <input v-model="frequencyOnset" @input="frequencyInput" />
      <span>日开始,每</span>
      <input v-model="frequencyUnit" @input="frequencyInput" />
      <span>天执行一次</span>
    </div>
  </div>
  <div class="line">
    <input v-model="types" type="radio" value="workDay" />
    <div class="line-flex">
      <span>每月</span>
      <input v-model="workDay" @input="workDayInput" />
      <span>号最近的那个工作日</span>
    </div>
  </div>
  <div class="line">
    <input v-model="types" type="radio" value="lastDay" />
    <div>本月最后一天</div>
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
  name: "cronDay",
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
    let obj = general(props, { emit }, "day");
    return {
      ...obj,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "../style/scss";
</style>
