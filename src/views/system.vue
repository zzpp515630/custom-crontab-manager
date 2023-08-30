<template>
  <page-format title="系统配置">
    <template #title-right>
      <el-button type="primary" @click="updateSystem">编辑</el-button>
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
          <el-form-item label="系统名称" prop="name">
            <el-input
              v-model="form.subject"
              placeholder="请输入系统名称"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <el-form-item label="日志保留时间(天)" prop="logRetainDays">
            <el-select
              v-model="form.logRetainDays"
              placeholder="请选择日志保留时间"
            >
              <el-option
                v-for="item in logRetainDayArrays"
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
        <el-col :span="16">
          <el-form-item label="命令行前缀" prop="commandPrefix">
            <el-input
              v-model="form.commandPrefix"
              placeholder="请输入命令行前缀"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="命令路径" prop="cmdPath">
            <el-input
              v-model="form.cmdPath"
              placeholder="请输入源码路径"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="源码路径" prop="codePath">
            <el-input
              v-model="form.codePath"
              placeholder="请输入源码路径"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <el-form-item label="邮箱发件箱" prop="emailFromAddress">
            <el-input
              v-model="form.emailFromAddress"
              placeholder="请输入邮箱发送地址"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="SMTP邮箱服务器" prop="emailHost">
            <el-input
              v-model="form.emailHost"
              placeholder="请输入SMTP邮箱服务器"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="SMTP邮箱端口" prop="emailPort">
            <el-input
              v-model="form.emailPort"
              placeholder="请输入邮箱端口"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="邮箱账户" prop="emailAccount">
            <el-input
              v-model="form.emailAccount"
              placeholder="请输入邮箱账号"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="邮箱密码" prop="emailPassword">
            <el-input
              show-password
              v-model="form.emailPassword"
              placeholder="请输入邮箱密码"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </page-format>
</template>

<script>
import { ref, reactive, computed, onMounted } from "vue";
import * as commonRequest from "../api/common";
import { ElMessage } from "element-plus";
export default {
  name: "System",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    let logRetainDayArrays = ref([1, 3, 7, 15, 30, 90, 180, 365]);
    let form = ref({});
    let ruleForm = ref(null);
    let rules = reactive({
      subject: [{ required: true, message: "请填写名称" }],
      logRetainDayArrays: [{ required: true, message: "请填写日志保留时间" }],
    });
    let loading = ref(false);
    onMounted(async () => {
      systemInfoFn();
    });
    async function systemInfoFn() {
      let res = await commonRequest.getSystem();
      form.value = res.data || {};
    }
    let drawer = computed(() => {
      return props.visible;
    });
    const updateSystem = async () => {
      console.log(ruleForm.value);
      ruleForm.value.validate(async (valid) => {
        if (valid) {
          let res = await commonRequest.postSystem(form.value);
          if (res.code === 1) {
            ElMessage({
              showClose: true,
              message: "操作成功",
              type: "success",
            });
            loading.value = false;
          }
        }
      });
    };

    return {
      loading,
      drawer,
      form,
      rules,
      logRetainDayArrays,
      updateSystem,
      ruleForm,
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
