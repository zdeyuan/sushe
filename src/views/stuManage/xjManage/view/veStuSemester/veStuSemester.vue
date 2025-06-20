<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div>
        <edu-query ref="cwQuery" ext="boxZybmbj" code="veStuSemester" :do-filter="handleFilter">
          <template slot="search">
            <edu-query-item title="学期"  pname="a.id" pop="eq">
              <termList ref="termList" width="150px" v-model="veStuSemesterQuery.xqh" @change="handleFilter"></termList>
            </edu-query-item>
            <edu-query-item title="学号" pname="xh" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="姓名" pname="xm" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="身份证号" pname="zfzh" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="学生状态" pname="xsdqztm" pop="like" stype="select" code="stuStatye"> </edu-query-item>
          </template>
        </edu-query>
        <edu-table
          ref="veStuSemesterTable"
          code="veStuSemester"
          :api="veStuSemesterTable.api"
          :get-params="getParams"
          rowKey="sid"
          :config="{
            open: false,
            close: false,
            status: false,
            delete: false
          }"
          :sorts="[
            {
              column: 's.xh',
              asc: false
            }
          ]"
          isAutoBtn
        >
          <template slot="top_bef_btn">
            <edu-pms :code="'v-add'" type="primary" ext="success" iconfont="check-circle" name="批量注册" @click="addS('all', 1)"></edu-pms>
            <edu-pms :code="'veJn-add'" type="primary" ext="delete" iconfont="stop" name="批量取消注册" @click="cancelS('all', 0)"></edu-pms>
          </template>
          <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
          <a-table-column title="学号" dataIndex="xh" width="150px"> </a-table-column>
          <a-table-column title="姓名" dataIndex="xm" width="150px"> </a-table-column>
          <a-table-column title="学期" dataIndex="xqmc" width="150px"> </a-table-column>
          <a-table-column title="注册状态" dataIndex="status" width="150px">
            <template slot-scope="text">
              <span v-if="text == 1" class="status1">已注册</span>
              <span v-else class="status2">未注册</span>
            </template>
          </a-table-column>
          <a-table-column title="专业部" dataIndex="falText" width="150px"> </a-table-column>
          <a-table-column title="专业" dataIndex="specText" width="150px"> </a-table-column>
          <a-table-column title="班级" dataIndex="bjText" width="150px"> </a-table-column>
        </edu-table>
      </div>
      <!-- 编辑页 -->
      <veStuSemesterEdit v-if="showType == 'edit'" ref="veStuSemesterEdit" @onOk="editOk" @onCancel="editCancel"> </veStuSemesterEdit>
      <veStuSemesterShow v-if="showType == 'show'" ref="veStuSemesterShow" @onOk="editOk" @onCancel="editCancel"> </veStuSemesterShow>
    </div>
  </edu-layout>
</template>

<script>
import veStuSemesterApi from '@/views/stuManage/xjManage/api/veStuSemesterApi';
import veStuSemesterEdit from './veStuSemesterEdit';
import veStuSemesterShow from './veStuSemesterShow';
import termList from '@/components/termList';
export default {
  components: {
    veStuSemesterEdit,
    veStuSemesterShow,
    termList
  },
  data() {
    const data = {
      veStuSemesterQuery: {
        xqh: ''
      },
      showType: 'table'
    };
    data.veStuSemesterTable = {
      api: veStuSemesterApi
    };
    return data;
  },
  mounted() {},
  methods: {
    addS(id, status) {
      const sub = [];
      const datas = this.$refs.veStuSemesterTable.getSelectRow('sid');
      if (!datas || datas.length == 0) {
        this.$message.error('请选择一项');
        return;
      }

      for (let i = 0; i < datas.length; i++) {
        const element = datas[i];
        if (element.id && element.status == 1) {
          this.$message.error('请选择未注册的数据');
          return;
        }
        const datss = {
          semesterId: element.semesterId,
          stuId: element.stuId,
          status: 1
        };
        if (element.id) {
          datss.id = element.id;
        }
        sub.push(datss);
      }
      veStuSemesterApi.add(sub).then(res => {
        this.$notification.success({
          message: '注册成功',
          description: `成功注册[${sub.length}]条数据`
        });
        this.$refs.veStuSemesterTable.reload();
      });
    },
    cancelS(id, status) {
      const sub = [];
      const datas = this.$refs.veStuSemesterTable.getSelectRow('sid');
      if (!datas || datas.length == 0) {
        this.$message.error('请选择一项');
        return;
      }

      for (let i = 0; i < datas.length; i++) {
        const element = datas[i];
        if (element.id && element.status == 1) {
          sub.push(element.id);
        } else {
          this.$message.error('请选择已注册的数据');
          return;
        }
      }
      veStuSemesterApi
        .updateStatus({
          ids: sub
        })
        .then(res => {
          this.$notification.success({
            message: '注册成功',
            description: `成功注册[${sub.length}]条数据`
          });
          this.$refs.veStuSemesterTable.reload();
        });
    },
    /**
     * @msg: 表格获取请求数据 必须return 一个对象
     */
    getParams() {
      const params = this.$refs['cwQuery'].getQueryData({ base: true });
      return params;
    },
    /**
     * @msg: 搜索事件
     */
    handleFilter() {
      this.$refs.veStuSemesterTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuSemesterEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuSemesterEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veStuSemesterShow.doShow(row);
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
      this.$refs.veStuSemesterTable.reload();
    }
  }
};
</script>
<style lang="less" scoped>
.status1 {
  color: #039471;
}
.status2 {
  color: rgb(212, 117, 117);
}
</style>
