<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-14 17:57:41
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-02-18 12:55:52
-->
<template>
  <div class="user-select">
    <div class="ant-select ant-select-enabled">
      <div class="ant-select-selection ant-select-selection--single" @click="show()">
        <div class="ant-select-selection__rendered">
          <div unselectable="on" class="ant-select-selection__placeholder" v-if="selectList.length == 0">请选择项目</div>
          <div v-else class="ant-select-selection-selected-value" style="display: block; opacity: 1;"> {{ selectText }} </div>
        </div>
        <span unselectable="on" class="ant-select-arrow" style="user-select: none;">
          <a-icon :type="visible ? 'up' : 'down'" />
        </span>
      </div>
    </div>
    <!-- 编辑页 -->
    <edu-form :title="title" v-if="isShow" width="50%" @ok="onOk" @cancel="handelCancel">
      <div>
        <edu-query ref="cwQuery" code="veJkyUser" :do-filter="handleFilter">
          <template slot="search">
            <edu-query-item title="项目名称" pname="b.name" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="项目编号" pname="b.serial" pop="like" stype="input"> </edu-query-item>
          </template>
        </edu-query>
        <edu-table
          ref="veJkyUserTable"
          code="veJkyUser"
          :api="veJkyUserTable.api"
          :get-params="getParams"
          :config="{
            status: false,
            checkType: 'radio',
            pageFn: pageFn
          }"
          :isShowTopBtn="false"
          isAutoBtn
        >
          <a-table-column title="项目名称" dataIndex="projectName" width="150px"> </a-table-column>
          <a-table-column title="项目编号" dataIndex="projectSerial" width="150px"> </a-table-column>
          <a-table-column title="总费用" dataIndex="totalCost" width="150px">
            <template slot-scope="totalCost"> {{ totalCost }}元 </template>
          </a-table-column>
        </edu-table>
      </div>
    </edu-form>
  </div>
</template>

<script>
import veJkyProjectApi from '@/api/research/rproject/veJkyProjectApi';
import veJkyFundApi from '@/api/research/rfunds/veJkyFundApi';

export default {
  components: {},
  props: {
    pageFn: {
      type: String,
      default: 'page'
    },
    title: {
      type: String,
      default: '项目预算列'
    },
    check: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const data = {
      isShow: false,
      veJkyAdminQuery: {},
      showType: 'table',
      visible: false,
      selectList: []
    };

    data.veJkyUserTable = {
      api: veJkyFundApi
    };
    return data;
  },
  computed: {
    selectText() {
      const nameList = this.selectList.map(select => {
        return select.name;
      });
      return nameList.join();
    }
  },
  mounted() {},
  methods: {
    getParams() {
      const params = this.$refs['cwQuery'].getQueryData();
      this.$utils.addPageConditions(params, 'd.status', 'eq', 1);
      return params;
    },
    handleFilter() {
      this.$refs.veJkyUserTable.reload();
    },
    show() {
      this.isShow = true;
    },
    getValue() {
      return this.selectList.map(item => item.id);
    },
    setValueObj(arr) {
      this.selectList.splice(0, this.selectList.length);
      if (!arr || arr.length == 0) {
        return;
      }
      this.selectList = arr;
    },
    setValue(ids) {
      this.selectList.splice(0, this.selectList.length);
      if (!ids || ids.length == 0) {
        return;
      }
    },
    onOk() {
      let select = this.$refs.veJkyUserTable.getSelectRow();
      if (!this.check && select && select.length > 0) {
        select = [select[0]];
        this.selectList.splice(0, this.selectList.length);
      }

      select.forEach(po => {
        if (this.$utils.isInArr(this.selectList, 'id', select.id)) {
          //如果已经存在
        } else {
          //如果不存在 加进去
          this.selectList.push({
            id: po.projectId,
            fundId: po.id,
            name: po.projectName
          });
        }
      });
      this.isShow = false;
      this.$emit('ok', this.selectList);
    },
    handelCancel() {
      this.isShow = false;
    }
  }
};
</script>
<style lang="less" scoped>
.flex {
  display: flex;
  .show-div {
    flex: 1;
    border: 1px solid #d9d9d9;
    border-radius: 3px;
    margin-right: 15px;
  }
  .select-div {
    width: 150px;
  }
}
.select-box {
  .select-ont {
    height: 24px;
    padding: 0 8px;
    line-height: 22px;
    box-sizing: border-box;
    margin: 2px 0 2px 6px;
    background-color: #f4f4f5;
    border-color: #e9e9eb;
    color: #909399;
    display: inline-block;
    border-radius: 5px;
    cursor: pointer;
    user-select: none;
  }
  .select-close {
    color: #909399;
    background-color: #c0c4cc;
    border-radius: 50%;
  }
  .no-data {
    display: inline-block;
    margin-left: 12px;
    color: #bbb;
  }
}
</style>
