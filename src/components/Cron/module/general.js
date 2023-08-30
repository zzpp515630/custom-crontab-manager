import { ref, watch } from "vue";

/**
 * 指定时间的列表数据构造
 * @param type
 * @return {[]}
 */
function appointList(type) {
  let list = [];
  let start = 0;
  let sum = 60;
  switch (type) {
    case "second":
      start = 0;
      sum = 60;
      break;
    case "minute":
      start = 0;
      sum = 60;
      break;
    case "hour":
      start = 0;
      sum = 24;
      break;
    case "day":
      start = 1;
      sum = 31;
      break;
    case "month":
      start = 1;
      sum = 12;
      break;
    case "week":
      start = 1;
      sum = 7;
      break;
  }
  if (type === "day" || type === "month" || type === "week") {
    sum += 1;
  }
  for (let i = start; i < sum; i++) {
    list.push(i);
  }
  return list;
}

export default function general(props, { emit }, type) {
  console.log("props", props.value);
  let config = props.timeItem.config || {};
  // let types = ref(props.type || "wildcard");
  let types = ref(props.type);
  let appointArr = ref([]);
  // 周期-开始
  let frequencyStart = ref("");
  // 周期-结束
  let frequencyEnd = ref("");
  // 频率-起始
  let frequencyOnset = ref("");
  // 频率
  let frequencyUnit = ref("");
  // 指定-选中
  let appointValue = ref([]);
  // 日：最近的那个工作日
  let workDay = ref("");
  // 周：第几周的星期几
  let weekStart = ref("");
  // 周：第几周的星期几
  let weekEnd = ref("");
  // 周：本月最后一个星期几
  let lastWeekOfDay = ref("");
  if (type !== "year") {
    appointArr.value = appointList(type);
  }
  for (let key in config) {
    switch (key) {
      case "period": // 周期
        frequencyStart.value = config.period ? config.period.split("-")[0] : "";
        frequencyEnd.value = config.period ? config.period.split("-")[1] : "";
        break;
      case "frequency": // 频率
        frequencyOnset.value = config.frequency
          ? config.frequency.split("/")[0]
          : "";
        frequencyUnit.value = config.frequency
          ? config.frequency.split("/")[1]
          : "";
        break;
      case "appoint": // 指定
        appointValue.value = config.appoint.length
          ? config.appoint.split(",")
          : [];
        break;
      case "workDay": // 日：最近的那个工作日
        workDay.value = config.workDay;
        break;
      case "weekOfDay": // 周：第几周的星期几
        weekStart.value = config.weekOfDay
          ? config.weekOfDay.split("#")[0]
          : "";
        weekEnd.value = config.weekOfDay ? config.weekOfDay.split("#")[1] : "";
        break;
      case "lastWeekOfDay": // 周：本月最后一个星期几
        lastWeekOfDay.value = config.lastWeekOfDay;
        break;
    }
  }
  // 监听类型变化
  watch(types, (newValue) => {
    emit("update:type", newValue);
    console.log("监听类型变化", newValue);
    switch (newValue) {
      case "wildcard": // 每
        emit("update:value", "*");
        break;
      case "period": // 周期
        periodInput();
        break;
      case "frequency": // 频率
        frequencyInput();
        break;
      case "appoint": // 指定
        console.log("指定", appointValue.value, appointValue.value.length);
        emit(
          "update:value",
          appointValue.value.length ? appointValue.value.join() : "*"
        );
        break;
      case "unAppoint": // 不指定
        if (type === "year") {
          emit("update:value", "");
        } else {
          emit("update:value", "?");
        }
        break;
      case "workDay": // 日：最近的那个工作日
        workDayInput();
        break;
      case "lastDay": // 日：本月最后一天
        emit("update:value", "L");
        break;
      case "weekOfDay": // 周：第几周的星期几
        weekOfDayInput();
        break;
      case "lastWeekOfDay": // 周：本月最后一个星期几
        lastWeekOfDayInput();
        break;
    }
  });
  const periodInput = () => {
    emit("update:value", frequencyStart.value + "-" + frequencyEnd.value);
  };
  const frequencyInput = () => {
    emit("update:value", frequencyOnset.value + "/" + frequencyUnit.value);
  };
  const appointInput = (item) => {
    let index = appointValue.value.findIndex((val) => Number(val) === item);
    if (index === -1) {
      appointValue.value.push(item);
    } else {
      appointValue.value.splice(index, 1);
    }
    emit(
      "update:value",
      appointValue.value.length
        ? appointValue.value.sort((a, b) => a - b).join()
        : "*"
    );
  };
  const workDayInput = () => {
    emit("update:value", workDay.value + "W");
  };
  const weekOfDayInput = () => {
    emit("update:value", weekStart.value + "#" + weekEnd.value);
  };
  const lastWeekOfDayInput = () => {
    emit("update:value", lastWeekOfDay.value + "L");
  };
  return {
    types,
    appointArr,
    frequencyStart,
    frequencyEnd,
    frequencyOnset,
    frequencyUnit,
    appointValue,
    workDay,
    weekStart,
    weekEnd,
    lastWeekOfDay,
    periodInput,
    frequencyInput,
    appointInput,
    workDayInput,
    weekOfDayInput,
    lastWeekOfDayInput,
  };
}
