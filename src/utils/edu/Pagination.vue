<template>
  <div :class="[paginationClass, { hidden: hidden }]">
    <a-pagination
      :background="background"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      :show-total="
        (total, range) => `显示${range[0]}到${range[1]}条 , 共 ${total} 条记录`
      "
      @change="handleCurrentChange"
      :pager-count="pagerCount"
    />
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    total: {
      required: true,
      type: Number,
    },
    paginationClass: {
      type: String,
      default: "pagination-container",
    },
    page: {
      type: Number,
      default: 1,
    },
    pagerCount: {
      type: Number,
      default: 7,
    },
    limit: {
      type: Number,
      default: 20,
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 50];
      },
    },
    layout: {
      type: String,
      default: "total, sizes, prev, pager, next, jumper",
    },
    background: {
      type: Boolean,
      default: true,
    },
    autoScroll: {
      type: Boolean,
      default: true,
    },
    hidden: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    currentPage: {
      get() {
        return this.page;
      },
      set(val) {
        this.$emit("update:page", val);
      },
    },
    pageSize: {
      get() {
        return this.limit;
      },
      set(val) {
        this.$emit("update:limit", val);
      },
    },
  },
  methods: {
    handleCurrentChange(val) {
      this.$emit("pagination", { page: val, limit: this.pageSize });
      if (this.autoScroll) {
      }
    },
  },
};
</script>

<style scoped lang="less">
.pagination-container {
  text-align: right;
  padding: 15px;
  /deep/ .ant-pagination-total-text {
    color: #999999;
  }
}
</style>
