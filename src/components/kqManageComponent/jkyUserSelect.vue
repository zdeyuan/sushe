<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-14 17:57:41
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-02-27 14:50:56
-->
<template>
  <div class="user-select">
    <div class="flex">
      <div class="show-div">
        <div class="select-box" style="    background: #f3f2f2;">
          <span class="no-data-sapn" v-if="selectList.length == 0">请选择</span>
          <span class="select-ont" v-for="(item, index) in selectList" :key="item.id" @click="clickOne(index)">
            {{ item.name }}
            <a-icon type="close" class="select-close" />
          </span>
        </div>
      </div>
      <div class="select-div">
        <a-button type="primary" @click="show()">
          <a-icon type="plus" class="acion" />
          选择
        </a-button>
      </div>
    </div>
    <!-- 编辑页 -->
    <edu-form title="教师列表" v-if="isShow" size="big" width="75%" @ok="onOk" @cancel="handelCancel">
      <div>
        <edu-query ref="cwQuery" code="veJkyUser" :do-filter="handleFilter">
          <template slot="search">
            <edu-query-item title="姓名" pname="realname" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="职称" pname="pro_Call" pop="like" stype="select" code="zhichen"> </edu-query-item>
            <edu-query-item title="人员类型" pname="type_Num" pop="eq" stype="select" code="userType"> </edu-query-item>
          </template>
        </edu-query>
        <edu-table
          ref="veJkyUserTable"
          code="veJkyUser"
          :api="veJkyUserTable.api"
          :get-params="getParams"
          :config="{
            status: false,
            checkType: check ? 'checkbox' : 'radio'
          }"
          :isShowTopBtn="false"
          isAutoBtn
        >
          <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
          <a-table-column title="姓名" dataIndex="realname" width="150px"> </a-table-column>
          <a-table-column title="人员类型" dataIndex="typeNum" width="150px">
            <template slot-scope="text">
              <edu-dict-text code="userType" :value="text"></edu-dict-text>
            </template>
          </a-table-column>
          <a-table-column title="职称" dataIndex="proCall" width="150px">
            <template slot-scope="text">
              <edu-dict-text code="zhichen" :value="text"></edu-dict-text>
            </template>
          </a-table-column>
          <a-table-column title="性别" dataIndex="sexNum" width="150px">
            <template slot-scope="text">
              <edu-dict-text code="sex" :value="text"></edu-dict-text>
            </template>
          </a-table-column>
        </edu-table>
      </div>
    </edu-form>
  </div>
</template>

<script>
import veJkyUserApi from '@/api/research/rbase/veJkyUserApi';

export default {
  components: {},
  props: {
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
      selectList: []
    };
    data.veJkyUserTable = {
      api: veJkyUserApi
    };
    return data;
  },
  mounted() {},
  methods: {
    clickOne(index) {
      this.selectList.splice(index, 1);
    },
    getParams() {
      const params = this.$refs['cwQuery'].getQueryData();
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
    setValue(ids) {
      this.selectList.splice(0, this.selectList.length);
      if (!ids || ids.length == 0) {
        return;
      }
      veJkyUserApi.findByIds(ids).then(res => {
        const list = res.result;
        list.forEach(po => {
          this.selectList.push({
            id: po.id,
            name: po.realname
          });
        });
      });
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
            id: po.id,
            name: po.realname
          });
        }
      });
      this.isShow = false;
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
  .no-data-sapn {
    display: inline-block;
    margin-left: 12px;
    color: #bbb;
  }
}
</style>
