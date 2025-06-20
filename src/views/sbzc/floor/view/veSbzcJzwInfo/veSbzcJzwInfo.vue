<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div>
        <edu-query ref="cwQuery" code="veSbzcJzwInfo" :do-filter="handleFilter" @refreshBack="refreshBack">
          <template slot="search">
            <edu-query-item title="楼宇编号" pname="d.code" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="楼宇名称" pname="d.name" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="楼宇类别" stype="costom">
              <edu-tree-select @onChange="handleFilter" ref="eduTree" width="200px" :check="false" :nodes="categoryNodes"></edu-tree-select>
            </edu-query-item>
            <edu-query-item title="所属校区" pname="d.xqh" pop="eq">
              <xiaoQuList ref="xiaoQuList" v-model="veSbzcJzwInfoQuery.xqh" @change="handleFilter"></xiaoQuList>
            </edu-query-item>
            <edu-query-item title="权属证号" pname="d.qs_code" pop="like" stype="input"> </edu-query-item>
          </template>
        </edu-query>
        <edu-table
          ref="veSbzcJzwInfoTable"
          code="veSbzcJzwInfo"
          :api="veSbzcJzwInfoTable.api"
          :get-params="getParams"
          :exportConfig="{
            url: 'veSbzcJzwInfo/export',
            name: '《楼宇基本信息表导出》'
          }"
          :sorts="[
            {
              column: 'd.create_date',
              asc: true
            }
          ]"
          :config="{
            open: false,
            close: false,
            status: false
          }"
          :doImport="doImport"
          :to-update="handleUpdate"
          :toDetail="toDetail"
          :do-add="handleCreate"
        >
          <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
          <a-table-column title="楼宇编号" dataIndex="code" width="150px"> </a-table-column>
          <a-table-column title="楼宇名称" dataIndex="name" width="150px"> </a-table-column>
          <a-table-column title="楼宇类别" dataIndex="cateName" width="150px"> </a-table-column>
          <a-table-column title="所属校区" dataIndex="xqh" width="150px">
            <template slot-scope="text">
              {{ getXqName(text) }}
            </template>
          </a-table-column>
          <a-table-column title="楼宇地址" dataIndex="address" width="150px"> </a-table-column>
          <a-table-column title="总共层数 " dataIndex="floorNum" width="150px"> </a-table-column>
          <a-table-column title="建成年月" dataIndex="jcDate" width="150px"> </a-table-column>
          <a-table-column title="权属证号" dataIndex="qsCode" width="150px"> </a-table-column>
        </edu-table>
      </div>
      <!-- 编辑页 -->
      <veSbzcJzwInfoEdit v-if="showType == 'edit'" :categoryNodes="categoryNodes" ref="veSbzcJzwInfoEdit" @onOk="editOk" @onCancel="editCancel">
      </veSbzcJzwInfoEdit>
      <veSbzcJzwInfoShow v-if="showType == 'show'" ref="veSbzcJzwInfoShow" @onOk="editOk" @onCancel="editCancel"> </veSbzcJzwInfoShow>
    </div>
  </edu-layout>
</template>

<script>
import veSbzcJzwInfoApi from '@/views/sbzc/floor/api/veSbzcJzwInfoApi';
import veSbzcJzwBuildcateApi from '@/views/sbzc/floor/api/veSbzcJzwBuildcateApi';
import veSbzcJzwInfoEdit from './veSbzcJzwInfoEdit';
import veSbzcJzwInfoShow from './veSbzcJzwInfoShow';
import xiaoQuList from '@/components/xiaoQuList';
export default {
  components: {
    veSbzcJzwInfoEdit,
    veSbzcJzwInfoShow,
    xiaoQuList
  },
  data() {
    const data = {
      veSbzcJzwInfoQuery: {},
      showType: 'table'
    };
    data.veSbzcJzwInfoTable = {
      api: veSbzcJzwInfoApi
    };
    data.categoryNodes = [];
    return data;
  },
  mounted() {
    this.initData();
  },
  methods: {
    getXqName(dataId) {
      const list = this.$refs.xiaoQuList.getList() || [];
      for (let i = 0; i < list.length; i++) {
        const element = list[i];
        if (element.id == dataId) return element.name;
      }
      return '-';
    },
    //

    doImport() {
      return {
        temp: [
          '楼宇编号',
          '楼宇名称',
          '楼宇类别',
          '所属校区',
          '楼宇地址',
          '总共层数',
          '建成年月',
          '总建筑面积',
          '总使用面积',
          '占地面积',
          '权属证号',
          '设计使用年限',
          '备注'
        ],
        tempName: '楼宇信息导入模板',
        implName: 'veStuInsuranceRecordServiceImpl.importExcel'
      };
    },
    initData() {
      const sub = {
        conditions: [
          /* { operator: 'eq', column: 'status', value: 1 } */
        ]
      };
      veSbzcJzwBuildcateApi.all(sub).then(res => {
        this.categoryNodes = res.result;
      });
    },
    refreshBack() {
      this.$refs.eduTree.setValue([]);
    },
    /**
     * @msg: 表格获取请求数据 必须return 一个对象
     */
    getParams() {
      const params = this.$refs['cwQuery'].getQueryData();
      const tres = this.$refs.eduTree.getValue();
      if (tres && tres.length > 0) {
        this.$utils.addPageConditions(params, 'd.build_cate_id', 'eq', tres[0]);
      }

      return params;
    },
    /**
     * @msg: 搜索事件
     */
    handleFilter() {
      this.$refs.veSbzcJzwInfoTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veSbzcJzwInfoEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veSbzcJzwInfoEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veSbzcJzwInfoShow.doShow(row);
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
      this.$refs.veSbzcJzwInfoTable.reload();
    }
  }
};
</script>
<style lang="less" scoped></style>
