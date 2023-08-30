<template>
  <page-format title="定时任务列表">
    <template #title-right>
      <el-button type="primary" @click="createClick">创建定时任务</el-button>
    </template>
    <basic-table
      ref="basicTable"
      v-loading="loading"
      :column="column"
      :getList="taskRequest.getTaskList"
      :query="query"
    >
      <template #basic-table-top>
        <basic-search v-model:query="query" :search="search"></basic-search>
      </template>
      <template #name="{ row }">
        <span
          class="common-text-clickable"
          @click="router.push('/log/' + row.id)"
          >{{ row.name }}</span
        >
      </template>
      <template #status="{ row }">
        <em
          v-if="row.status === 'Start'"
          class="common-status-icon"
          style="background-color: #33c800"
        ></em>
        <em
          v-else
          class="common-status-icon"
          style="background-color: #909399"
        ></em>
        {{ row.status }}
      </template>
      <el-table-column align="center" label="操作" width="150">
        <template #default="{ row }">
          <el-dropdown
            style="margin-left: 10px"
            trigger="click"
            @command="(val) => moreClick(val, row)"
          >
            <el-icon>
              <more />
            </el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="item in operate"
                  :key="item.value"
                  :command="item.value"
                  >{{ item.label }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </el-table-column>
    </basic-table>
  </page-format>
  <el-dialog
    v-model="cronAnalysis"
    :title="`最近${num}次执行时间`"
    width="360px"
  >
    <div
      style="font-size: 16px; text-align: center; line-height: 24px"
      width="100%"
    >
      <p v-for="time in cronNext" :key="time">
        {{ time }}
      </p>
    </div>
  </el-dialog>
  <el-dialog
    v-model="deleteVisible"
    title="是否删除"
    width="30%"
    :before-close="handleClose"
  >
    <span>确实要删除吗？</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="removeTask()">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
// @ is an alias to /src
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import * as taskRequest from "../api/task";
import * as commonRequest from "../api/common";
import { ElMessage, ElMessageBox } from "element-plus";

export default {
  name: "Task",
  components: {},
  setup() {
    let basicTable = ref(null);
    let loading = ref(false);
    let cronAnalysis = ref(false);
    let deleteVisible = ref(false);
    let cronNext = ref([]);
    let taskInfo = ref({});
    let query = ref({});
    let taskType = ref({});
    let search = ref({
      name: {
        type: "input",
        label: "名称",
        value: {},
      },
      taskType: {
        type: "select",
        label: "任务类型",
        value: {},
        props: {
          label: taskType.value,
          value: taskType.value,
        },
      },
    });
    const router = useRouter();
    const column = [
      { label: "名称", prop: "name" },
      { label: "描述", prop: "description" },
      { label: "cron表达式", prop: "cron" },
      { label: "任务类型", prop: "taskType" },
      { label: "状态", prop: "status" },
    ];
    let operate = ref([]);
    operate.value = [
      { label: "执行一次", value: "execute" },
      { label: "查询日志", value: "log" },
      { label: "执行时间", value: "nextTime" },
      { label: "启动/停止", value: "running" },
      { label: "编辑", value: "update" },
      { label: "删除", value: "delete" },
      { label: "复制", value: "copy" },
    ];
    onMounted(async () => {
      taskTypeOptionsFn();
    });
    const moreClick = async (value, task) => {
      let taskId = task.id;
      let resp = {};
      switch (value) {
        case "execute":
          // res = await putStart(vmId);
          resp = await taskRequest.putTaskExecute(taskId);
          cancelForm(resp);
          break;
        case "log":
          // res = await putStop(vmId);
          router.push("/log/" + taskId);
          break;
        case "nextTime":
          await nextTime(task);
          break;
        case "running":
          // res = await putStop(vmId);
          resp = await taskRequest.putTaskRunning(taskId);
          cancelForm(resp);
          break;
        case "update":
          // res = await putStop(vmId);
          // await request.putTask(taskId);
          router.push("/update/" + taskId + "/update");
          break;
        case "delete":
          loading.value = true;
          taskInfo.value = task;
          loading.value = false;
          open();
          break;
        case "copy":
          router.push("/update/" + taskId + "/copy");
          break;
      }
    };
    const num = ref(10);
    const nextTime = async (task) => {
      console.log(task.cron);
      cronAnalysis.value = true;
      let res = await taskRequest.getCronAnalysis({
        cron: task.cron,
        num: num.value,
      });
      if (res && res.data) {
        cronNext.value = res.data;
      }
    };
    const removeTask = async () => {
      deleteVisible.value = false;
      let resp = await taskRequest.removeTask(taskInfo.value.id);
      cancelForm(resp);
    };

    function cancelForm(resp) {
      if (resp.code === 1) {
        ElMessage({
          message: "操作成功！",
          type: "success",
        });
      }
      basicTable.value.tableList();
    }

    const open = () => {
      ElMessageBox.confirm("将永久删除该文件,继续?", "警告", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let resp = taskRequest.removeTask(taskInfo.value.id);
          cancelForm(resp);
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "取消删除",
          });
        });
    };
    const createClick = () => {
      router.push("/create");
    };

    async function taskTypeOptionsFn() {
      let res = await commonRequest.getTaskType();
      taskType.value = res.data || [];
    }

    return {
      column,
      taskRequest,
      moreClick,
      loading,
      basicTable,
      router,
      operate,
      cronNext,
      cronAnalysis,
      deleteVisible,
      removeTask,
      open,
      createClick,
      num,
      query,
      search,
    };
  },
};
</script>
<style>
.el-loading-spinner.circular {
  width: 12px;
  height: 12px;
}
</style>
