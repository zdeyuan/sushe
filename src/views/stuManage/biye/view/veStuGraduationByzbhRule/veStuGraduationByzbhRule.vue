<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-04-21 22:49:27
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-04-28 22:17:41
-->
<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div class="ant-table-body">
        <table class="my_table">
          <thead class="ant-table-thead">
            <tr>
              <th>规则名称</th>
              <th>设置</th>
              <th>排序</th>
              <th>是否启用</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in dataList" :key="item.id">
              <td>{{ item.name }}</td>
              <td>
                位数
                <a-input-number v-model="item.value" placeholder="排序" style="width:100px" />
              </td>
              <td>
                <a-input-number v-model="item.listSort" placeholder="排序" style="width:100px" />
              </td>
              <td>
                <edu-data v-model="item.status" stype="radio" code="status" />
              </td>
            </tr>
          </tbody>
        </table>
        <div class="form-footer">
          <a-button style="padding: 0 25px;margin-right: 15px;" type="primary" @click="updateData">
            保存
          </a-button>
          <a-button style="padding: 0 25px;" class="close-btn" @click="init">
            重置
          </a-button>
        </div>
      </div>
    </div>
  </edu-layout>
</template>

<script>
import veStuGraduationByzbhRuleApi from '@/views/stuManage/biye/api/veStuGraduationByzbhRuleApi';

export default {
  components: {},
  data() {
    const data = {
      dataList: {}
    };
    return data;
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const sub = {
        sorts: [{ column: 'list_sort', asc: true }]
      };
      veStuGraduationByzbhRuleApi.all(sub).then(res => {
        this.dataList = res.result;
      });
    },
    /**
     * @msg: 调用Api修改数据
     */
    updateData() {
      veStuGraduationByzbhRuleApi.update(this.dataList).then(() => {
        this.$notification.success({
          message: '数据修改成功',
          description: '修改了一条数据'
        });
        this.$emit('onOk');
      });
    },
    /**
     * @msg: 表格获取请求数据 必须return 一个对象
     */
    getParams() {
      const params = this.$refs['cwQuery'].getQueryData();
      return params;
    },
    /**
     * @msg: 搜索事件
     */
    handleFilter() {
      this.$refs.veStuEvaluationConfigTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuEvaluationConfigEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuEvaluationConfigEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veStuEvaluationConfigShow.doShow(row);
      });
    },
    /**
     * @msg: 编辑页取消事件
     */
    editCancel() {
      this.showType = 'table';
    },
    /**
     * @msg: 编辑页成功事件
     */
    editOk() {
      this.showType = 'table';
      this.$refs.veStuEvaluationConfigTable.reload();
    }
  }
};
</script>
<style lang="less" scoped>
.ant-table-body {
  padding: 15px 10%;
}

.my_table {
  width: 100%;

  th,
  td {
    text-align: center;
    padding: 8px;
    border: 1px solid #f2f2f2;
  }
}
.form-footer {
  padding: 15px;
  text-align: center;
}
</style>
