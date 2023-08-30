<template>
  <page-format title="创建定时任务">
    <template #title-right>
      <el-button @click="$util.goBack()">返回</el-button>
      <el-button type="primary" @click="createForm">保存</el-button>
    </template>
    <el-form
      ref="ruleForm"
      label-position="right"
      label-width="auto"
      :model="form"
      :rules="rules"
    >
      <el-row>
        <el-col :span="16">
          <el-form-item label="名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <el-form-item label="描述" prop="remark">
            <el-input
              v-model="form.description"
              placeholder="请输入描述"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="flex-center">
            <el-form-item label="Cron" prop="remark">
              <el-input
                v-model="form.cron"
                placeholder="请输入cron表达式"
              ></el-input>
            </el-form-item>
            <el-popover placement="right" :width="400" trigger="click">
              <template #reference>
                <el-icon><edit /></el-icon>
              </template>
              <cron v-model="form.cron" class="cron"></cron>
            </el-popover>
          </div>
        </el-col>
        <el-col :span="8">
          <el-form-item label="任务类型" prop="taskType">
            <el-select v-model="form.taskType" placeholder="请选择任务类型">
              <el-option
                v-for="item in taskType"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="任务超时" prop="timeout">
            <el-switch v-model="form.timeout" inactive-text="" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="任务超时" prop="executeTimeOut">
            <el-input-number
              v-model="form.executeTimeout"
              :min="1"
              :disabled="!form.timeout"
              placeholder="秒"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <el-form-item
            :label="form.taskType === 'Shell' ? '执行命令' : '执行程序'"
            prop="command"
          >
            <el-input
              v-model="form.command"
              type="textarea"
              placeholder="请输入Shell命令"
              v-if="form.taskType === 'Shell'"
            ></el-input>
            <el-select
              v-else
              v-model="form.command"
              placeholder="请选择执行程序"
            >
              <el-option
                v-for="item in applyList"
                :key="item"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="比较方式" prop="taskType">
            <el-select v-model="form.compareType" placeholder="请选择比较方式">
              <el-option
                v-for="item in compare"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label=""
            prop="stating"
            v-if="form.compareType && form.compareType !== 'NON'"
          >
            <el-switch
              v-model="form.compareIgnoreCase"
              active-text="忽略大小写"
              inactive-text=""
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <el-form-item
            label="预期值"
            prop="expectedValue"
            v-if="form.compareType && form.compareType !== 'NON'"
          >
            <el-input
              v-model="form.expectedValue"
              type="textarea"
              placeholder="请输入预期值"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <el-form-item label="邮箱地址" prop="email">
            <el-input
              v-model="form.email"
              inactive-text=""
              placeholder="请输入邮箱地址"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <el-form-item
            :label="[
              form.compareType && form.compareType !== 'NON'
                ? '邮箱成功消息'
                : '邮箱消息',
            ]"
            prop="emailMessage"
          >
            <el-input
              v-model="form.emailSuccessMessage"
              type="textarea"
              placeholder="请输入邮箱消息:这是一条来自于#taskId#的邮箱消息,执行结果是#result#"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <el-form-item
            label="邮箱失败消息"
            v-if="form.compareType && form.compareType !== 'NON'"
            prop="emailMessage"
          >
            <el-input
              v-model="form.emailErrorMessage"
              type="textarea"
              placeholder="请输入邮箱消息:这是一条来自于#taskId#的邮箱消息,执行结果是#result#"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <span style="color: red; word-break: break-all; width: 150px"
            >关键字:{{ taskKeyword }}</span
          >
        </el-col>
      </el-row>
    </el-form>
  </page-format>
</template>

<script>
import { ref, reactive, computed, onMounted } from "vue";
import * as commonRequest from "../api/common";
import * as taskRequest from "../api/task";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import cron from "../components/Cron/index";
import * as applyRequest from "../api/apply";
// 弹框
let dialog = () => {
  // 弹框状态
  let dialogVisible = ref(false);
  const defaultProps = reactive({
    label: "name",
    children: "zones",
    isLeaf: "leaf",
  });
  let operatorItem = null;
  let operationType = [];

  /**
   * 显示弹框
   */
  function dialogShow(item, type) {
    operatorItem = item;
    operationType = type;
    console.log(operationType);
    dialogVisible.value = true;
  }
  return { dialogVisible, defaultProps, dialogShow };
};
export default {
  name: "createVm",
  components: { cron },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    let taskId = useRoute().params.id || "";
    let method = useRoute().params.method || "";
    let ruleForm = ref(null);
    let form = ref({
      compareType: "NON",
    });
    let rules = reactive({
      name: [{ required: true, message: "请填写名称" }],
      cron: [{ required: true, message: "请填写cron表达式" }],
    });
    let loading = ref(false);
    let taskKeyword = ref({});
    let taskType = ref({});
    let applyList = ref({});
    let compare = ref({});
    onMounted(async () => {
      if (taskId) {
        console.log("编辑时获取详情", taskId);
        let res = await taskRequest.getTask(taskId);
        form.value = res.data;
        if (method && method === "copy") {
          form.value.id = null;
        }
      }
      applyListOptionsFn();
      taskTypeOptionsFn();
      compareOptionsFn();
      taskKeywordFn();
    });
    async function taskTypeOptionsFn() {
      let res = await commonRequest.getTaskType();
      taskType.value = res.data || [];
    }
    async function applyListOptionsFn() {
      let res = await applyRequest.getList();
      applyList.value = res.data || [];
    }
    async function compareOptionsFn() {
      let res = await commonRequest.getTaskCompare();
      compare.value = res.data || [];
    }
    async function taskKeywordFn() {
      let res = await commonRequest.getTaskKeyword();
      taskKeyword.value = res.data || [];
    }

    let drawer = computed(() => {
      return props.visible;
    });

    const router = useRouter();
    function cancelForm() {
      router.go(-1);
    }
    const createForm = async () => {
      console.log(ruleForm.value);
      ruleForm.value.validate(async (valid) => {
        if (valid) {
          let res;
          if (taskId && method === "update") {
            res = await taskRequest.putTask(form.value);
          } else {
            res = await taskRequest.postTask(form.value);
          }

          if (res.code === 1) {
            ElMessage({
              showClose: true,
              message: "操作成功",
              type: "success",
            });
            loading.value = false;
            cancelForm();
          }
        }
      });
    };
    return {
      ruleForm,
      loading,
      drawer,
      form,
      rules,
      ...dialog(),
      compare,
      taskType,
      applyList,
      taskKeyword,
      createForm,
    };
  },
};
</script>

<style lang="scss" scoped>
::v-deep {
  .el-input__inner {
    background-color: transparent;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid $border-color;
  }
}

.group-form {
  padding: 12px 12px;
  border-left: 2px solid $primary;
  background-color: $bg-color;
  position: relative;
  /*display: inline-block;*/
  margin-bottom: 8px;
  .group-form-button {
    position: absolute;
    right: 8px;
    bottom: 8px;
    * + * {
      margin-left: 8px;
    }
  }
}
.dialog-inner {
  height: 320px;
  overflow: hidden;
  & > div {
    height: 100%;
    overflow: auto;
  }
}
</style>
