<template>
  <page-format title="代码编辑">
    <template #title-right>
      <el-button @click="prevPage">返回上一页</el-button>
      <el-button type="primary" @click="saveClick">保存</el-button>
    </template>
    <div class="code-edit">
      <el-form ref="ruleForm" :model="form" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item class="content" label="内容">
          <my-codemirror
            v-model:modelValue="form.code"
            :options="{ mode: 'text/x-java' }"
          ></my-codemirror>
        </el-form-item>
      </el-form>
    </div>
  </page-format>
</template>

<script>
import MyCodemirror from "../components/myCodemirror/index";
import { ref, onMounted, toRaw } from "vue";
import { useRoute, useRouter } from "vue-router";
import * as applyRequest from "../api/apply";
import { ElMessage } from "element-plus";

export default {
  name: "codeEdit",
  components: { MyCodemirror },
  setup() {
    let applyId = useRoute().params.id || "";
    let method = useRoute().params.method || "";
    let loading = ref(false);
    let form = ref({});
    let ruleForm = ref(null);
    const router = useRouter();
    const codeTemplage =
      "import org.apache.commons.lang3.tuple.Pair;\n" +
      "import org.apache.commons.lang3.StringUtils;\n" +
      "\n" +
      "public class Template {\n" +
      "\n" +
      "    public Pair<Integer,String> job(){\n" +
      "\n" +
      "\n" +
      '        return Pair.of(0,"success");\n' +
      '//        return Pair.of(-1,"error");\n' +
      "    }\n" +
      "}\n";
    async function init() {
      if (applyId) {
        console.log("编辑时获取详情", applyId);
        let res = await applyRequest.get(applyId);
        form.value = res.data;
        if (method && method === "copy") {
          form.value.id = null;
        }
      }
    }
    // 挂载
    onMounted(() => {
      if (!applyId) {
        form.value.code = codeTemplage;
      }
      init();
      console.log(form);
    });
    /**
     * 返回上一页
     */
    const prevPage = () => {
      router.go(-1);
    };
    /**
     * 包存
     */
    const saveClick = async () => {
      console.log(toRaw(form.value));
      let res;
      if (applyId && method === "update") {
        res = await applyRequest.put(form.value);
      } else {
        res = await applyRequest.post(form.value);
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
    };
    function cancelForm() {
      router.go(-1);
    }
    return { prevPage, saveClick, form };
  },
};
</script>

<style lang="scss" scoped>
.code-edit {
  height: 100%;
  ::v-deep {
    .el-form {
      height: 100%;
      .content {
        height: calc(100% - 120px);
      }
    }
  }
}
</style>
