<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-04-21 22:49:27
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-05-02 23:44:38
-->
<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <a-tabs v-model="selectTab" class="auto-tabs">
        <a-tab-pane tab="品德与公民素养" key="a1"> </a-tab-pane>
        <a-tab-pane tab="课程与学业成绩" key="a2"> </a-tab-pane>
        <a-tab-pane tab="身心健康素养" key="a3"> </a-tab-pane>
        <a-tab-pane tab="个人发展素养" key="a4"> </a-tab-pane>
      </a-tabs>
      <div class="ant-table-body">
        <table class="my_table">
          <thead class="ant-table-thead">
            <tr>
              <th>二级指标名称</th>
              <th>三级指标名称</th>
              <th>指标类型</th>
              <th>分值设置（加分）</th>
              <th>分值设置（减分）</th>
              <th>规则说明</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in dataList" v-if="isShow(item)" :key="item.id">
              <td> {{ item.pidName }} </td>
              <td>{{ item.name }}</td>
              <td>{{ item.attrName }}</td>
              <td> <a-input-number v-model="item.addScore" placeholder="请输入" style="width:100px" />{{ item.addUnit }} </td>
              <td> <a-input-number v-model="item.minusScore" placeholder="请输入" style="width:100px" />{{ item.minUnit }} </td>
              <td>{{ item.description }}</td>
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
import veStuIdxScoreConfigApi from '@/views/stuManage/jis/api/veStuIdxScoreConfigApi';

export default {
  components: {},
  data() {
    const data = {
      selectTab: 'a1',
      dataList: {}
    };
    return data;
  },
  mounted() {
    this.init();
  },
  methods: {
    isShow(row) {
      if (this.selectTab == 'a1') {
        if (row.id >= 0 && row.id <= 6) {
          return true;
        }
      } else if (this.selectTab == 'a2') {
        if (row.id >= 7 && row.id <= 10) {
          return true;
        }
      } else if (this.selectTab == 'a3') {
        if (row.id >= 11 && row.id <= 13) {
          return true;
        }
      } else if (this.selectTab == 'a4') {
        if (row.id >= 14 && row.id <= 21) {
          return true;
        }
      }
      return false;
    },
    init() {
      const sub = {
        sorts: [{ column: 'list_sort', asc: true }]
      };
      veStuIdxScoreConfigApi.all(sub).then(res => {
        this.dataList = res.result;
      });
    },
    getPname(pid) {
      for (let i = 0; i < this.dataList.length; i++) {
        const element = this.dataList[i];
        if (element.id == pid) {
          return element.name;
        }
      }
      return '-';
    },
    /**
     * @msg: 调用Api修改数据
     */
    updateData() {
      veStuIdxScoreConfigApi.update(this.dataList).then(() => {
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
      this.$refs.veStuIdxScoreConfigTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuIdxScoreConfigEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuIdxScoreConfigEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veStuIdxScoreConfigShow.doShow(row);
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
      this.$refs.veStuIdxScoreConfigTable.reload();
    }
  }
};
</script>
<style lang="less" scoped>
.ant-table-body {
  padding: 15px 5%;
}

.my_table {
  width: 100%;

  th,
  td {
    text-align: left;
    padding: 8px;
    border: 1px solid #f2f2f2;
  }
}
.form-footer {
  padding: 15px;
  text-align: center;
}
</style>
