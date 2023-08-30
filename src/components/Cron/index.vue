<template>
  <div class="cron">
    <div class="cron-expression">
      <span>cron表达式：</span>
      <input v-model="expression" type="text" />
      <el-icon @click="nextTime()"><search /></el-icon>
    </div>
    x

    <div class="cron-time">
      <div
        v-for="(item, key) in time"
        :key="key"
        class="cron-time-item"
        :class="selectTime === key ? 'is-active' : ''"
        @click="timeClick(item, key)"
      >
        {{ item.label }}
      </div>
    </div>
    <component
      :is="selectTime"
      v-model:value="time[selectTime].config[time[selectTime].type]"
      v-model:type="time[selectTime].type"
      v-model:timeItem="time[selectTime]"
    ></component>
    <el-dialog
      v-model="cronAnalysis"
      :title="`最近${num}次执行时间`"
      width="250px"
    >
      <div
        style="font-size: 16px; text-align: center; line-height: 20px"
      >
        <p v-for="time in cronNext" :key="time">
          {{ time }}
        </p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { ref, watch, reactive } from "vue";
import second from "./module/second";
import minute from "./module/minute";
import hour from "./module/hour";
import day from "./module/day";
import month from "./module/month";
import week from "./module/week";
import year from "./module/year";
import * as taskRequest from "../../api/task";
export default {
  name: "cron",
  components: {
    second,
    minute,
    hour,
    day,
    month,
    week,
    year,
  },
  props: {
    modelValue: String, // 以前是`value：String`
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    // 表达式
    let expression = ref("* * * * * ?");
    // 当前选中
    let selectTime = ref("second");
    let time = reactive({
      second: {
        label: "秒",
        type: "wildcard",
        config: { wildcard: "*", period: "1-2", frequency: "0/1", appoint: "" },
      }, // wildcard
      minute: {
        label: "分钟",
        type: "wildcard",
        config: { wildcard: "*", period: "1-2", frequency: "0/1", appoint: "" },
      },
      hour: {
        label: "小时",
        type: "wildcard",
        config: { wildcard: "*", period: "1-2", frequency: "0/1", appoint: "" },
      },
      day: {
        label: "日",
        type: "wildcard",
        config: {
          wildcard: "*",
          unAppoint: "?",
          period: "1-2",
          frequency: "0/1",
          workDay: "1W",
          lastDay: "L",
          appoint: "",
        },
      },
      month: {
        label: "月",
        type: "wildcard",
        config: {
          wildcard: "*",
          unAppoint: "?",
          period: "1-2",
          frequency: "0/1",
          appoint: "",
        },
      },
      week: {
        label: "周",
        type: "unAppoint",
        config: {
          wildcard: "*",
          unAppoint: "?",
          period: "1-2",
          weekOfDay: "1#1",
          lastWeekOfDay: "1L",
          appoint: "",
        },
      },
      year: {
        label: "年",
        type: "unAppoint",
        config: {
          unAppoint: "",
          wildcard: "*",
          period: "2022-2023",
        },
      },
    });
    function timeClick(item, key) {
      selectTime.value = key;
    }
    watch(
      time,
      (val) => {
        let exp = [];
        for (let key in val) {
          exp.push(val[key].config[val[key].type]);
        }
        expression.value = exp.join(" ");
        emit("update:modelValue", expression);
      },
      { deep: true, immediate: true }
    );
    let cronAnalysis = ref(false);
    let cronNext = ref([]);
    const num = ref(10);
    const nextTime = async () => {
      console.log("expression", expression);
      let res = await taskRequest.getCronAnalysis({
        cron: expression.value,
        num: num.value,
      });
      if (res && res.data) {
        cronAnalysis.value = true;
        cronNext.value = res.data;
      }
    };
    return {
      expression,
      selectTime,
      time,
      timeClick,
      cronAnalysis,
      nextTime,
      num,
      cronNext,
    };
  },
};
</script>

<style lang="scss" scoped>
.cron {
  &-expression {
    /*border-bottom: 1px solid #ddd;*/
    padding-bottom: 12px;
  }
  &-time {
    display: flex;
    justify-content: space-between;
    &-item {
      flex: 1;
      cursor: pointer;
      padding: 6px 12px;
      border-bottom: 1px solid #ddd;
      border-radius: 4px 4px 0 0;
      text-align: center;
      &:hover {
        background-color: #f7f7f7;
      }
      &.is-active {
        border: 1px solid #ddd;
        border-bottom: transparent;
      }
    }
  }
  input {
    outline: none;
    padding: 4px 10px;
    line-height: 16px;
    border: 1px solid #ddd;
    border-radius: 2px;
    &:focus {
      border-color: $primary;
    }
  }
}
</style>
