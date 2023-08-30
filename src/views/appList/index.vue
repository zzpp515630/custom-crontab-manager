<template>
  <page-format title="应用列表">
    <template #title-right>
      <el-button type="primary" @click="addClick">新增</el-button>
    </template>
    <div class="app-list">
      <basic-table :column="column" :getList="getList"> </basic-table>
    </div>
  </page-format>
</template>

<script>
import * as taskRequest from "../../api/task";
import { useRouter } from "vue-router";
import { ref } from "vue";
export default {
  name: "appList",
  setup() {
    const router = useRouter();
    const column = ref([
      { label: "名称111", prop: "name" },
      { label: "描述222", prop: "description" },
      { label: "cron表达式333", prop: "cron" },
      { label: "任务类型", prop: "taskType" },
      { label: "状态", prop: "status" },
    ]);
    /**
     * 新增
     */
    const addClick = () => {
      router.push("/codeEdit");
    };
    /**
     * 编辑
     */
    const editClick = (id) => {
      router.push("/codeEdit/" + id);
    };
    return { column, getList: taskRequest.getTaskList, addClick, editClick };
  },
};
</script>

<style scoped></style>
