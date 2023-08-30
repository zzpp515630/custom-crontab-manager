<template>
  <div class="execute-cycle">
    <div class="cycle flex-center">
      <span class="front-text">按</span>
      <el-select
        v-model="cron.cycleType"
        placeholder="请选择周期"
        @change="cycleChange"
      >
        <el-option
          v-for="item in frequencyCycleList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <div class="flex">
      <span class="front-text">每</span>
      <el-row :gutter="8">
        <el-col v-if="cron.cycleType === 'month'" class="flex-center" :span="8">
          <el-cascader
            v-model="monthValue"
            clearable
            collapse-tags
            :options="month"
            :props="props"
            :show-all-levels="false"
            @change="monthChange"
          >
          </el-cascader>
          <span class="text">月</span>
        </el-col>
        <el-col v-if="cron.cycleType === 'week'" class="flex-center" :span="8">
          <el-cascader
            v-model="weekValue"
            clearable
            collapse-tags
            :options="week"
            :props="props"
            :show-all-levels="false"
            @change="weekChange"
          >
          </el-cascader>
          <span class="text">周</span>
        </el-col>
        <el-col
          v-if="cron.cycleType === 'month' || cron.cycleType === 'day'"
          class="flex-center"
          :span="8"
        >
          <el-cascader
            v-model="dayValue"
            clearable
            collapse-tags
            :options="day"
            :props="props"
            :show-all-levels="false"
            @change="dayChange"
          >
          </el-cascader>
          <span class="text">日</span>
        </el-col>
        <el-col
          v-if="cron.cycleType !== 'minute'"
          class="flex-center"
          :span="8"
        >
          <el-cascader
            v-model="hourValue"
            clearable
            collapse-tags
            :options="hour"
            :props="props"
            :show-all-levels="false"
            @change="hourChange"
          >
          </el-cascader>
          <span class="text">时</span>
        </el-col>
        <el-col
          class="flex-center"
          :span="cron.cycleType === 'minute' ? 24 : 8"
        >
          <el-cascader
            v-model="minuteValue"
            clearable
            collapse-tags
            :options="minute"
            :props="props"
            :show-all-levels="false"
            @change="minuteChange"
          >
          </el-cascader>
          <span class="text">分</span>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "ExecuteCycle",
  props: {
    cronDto: {
      type: Object,
      default: () => {},
    },
    expression: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      // exp: "0 0 0 0 * ?",
      // expArr: [0, 0, 0, 0, "*", "?"],
      exp: "",
      expArr: [],
      // 各个周期类型的默认表达式
      crons: {
        // second: "0/30 * * * *",
        minute: "0 ? * * * ?",
        hour: "0 ? ? * * ?",
        day: "0 ? ? 0 * ?",
        month: "0 ? ? 0 0 ?",
        week: "0 ? ? ? * 0",
        // year: "0 0 0 0 0 ? *",
      },
      // 频次周期礼包
      frequencyCycleList: [
        // { value: "second", label: "秒" },
        { value: "minute", label: "分" },
        { value: "hour", label: "时" },
        { value: "day", label: "日" },
        { value: "month", label: "月" },
        { value: "week", label: "周" },
        // { value: "year", label: "年" },
      ],
      props: { multiple: true },
      // 计时对象
      defaultCron: {
        cycleType: "day",
        day: {
          appoint: [],
          frequencyEnd: 0,
          frequencyStart: 0,
          frequencyUnit: 0,
          wildcard: "",
        },
        hour: {
          appoint: [],
          frequencyEnd: 0,
          frequencyStart: 0,
          frequencyUnit: 0,
          wildcard: "",
        },
        minute: {
          appoint: [],
          frequencyEnd: 0,
          frequencyStart: 0,
          frequencyUnit: 0,
          wildcard: "",
        },
        month: {
          appoint: [],
          frequencyEnd: 0,
          frequencyStart: 0,
          frequencyUnit: 0,
          wildcard: "",
        },
        second: {
          appoint: [],
          frequencyEnd: 0,
          frequencyStart: 0,
          frequencyUnit: 0,
          wildcard: "",
        },
        week: {
          appoint: [],
          frequencyEnd: 0,
          frequencyStart: 0,
          frequencyUnit: 0,
          wildcard: "",
        },
        year: {
          appoint: [],
          frequencyEnd: 0,
          frequencyStart: 0,
          frequencyUnit: 0,
          wildcard: "",
        },
      },
      // 秒
      second: [],
      // 分
      minute: [],
      // 时
      hour: [],
      // 日
      day: [],
      // 月
      month: [],
      // 周
      week: [],
      // 年
      year: [],
    };
  },
  computed: {
    cron: {
      get() {
        console.log("cron-get", this.cronDto, Object.keys(this.cronDto).length);
        return this.cronDto && Object.keys(this.cronDto).length
          ? this.cronDto
          : this.defaultCron;
      },
      set(val) {
        console.log("cron", val);
        this.$emit("update:cronDto", val);
      },
    },
    // expArr: {
    //   get() {
    //     if (this.expression) {
    //       return this.expression.split(" ");
    //     } else {
    //       let exp = this.crons[this.cron.cycleType];
    //       return exp.split(" ");
    //     }
    //   },
    //   set(val) {
    //     console.log("expArr-----发生变化", val);
    //     let exp = val.join(" ");
    //     this.$emit("update:expression", exp);
    //   },
    // },
    // exp: {
    //   get() {
    //     console.log("----", this.expression);
    //     console.log("-------", this.crons[this.cron.cycleType]);
    //     return this.crons[this.cron.cycleType];
    //     // return this.crons[this.cron.cycleType];
    //   },
    //   set(val) {
    //     this.$emit("update:expression", val);
    //   },
    // },
    minuteValue: {
      get() {
        return this.cron.minute.appoint.map((value) => ["全选", value]);
      },
      set() {},
    },
    hourValue: {
      get() {
        return this.cron.hour.appoint.map((value) => ["全选", value]);
      },
      set() {},
    },
    dayValue: {
      get() {
        return this.cron.day.appoint.map((value) => ["全选", value]);
      },
      set() {},
    },
    monthValue: {
      get() {
        return this.cron.month.appoint.map((value) => ["全选", value]);
      },
      set() {},
    },
    weekValue: {
      get() {
        return this.cron.week.appoint.map((value) => ["全选", value]);
      },
      set() {},
    },
  },
  watch: {
    exp(val) {
      console.log("监听---exp", val);
      this.$emit("update:expression", val);
    },
    expression(val) {
      console.log("监听---expression", val);
      this.exp = val;
      this.expArr = this.exp.split(" ");
      console.log("监听---expression--this.expArr", this.expArr);
    },
  },
  created() {
    console.log("cron-created", this.cron);
    this.initData();
    this.exp = this.expression
      ? this.expression
      : this.crons[this.cron.cycleType];
    this.expArr = this.exp.split(" ");
    this.$emit("update:cronDto", this.cron);
    console.log("expression-created", this.expression);
    console.log("exp-created", this.exp);
  },
  methods: {
    /**
     * 周期发生变化
     */
    cycleChange() {
      if (this.cron.cycleType) {
        this.exp = this.crons[this.cron.cycleType];
        // this.expArr = this.exp.split(" ");
        this.cron.week.appoint = [];
        this.cron.month.appoint = [];
        this.cron.day.appoint = [];
        this.cron.hour.appoint = [];
        this.cron.minute.appoint = [];
        console.log("周期发生变化", this.exp, this.expArr);
      }
    },
    /**
     * 选项发生变化
     */
    weekChange(val) {
      let appoint = val.map((value) => value[1]);
      if (appoint.length) {
        this.expArr[5] = appoint.join(",");
      } else {
        let exp = this.crons[this.cron.cycleType];
        let expArr = exp.split(" ");
        this.expArr[5] = expArr[5];
      }
      this.exp = this.expArr.join(" ");
      this.cron.week.appoint = appoint;
    },
    /**
     * 选项发生变化
     */
    monthChange(val) {
      let appoint = val.map((value) => value[1]);
      if (appoint.length) {
        this.expArr[4] = appoint.join(",");
      } else {
        let exp = this.crons[this.cron.cycleType];
        let expArr = exp.split(" ");
        this.expArr[4] = expArr[4];
      }
      this.exp = this.expArr.join(" ");
      this.cron.month.appoint = appoint;
    },
    /**
     * 选项发生变化
     */
    dayChange(val) {
      let appoint = val.map((value) => value[1]);
      if (appoint.length) {
        this.expArr[3] = appoint.join(",");
      } else {
        let exp = this.crons[this.cron.cycleType];
        let expArr = exp.split(" ");
        this.expArr[3] = expArr[3];
      }
      this.exp = this.expArr.join(" ");
      this.cron.day.appoint = appoint;
    },
    /**
     * 选项发生变化
     */
    hourChange(val) {
      let appoint = val.map((value) => value[1]);
      if (appoint.length) {
        this.expArr[2] = appoint.join(",");
      } else {
        let exp = this.crons[this.cron.cycleType];
        let expArr = exp.split(" ");
        this.expArr[2] = expArr[2];
      }
      this.exp = this.expArr.join(" ");
      this.cron.hour.appoint = appoint;
      console.log("时：", this.exp);
      console.log(this.expArr);
    },
    /**
     * 选项发生变化
     */
    minuteChange(val) {
      let appoint = val.map((value) => value[1]);
      if (appoint.length) {
        this.expArr[1] = appoint.join(",");
      } else {
        let exp = this.crons[this.cron.cycleType];
        let expArr = exp.split(" ");
        this.expArr[1] = expArr[1];
      }
      this.exp = this.expArr.join(" ");
      this.cron.minute.appoint = appoint;
      console.log("分：", this.exp);
      console.log(this.expArr);
    },
    /**
     * 初始化数据
     */
    initData() {
      const monthnum = [];
      for (let i = 1; i <= 12; i++) {
        monthnum.push(i);
      }
      this.month = [
        {
          label: "全选",
          value: "全选",
          key: "全选",
          children: monthnum.map((item) => ({
            label: item,
            value: item,
            key: item,
          })),
        },
      ];

      const weekList = ["周一", "周二", "周三", "周四", "周五", "周六", "周天"];
      this.week = [
        {
          label: "全选",
          value: "全选",
          key: "全选",
          children: weekList.map((item, i) => ({
            label: item,
            value: i + 1,
            key: item,
          })),
        },
      ];

      const daynum = [];
      for (let i = 1; i <= 31; i++) {
        daynum.push(i);
      }
      this.day = [
        {
          label: "全选",
          value: "全选",
          key: "全选",
          children: daynum.map((item) => ({
            label: item,
            value: item,
            key: item,
          })),
        },
      ];

      const hournum = [];
      for (let i = 0; i <= 23; i++) {
        hournum.push(i);
      }
      this.hour = [
        {
          label: "全选",
          value: "全选",
          key: "全选",
          children: hournum.map((item) => ({
            label: item,
            value: item,
            key: item,
          })),
        },
      ];

      const minutenum = [];
      for (let i = 0; i <= 59; i++) {
        minutenum.push(i);
      }
      this.minute = [
        {
          label: "全选",
          value: "全选",
          key: "全选",
          children: minutenum.map((item) => ({
            label: item,
            value: item,
            key: item,
          })),
        },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
.execute-cycle {
  .cycle {
    margin-bottom: 8px;
  }
  .front-text {
    font-size: 12px;
    margin-right: 8px;
  }
  .text {
    font-size: 12px;
    margin-left: 8px;
  }
  .el-col {
    margin-bottom: 8px;
    height: 30px;
  }
}
</style>
