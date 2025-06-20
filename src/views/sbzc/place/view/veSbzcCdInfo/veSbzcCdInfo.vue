<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div>
        <edu-query ref="cwQuery" code="veSbzcCdInfo" :do-filter="handleFilter" @refreshBack="refreshBack">
          <template slot="search">
            <edu-query-item title="场地编号" pname="code" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="场地名称" pname="name" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="场地类别">
              <edu-tree-select @onChange="handleFilter" ref="eduTree" width="200px" :check="false" :nodes="cateList"></edu-tree-select>
            </edu-query-item>
            <edu-query-item title="所属校区" pname="xqh" pop="eq">
              <xiaoQuList ref="xiaoQuList" v-model="veSbzcCdInfoQuery.xqh" @change="handleFilter"></xiaoQuList>
            </edu-query-item>
            <edu-query-item title="负责人" pname="response_User_Name" pop="like" stype="input" style="margin-right:150px"> </edu-query-item>
          </template>
        </edu-query>
        <edu-table
          ref="veSbzcCdInfoTable"
          code="veSbzcCdInfo"
          :api="veSbzcCdInfoTable.api"
          :get-params="getParams"
          :doImport="doImport"
          :exportConfig="{
            url: 'veSbzcCdInfo/export',
            name: '《场地表导出》'
          }"
          :config="{
            open: false,
            close: false,
            status: false
          }"
          :opWidth="300"
          :to-update="handleUpdate"
          :toDetail="toDetail"
          :do-add="handleCreate"
        >
          <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
          <a-table-column title="场地编号" dataIndex="code" width="150px"> </a-table-column>
          <a-table-column title="场地名称" dataIndex="name" width="150px"> </a-table-column>
          <a-table-column title="场地类型" dataIndex="cateId" width="150px">
            <template slot-scope="text">
              {{ getCateName(text) }}
            </template>
          </a-table-column>
          <a-table-column title="所属校区" dataIndex="xqh" width="150px">
            <template slot-scope="text">
              {{ getXqName(text) }}
            </template>
          </a-table-column>
          <a-table-column title="占地面积" dataIndex="area" width="150px"> </a-table-column>
          <a-table-column title="地址" dataIndex="address" width="150px"> </a-table-column>
          <a-table-column title="是否可借用" dataIndex="isAppliable" width="150px">
            <template slot-scope="text">
              {{ text == 1 ? '可以' : '不可以' }}
            </template>
          </a-table-column>
          <a-table-column title="负责人" dataIndex="responseUserName" width="150px"> </a-table-column>
          <template slot="af_btn" slot-scope="{ row }">
            <span class="ant-btn" style="color:#999;border-width:0;display: inline-block;" v-if="row.isAppliable == 0">借出</span>
            <edu-pms :code="'aaa'" v-else name="借出" ext="tdetil" type="success" size="mini" @click="doJie(row)"> </edu-pms>
            <span class="ant-btn" style="color:#999;border-width:0;display: inline-block;" v-if="row.isAppliable == 1">归还</span>
            <edu-pms :code="'aaa'" v-else name="归还" ext="tdetil" type="success" size="mini" @click="doHuan(row)"> </edu-pms>
          </template>
        </edu-table>
      </div>
      <!-- 编辑页 -->
      <veSbzcCdInfoEdit v-if="showType == 'edit'" :cateList="cateList" ref="veSbzcCdInfoEdit" @onOk="editOk" @onCancel="editCancel">
      </veSbzcCdInfoEdit>
      <veSbzcCdRevertEdit v-if="showType == 'huan'" :cateList="cateList" ref="veSbzcCdRevertEdit" @onOk="editOk" @onCancel="editCancel">
      </veSbzcCdRevertEdit>
      <veSbzcCdApplyEdit v-if="showType == 'jie'" :cateList="cateList" ref="veSbzcCdApplyEdit" @onOk="editOk" @onCancel="editCancel">
      </veSbzcCdApplyEdit>
      <veSbzcCdInfoShow v-if="showType == 'show'" ref="veSbzcCdInfoShow" @onOk="editOk" @onCancel="editCancel"> </veSbzcCdInfoShow>
    </div>
  </edu-layout>
</template>

<script>
import veSbzcCdCategoryApi from '@/views/sbzc/place/api/veSbzcCdCategoryApi';
import veSbzcCdInfoApi from '@/views/sbzc/place/api/veSbzcCdInfoApi';
import veSbzcCdInfoEdit from './veSbzcCdInfoEdit';
import veSbzcCdApplyEdit from './veSbzcCdApplyEdit';
import veSbzcCdRevertEdit from './veSbzcCdRevertEdit';
import veSbzcCdInfoShow from './veSbzcCdInfoShow';

import xiaoQuList from '@/components/xiaoQuList';

export default {
  components: {
    veSbzcCdInfoEdit,
    veSbzcCdInfoShow,
    veSbzcCdApplyEdit,
    veSbzcCdRevertEdit,
    xiaoQuList
  },
  data() {
    const data = {
      veSbzcCdInfoQuery: {},
      showType: 'table',
      cateList: []
    };
    data.veSbzcCdInfoTable = {
      api: veSbzcCdInfoApi
    };
    return data;
  },
  mounted() {
    this.initData();
  },
  methods: {
    doJie(row) {
      this.showType = 'jie';
      this.$nextTick(() => {
        this.$refs.veSbzcCdApplyEdit.doCreate(row);
      });
    },
    doHuan(row) {
      this.showType = 'huan';
      this.$nextTick(() => {
        this.$refs.veSbzcCdRevertEdit.doCreate(row);
      });
    },
    doImport() {
      return {
        temp: ['场地编号', '场地名称', '	场地类型', '所属校区', '占地面积', '地址', '是否可借用', '负责人'],
        tempName: '德育统计表',
        implName: 'veStuMoralCountServiceImpl.importExcel'
      };
    },
    getCateName(dataId) {
      for (let i = 0; i < this.cateList.length; i++) {
        const element = this.cateList[i];
        if (element.id == dataId) return element.name;
      }
      return '-';
    },
    getXqName(dataId) {
      const list = this.$refs.xiaoQuList.getList() || [];
      for (let i = 0; i < list.length; i++) {
        const element = list[i];
        if (element.id == dataId) return element.name;
      }
      return '-';
    },
    refreshBack() {
      this.$refs.eduTree.setValue([]);
    },
    initData() {
      const params = {
        size: 1000,
        current: 1,
        conditions: [{ operator: 'eq', column: 'status', value: 1 }],
        sorts: [{ column: 'id', asc: false }]
      };
      //   this.$utils.addPageConditions(params, 'status', 'eq', 1);
      veSbzcCdCategoryApi.page(params).then(res => {
        this.cateList = res.result.records;
      });
    },
    /**
     * @msg: 表格获取请求数据 必须return 一个对象
     */
    getParams() {
      const params = this.$refs['cwQuery'].getQueryData();

      const tres = this.$refs.eduTree.getValue();
      if (tres && tres.length > 0) {
        this.$utils.addPageConditions(params, 'cate_Id', 'eq', tres[0]);
      }

      this.$utils.addPageConditions(params, 'is_Delete', 'eq', 0);

      return params;
    },
    /**
     * @msg: 搜索事件
     */
    handleFilter() {
      this.$refs.veSbzcCdInfoTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veSbzcCdInfoEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veSbzcCdInfoEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veSbzcCdInfoShow.doShow(row);
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
      this.$refs.veSbzcCdInfoTable.reload();
    }
  }
};
</script>
<style lang="less" scoped></style>
