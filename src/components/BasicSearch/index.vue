<template>
  <div class="basic-search flex-center">
    <div
      v-for="(searchItem, key) in copySearch"
      :key="key"
      class="basic-search-item"
    >
      <el-form :inline="true">
        <el-form-item
          v-if="searchItem.type === 'input'"
          class="basic-form-item"
          :label="searchItem.label"
        >
          <el-input
            v-model="params[key]"
            clearable
            :placeholder="
              searchItem.placeholder ? searchItem.placeholder : searchItem.label
            "
            @clear="queryClick"
          >
          </el-input>
        </el-form-item>
        <el-form-item
          v-if="searchItem.type === 'select'"
          class="basic-form-item"
          :label="searchItem.label"
        >
          <el-select
            v-model="params[key]"
            :clearable="!searchItem.hideClear"
            :placeholder="
              searchItem.placeholder ? searchItem.placeholder : searchItem.label
            "
            size="small"
            @change="queryClick"
          >
            <el-option
              v-for="item in searchItem.options"
              :key="
                typeof item !== 'object' ? item : item[searchItem.props.value]
              "
              :label="
                typeof item !== 'object' ? item : item[searchItem.props.label]
              "
              :value="
                typeof item !== 'object' ? item : item[searchItem.props.value]
              "
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="searchItem.type === 'daterange'"
          :label="searchItem.label"
        >
          <el-date-picker
            v-model="params[key]"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="defaultTime"
            :value-format="searchItem.valueFormat"
            @change="queryClick"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
    </div>
    <el-button type="primary" @click="queryClick">查询</el-button>
    <!-- <el-button @click="resetClick">重置</el-button> -->
    <slot name="haddleBtns"></slot>
  </div>
</template>

<script>
import { ref, reactive, watch } from "vue";
export default {
  name: "BasicSearch",
  props: {
    /**
     * type 搜索框类型，可选值：input、select、daterange(日期关联选择器)
     * label 名称
     * value 默认的搜索框值
     * placeholder 占位符
     * options type为select时需要传递的参数
     * props 配置选项, type为select时, props格式为{label: "自定义label名", value: "自定义value名"}
     *               type为daterange时,props格式为{start: "自定义start名", end: "自定义end名"}
     */
    search: {
      type: Object,
      default: () => {},
    },
    query: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, { emit }) {
    const defaultTime = ref([
      new Date(2000, 1, 1, 0, 0, 0),
      new Date(2000, 2, 1, 23, 59, 59),
    ]); // '00:00:00', '23:59:59'
    let params = reactive({});
    let copySearch = reactive({});
    defaultSetting();
    watch(props.search, (newValue) => {
      defaultSetting();
    });
    /**
     * 查询
     */
    function queryClick() {
      for (let myKey in copySearch) {
        let item = copySearch[myKey];
        if (item.type === "daterange") {
          // 日期或时间关联选择器
          if (params[myKey] && params[myKey].length > 0) {
            params[item.props.start] = params[myKey][0];
            params[item.props.end] = params[myKey][1];
          } else {
            params[item.props.start] = null;
            params[item.props.end] = null;
          }
        }
      }
      let copyParams = JSON.parse(JSON.stringify(params));
      for (let myKey in copySearch) {
        let item = copySearch[myKey];
        if (item.type === "daterange") {
          delete copyParams[myKey];
        }
      }
      console.log(copyParams);
      emit("update:query", copyParams);
    }
    /**
     * 重置
     */
    function resetClick() {
      // 恢复初始值
      params.value = {};
      for (let myKey in props.search) {
        params[myKey] = props.search[myKey].value;
      }
      this.queryClick();
    }
    /**
     * 特殊类型默认配置处理
     */
    function defaultSetting() {
      for (let myKey in props.search) {
        console.log(myKey, props.search[myKey]);
        let item = JSON.parse(JSON.stringify(props.search[myKey]));
        console.log(item);
        if (item.type === "daterange") {
          // 日期或时间关联选择器添加默认配置选项
          let prop = {};
          if (item.props) {
            prop = item.props;
          } else {
            prop = {
              start: "startTime",
              end: "endTime",
            };
          }
          item.props = prop;
          // item.valueFormat = item.valueFormat || "yyyy-MM-dd HH:mm:ss";
          item.valueFormat = item.valueFormat || "x";
        } else if (item.type === "select") {
          // 下拉选择器添加默认配置项
          let prop = {};
          if (item.props) {
            prop = item.props;
          } else {
            prop = {
              label: "label",
              value: "value",
            };
          }
          item.props = prop;
        }
        copySearch[myKey] = item;
      }
    }
    console.log(props.search, params);
    return { defaultTime, params, copySearch, queryClick, resetClick };
  },
};
</script>

<style lang="scss" scoped>
.basic-search {
  position: relative;
  .basic-search-item {
    margin-right: 16px;
  }
  ::v-deep {
    .el-form-item {
      margin-bottom: 0;
    }
    .el-form-item--small.el-form-item {
      margin-bottom: 0;
    }
    .basic-form-item .el-form-item__content {
      width: 180px;
    }
    .el-form-item__label {
      font-size: 12px;
    }
  }
}
</style>
