<template>
  <page-format title="任务日志">
    <template #title-right>
      <el-button @click="$util.goBack()">返回</el-button>
      <el-button type="primary" @click="cleanLog">清空日志</el-button>
    </template>
    <basic-table
      ref="basicTable"
      v-loading="loading"
      :column="column"
      :getList="request.getLogList"
      :query="query"
      :defaultParam="defaultParam"
    >
      <template #basic-table-top>
        <basic-search v-model:query="query" :search="search"></basic-search>
      </template>
      <template #runningTimer="{ row }">
        {{ row.runningTimer ? row.runningTimer : 0 }}<span>ms</span>
      </template>
      <template #startTime="{ row }">
        {{ crtTimeFtt(row.startTime) }}
      </template>
      <template #endTime="{ row }">
        {{ crtTimeFtt(row.endTime) }}
      </template>
      <template #executeCode="{ row }">
        <span v-if="row.executeCode === 1" style="color: #33c800">success</span>
        <span v-else-if="row.executeCode === 0" style="color: #909399">running</span>
        <span v-else style="color: red">error</span>
      </template>
      <el-table-column align="center" label="操作" width="150">
        <template #default="{ row }">
          <el-button type="text" @click="detail(row)">详情</el-button>
        </template>
      </el-table-column>
    </basic-table>
  </page-format>
  <el-dialog v-model="dialogTableVisible" title="日志详情" width="70%">
    <el-descriptions direction="horizontal" :column="2" border width="150px">
      <el-descriptions-item label="taskId" label-align="right" :span="2">{{
        detailLog.id
      }}</el-descriptions-item>
      <el-descriptions-item label="taskName" label-align="right">{{
        detailLog.taskName
      }}</el-descriptions-item>
      <el-descriptions-item label="description" label-align="right">{{
        detailLog.description || "-"
      }}</el-descriptions-item>
      <el-descriptions-item label="cron" label-align="right">{{
        detailLog.cron
      }}</el-descriptions-item>
      <el-descriptions-item label="taskType" label-align="right">{{
        detailLog.taskType
      }}</el-descriptions-item>
      <el-descriptions-item label="runningTimer" label-align="right"
        >{{ detailLog.runningTimer ?detailLog.runningTimer:0 }}ms</el-descriptions-item
      >
      <el-descriptions-item label="executeCode" label-align="right">
        <span v-if="detailLog.executeCode === 1" style="color: #33c800">success</span>
        <span v-else-if="row.executeCode === 0" style="color: #909399">running</span>
        <span v-else style="color: red">error</span>
      </el-descriptions-item>
      <el-descriptions-item label="startTime" label-align="right">{{
        crtTimeFtt(detailLog.startTime)
      }}</el-descriptions-item>
      <el-descriptions-item label="endTime" label-align="right">{{
        crtTimeFtt(detailLog.endTime)
      }}</el-descriptions-item>
      <el-descriptions-item label="timeout" label-align="right">{{
        detailLog.timeout || false
      }}</el-descriptions-item>
      <el-descriptions-item label="executeTimeout" label-align="right">{{
        detailLog.executeTimeout || "-"
      }}</el-descriptions-item>
      <el-descriptions-item label="command" label-align="right" :span="2">
        <div style="white-space: pre-line" v-html="detailLog.command"></div>
      </el-descriptions-item>
      <el-descriptions-item label="params" label-align="right" :span="2">
        <div style="white-space: pre-line" v-html="detailLog.params"></div>
      </el-descriptions-item>
      <el-descriptions-item label="compareType" label-align="right">{{
        detailLog.compareType || "-"
      }}</el-descriptions-item>
      <el-descriptions-item label="compareIgnoreCase" label-align="right">{{
        null == detailLog.compareIgnoreCase ? "-" : detailLog.compareIgnoreCase
      }}</el-descriptions-item>
      <el-descriptions-item
        label="expectedValue"
        label-align="right"
        :span="2"
        >{{ detailLog.expectedValue || "-" }}</el-descriptions-item
      >
      <el-descriptions-item label="email" label-align="right">{{
        detailLog.email || "-"
      }}</el-descriptions-item>
      <el-descriptions-item label="emailSuccessMessage" label-align="right">{{
        detailLog.emailSuccessMessage || "-"
      }}</el-descriptions-item>
      <el-descriptions-item label="emailErrorMessage" label-align="right">{{
        detailLog.emailErrorMessage || "-"
      }}</el-descriptions-item>
      <el-descriptions-item label="emailResult" label-align="right" :span="2">
        <div style="white-space: pre-line" v-html="detailLog.emailResult"></div>
      </el-descriptions-item>
      <el-descriptions-item label="result" label-align="right" :span="2">
        <div
          style="white-space: pre-line"
          v-html="detailLog.executeResult"
        ></div>
      </el-descriptions-item>
    </el-descriptions>
  </el-dialog>
</template>

<script>
// @ is an alias to /src
import { ref, defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import * as request from "../api/log";
import common from "./js/common";
import { ElMessage } from "element-plus";
export default {
  name: "Log",
  components: {},
  setup() {
    let taskId = useRoute().params.id || "";
    let dialogTableVisible = ref(false);
    let detailLog = ref({});
    let basicTable = ref(null);
    let loading = ref(false);
    let query = ref({});
    let search = ref({
      time: {
        type: "daterange",
        label: "执行周期",
        value: [],
        // props: {
        //   start: "startTime",
        //   end: "endTime",
        // },
        // valueFormat: "",
      },
    });
    let defaultParam = ref({ taskId: useRoute().params.id || "" });
    const router = useRouter();
    const column = [
      { label: "任务名称", prop: "taskName" },
      { label: "cron表达式", prop: "cron" },
      { label: "任务类型", prop: "taskType" },
      { label: "开始时间", prop: "startTime" },
      { label: "结束时间", prop: "endTime" },
      { label: "耗时", prop: "runningTimer" },
      { label: "执行结果", prop: "executeCode" },
    ];
    const detail = async (row) => {
      let res = await request.getLog(row.id);
      detailLog.value = res.data;
      dialogTableVisible.value = true;
    };
    const cleanLog = async () => {
      loading.value = true;
      let res = await request.cleanLog(taskId);
      if (res.code === 1) {
        ElMessage({
          message: "操作成功！",
          type: "success",
        });
      }
      loading.value = false;
      router.push("/task");
    };
    return {
      column,
      request,
      ...common,
      loading,
      basicTable,
      router,
      detail,
      dialogTableVisible,
      defineComponent,
      detailLog,
      cleanLog,
      taskId,
      query,
      search,
      defaultParam,
    };
  },
};
</script>
<style lang="scss" scoped>
.pre.background-color {
  background-color: #f5f5f5;
}
.details_title {
  font-weight: bold;
}
.title {
  text-align: right;
  padding-right: 5px;
}
</style>
