<template>
  <div ref="basicTable" class="basic-table">
    <div ref="basicTableTop" class="basic-table-top">
      <slot name="basic-table-top" :total="total"></slot>
    </div>
    <el-table
      ref="multipleTable"
      v-loading="loading"
      v-bind="$attrs"
      :data="dataTable"
      :header-cell-style="tableHeaderStyle"
      :max-height="height"
      style="width: 100%"
      @row-click="rowClick"
      @select="select"
      @select-all="selectAll"
    >
      <el-table-column
        v-if="selection"
        align="center"
        type="selection"
        width="40"
      >
      </el-table-column>
      <slot name="table-column-front"></slot>
      <el-table-column
        v-for="item in column"
        :key="item.prop"
        :fixed="item.fixed"
        :label="item.label"
        :min-width="item.minWidth"
        :prop="item.prop"
        :show-overflow-tooltip="item.tooltip"
        :width="item.width"
      >
        <template v-slot="scope">
          <slot
            :$index="scope.$index"
            :column="scope.column"
            :name="item.prop"
            :row="scope.row"
          >
            {{ scope.row[item.prop] ? scope.row[item.prop] : "-" }}
          </slot>
        </template>
      </el-table-column>
      <!--默认插槽-->
      <slot></slot>
    </el-table>
    <!--分页组件-->
    <div ref="pagination" class="pagination flex-center-between">
      <slot name="btm-left"></slot>
      <el-pagination
        v-if="paging"
        v-model:current-page="params.page"
        :layout="layout"
        v-model:page-size="params.size"
        :page-sizes="pageSizes"
        :total="pageTotal"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "BasicTable",
  props: {
    // 列表查询接口, 传递列表请求接口
    getList: {
      type: Function,
    },
    // 列表数据，用于未传递列表请求接口时，传递要展示的列表数据
    tableData: {
      type: Array,
      default: () => [],
    },
    // 列表总数，用于未传递列表请求接口时，传递要列表总条数，便于分页
    tableTotal: {
      type: Number,
      default: 0,
    },
    // 表头
    column: {
      type: Array,
      default: () => [],
    },
    // 是否显示多选列
    selection: {
      type: Boolean,
      default: false,
    },
    // 多选选中数据
    multipleSelection: {
      type: Array,
      default: () => [],
    },
    // 是否显示分页
    paging: {
      type: Boolean,
      default: true,
    },
    // 分页选项
    layout: {
      type: String,
      default: "total, prev, pager, next, sizes, jumper",
    },
    // 分页组件布局
    pageSizes: {
      type: Array,
      default: () => [10, 20, 50, 100],
    },
    // 分页配置
    pageProps: {
      type: Object,
      default: () => {
        return {
          page: "page",
          size: "size",
        };
      },
    },
    // 默认参数
    defaultParam: {
      type: Object,
      default: () => {},
    },
    // 查询参数
    query: {
      type: Object,
      default: () => {},
    },
    // 返回结果配置
    resProps: {
      type: Object,
      default: () => {
        return {
          list: "data",
          total: "total",
        };
      },
    },
  },
  // setup(props) {
  //   let loading = ref(false);
  //   let height = ref(200);
  //   let table = reactive({
  //     data: [],
  //     total: 0,
  //   });
  //   let laypage = reactive({
  //     page: 1,
  //     size: 20,
  //   });
  //   let dataTable = computed(() => {
  //     if (props.getList) {
  //       return this.data;
  //     } else {
  //       return this.tableData;
  //     }
  //   });
  //   return { loading, height, table, laypage, dataTable };
  // },
  data() {
    return {
      // 表格头部样式
      tableHeaderStyle: {},
      // 列表数据
      data: [],
      // 列表总数
      total: 0,
      // 请求列表默认参数
      params: {
        page: 1,
        size: 20,
      },
      // 表格高度
      height: 200,
      // 加载状态
      loading: false,
    };
  },
  computed: {
    dataTable: {
      get() {
        if (this.getList) {
          return this.data;
        } else {
          return this.tableData;
        }
      },
      set(newValue) {
        return newValue;
      },
    },
    pageTotal: {
      get() {
        if (this.getList) {
          return this.total;
        } else {
          return this.tableTotal;
        }
      },
      set(newValue) {
        return newValue;
      },
    },
    multiple: {
      get() {
        return this.multipleSelection;
      },
      set(val) {
        this.$emit("update:multipleSelection", val);
      },
    },
  },
  watch: {
    defaultParam: {
      handler() {
        this.tableList();
      },
      deep: true,
    },
    query: {
      handler() {
        this.tableList();
      },
      deep: true,
    },
    multipleSelection: {
      handler() {
        this.$nextTick(() => {
          this.$refs.multipleTable.clearSelection();
          this.multipleSelection.forEach((item) => {
            this.$refs.multipleTable.toggleRowSelection(item, true);
          });
        });
      },
      deep: true,
    },
  },
  created() {
    this.tableList();
  },
  mounted() {
    this.autoHeight();
    window.onresize = () => {
      this.autoHeight();
    };
  },
  methods: {
    // 点击一行时触发
    rowClick(row, column, event) {
      this.$emit("rowClick", row, column, event);
    },
    /**
     *高度自适应
     */
    autoHeight() {
      this.$nextTick(() => {
        if (!this.$refs.basicTable) return;
        let parentHeight = this.$refs.basicTable.parentNode.offsetHeight;
        let topHeight =
          this.$refs.basicTableTop.offsetHeight > 0
            ? this.$refs.basicTableTop.offsetHeight + 16 // 16为顶部元素的margin-bottom值
            : 0;
        let btmHeight = this.$refs.pagination.offsetHeight;
        let parentStyle = document.defaultView.getComputedStyle(
          this.$refs.basicTable.parentNode,
          null
        );
        let topStyle = document.defaultView.getComputedStyle(
          this.$refs.basicTableTop,
          null
        );
        let realParentHeight =
          parentHeight -
          parseInt(parentStyle.paddingTop) -
          parseInt(parentStyle.paddingBottom);
        let realTopHeight =
          topHeight +
          parseInt(topStyle.marginTop) +
          parseInt(topStyle.marginBottom);
        this.height = realParentHeight - realTopHeight - btmHeight;
      });
    },
    /**
     *当前页-改变时回调
     */
    handleCurrentChange(val) {
      this.tableList();
      this.$emit("handleCurrentChange", val);
    },
    /**
     * 每页条数-改变时回调
     */
    handleSizeChange(val) {
      this.params.page = 1;
      this.tableList();
      this.$emit("handleSizeChange", val);
    },
    /**
     * 数据获取
     * @param query
     * @returns {Promise<void>}
     */
    async tableList(query) {
      if (this.getList) {
        // 合并查询参数和默认的分页参数，如果不显示分页，则不传递分页相关参数
        let pages = {};
        pages[this.pageProps.page] = this.params.page;
        pages[this.pageProps.size] = this.params.size;
        let params = Object.assign(
          {},
          query || {},
          this.paging ? pages : {},
          this.query,
          this.defaultParam
        );
        this.loading = true;
        let res = await this.getList(params);
        if (res && res.data) {
          this.data = res.data || [];
          this.total = Number(res.total) || 0;
        }
        this.loading = false;
        this.$emit("update:tableData", this.data);
        this.$emit("update:tableTotal", this.total);
      } else {
        this.data = this.tableData;
        this.total = this.tableTotal;
      }
    },
    /**
     * 选中
     */
    select(selection) {
      this.multiple = selection;
      this.$emit("select", ...arguments);
    },
    /**
     * 选中-全选
     */
    selectAll(selection) {
      this.multiple = selection;
      this.$emit("selectAll", ...arguments);
    },
  },
};
</script>

<style lang="scss" scoped>
.basic-table {
  width: 100%;
  ::v-deep {
    .el-checkbox__input.is-indeterminate {
      .el-checkbox__inner {
        background-color: #ffffff;
        border-color: #dcdfe6;
        &::before {
          transform: scale(0.6);
          background-color: $primary;
        }
      }
    }
    .el-checkbox__inner {
      width: 12px;
      height: 12px;
      &::before {
        top: 4px;
      }
      &::after {
        width: 2px;
        height: 5px;
      }
    }
    .el-pagination__jump {
      margin-left: 0;
    }
    .el-pagination {
      flex: 1;
    }
  }
  .basic-table-top {
    & > *:first-child {
      margin-bottom: 16px;
    }
  }
  .pagination {
    padding-top: 16px;
    text-align: end;
  }
}
</style>
