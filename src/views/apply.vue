<template>
  <page-format title="应用列表">
    <template #title-right>
      <el-button type="primary" @click="createClick">创建应用</el-button>
    </template>
    <basic-table
      ref="basicTable"
      v-loading="loading"
      :column="column"
      :getList="applyRequest.getList"
    >
      <template #load="{ row }">
        <em
          v-if="row.load"
          class="common-status-icon"
          style="background-color: #33c800"
        ></em>
        <em
          v-else
          class="common-status-icon"
          style="background-color: #909399"
        ></em>
        {{row.load?'已装载':'未装载'}}
      </template>
      <template #quote="{ row }">
        <em
          v-if="row.quote"
          class="common-status-icon"
          style="background-color: #33c800"
        ></em>
        <em
          v-else
          class="common-status-icon"
          style="background-color: #909399"
        ></em>
        {{row.quote?'已引用':'未引用'}}
      </template>
      <el-table-column align="center" label="操作" width="150">
        <template #default="{ row }">
          <el-dropdown
            style="margin-left: 10px"
            trigger="click"
            @command="(val) => moreClick(val, row)"
          >
            <el-icon><more /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="item in operate"
                  :key="item.value"
                  :command="item.value"
                  >{{ item.label }}</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </el-table-column>
    </basic-table>
  </page-format>
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
        <el-button type="primary" @click="remove()">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
// @ is an alias to /src
import { ref } from "vue";
import { useRouter } from "vue-router";
import * as applyRequest from "../api/apply";
import { ElMessageBox, ElMessage } from "element-plus";
export default {
  name: "Apply",
  components: {},
  setup() {
    let basicTable = ref(null);
    let loading = ref(false);
    let cronAnalysis = ref(false);
    let deleteVisible = ref(false);
    let cronNext = ref([]);
    let applyInfo = ref({});
    const router = useRouter();
    const column = [
      { label: "名称", prop: "name" },
      { label: "描述", prop: "description" },
      { label: "是否装载", prop: "load" },
      { label: "是否引用", prop: "quote" },
    ];
    let operate = ref([]);
    operate.value = [
      { label: "执行", value: "execute" },
      { label: "编辑", value: "update" },
      { label: "删除", value: "delete" },
      { label: "复制", value: "copy" },
    ];
    const moreClick = async (value, apply) => {
      let applyId = apply.id;
      let resp = {};
      switch (value) {
        case "execute":
          // res = await putStart(vmId);
          resp = await applyRequest.running(applyId);
          cancelForm(resp);
          break;
        case "update":
          // res = await putStop(vmId);
          // await request.putTask(taskId);
          router.push("/codeEdit/" + applyId + "/update");
          break;
        case "delete":
          loading.value = true;
          applyInfo.value = apply;
          loading.value = false;
          open();
          break;
        case "copy":
          router.push("/codeEdit/" + applyId + "/copy");
          break;
      }
    }
    const remove = async () => {
      deleteVisible.value = false;
      let resp = await applyRequest.remove(applyInfo.value.id);
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
          let resp = applyRequest.remove(applyInfo.value.id);
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
      router.push("/codeEdit");
    };
    return {
      column,
      applyRequest,
      loading,
      basicTable,
      router,
      operate,
      cronNext,
      cronAnalysis,
      deleteVisible,
      remove,
      open,
      createClick,
      moreClick,
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
