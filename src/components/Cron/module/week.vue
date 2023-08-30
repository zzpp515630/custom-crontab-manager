<template>
  <div class="line">
    <input v-model="types" type="radio" value="wildcard" />
    <div>每周 允许的通配符[, - * / L #]</div>
  </div>
  <div class="line">
    <input v-model="types" type="radio" value="unAppoint" />
    <div>不指定</div>
  </div>
  <div class="line">
    <input v-model="types" type="radio" value="period" />
    <div class="line-flex">
      <span>周期 从星期</span>
      <input v-model="frequencyStart" @input="periodInput" />
      <span>-</span>
      <input v-model="frequencyEnd" @input="periodInput" />
    </div>
  </div>
  <div class="line">
    <input v-model="types" type="radio" value="weekOfDay" />
    <div class="line-flex">
      <span>第</span>
      <input v-model="weekStart" @input="weekOfDayInput" />
      <span>周的星期</span>
      <input v-model="weekEnd" @input="weekOfDayInput" />
    </div>
  </div>
  <div class="line">
    <input v-model="types" type="radio" value="lastWeekOfDay" />
    <div class="line-flex">
      <span>本月最后一个星期</span>
      <input v-model="lastWeekOfDay" @input="lastWeekOfDayInput" />
    </div>
  </div>
<!--  <div class="line">-->
<!--    <input v-model="types" type="radio" value="weekOfDay" />-->
<!--    <div>本月最后一周</div>-->
<!--  </div>-->
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
  name: "cronWeek",
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
    let obj = general(props, { emit }, "week");
    return {
      ...obj,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../style/scss";
</style>
