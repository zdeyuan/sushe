<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-18 16:20:18
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-02-18 22:50:24
-->
<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form :title="'会议 [' + meetPo.title + '] - 考勤情况'" @cancel="handelCancel" :isShowBtn="false">
      <edu-table
        ref="veJkyMeetUserTable"
        code="veJkyMeetUser"
        :api="veJkyMeetUserTable.api"
        :get-params="getParams"
        :config="{
          pageFn: 'findMeetUsers',
          open: false,
          close: false,
          bdelete: false,
          status: false,
          pagination: false
        }"
        isAutoBtn
        :init="false"
      >
        <template slot="top_bef_btn">
          <edu-pms :code="'v-add'" type="primary" ext="success" iconfont="check-circle" name="正常考勤" @click="updateStatus('all', 1)"></edu-pms>
          <edu-pms :code="'veJn-add'" type="primary" ext="delete" iconfont="stop" name="正常迟到" @click="updateStatus('all', 2)"></edu-pms>
          <edu-pms :code="'v-add'" type="primary" ext="delete" iconfont="stop" name="未到迟到" @click="updateStatus('all', 3)"></edu-pms>
        </template>

        <a-table-column title="姓名" dataIndex="userName" width="150px" align="center"> </a-table-column>
        <a-table-column title="考勤状态" dataIndex="signStatus" width="150px" align="center">
          <template slot-scope="signStatus">
            <edu-dict-text code="meetKaoqing" :class="'ffstatus' + signStatus" :value="signStatus"></edu-dict-text>
          </template>
        </a-table-column>
        <a-table-column title="考勤时间" dataIndex="createTime" width="200px" align="center"> </a-table-column>
        <a-table-column title="考勤人" dataIndex="createName" width="150px" align="center"> </a-table-column>
        <a-table-column title="操作" dataIndex="id" width="260px" align="center">
          <template slot-scope="id">
            <edu-pms :code="'ttt'" name="正常" type="primary" size="mini" @click="updateStatus(id, 1)"> </edu-pms>
            <edu-pms :code="'ttt'" name="迟到" type="danger" size="mini" @click="updateStatus(id, 2)"> </edu-pms>
            <edu-pms :code="'ttt'" name="未到" type="danger" size="mini" @click="updateStatus(id, 3)"> </edu-pms>
          </template>
        </a-table-column>
      </edu-table>
      <div style="height:50px"></div>
    </edu-form>
  </div>
</template>

<script>
import veJkyMeetApi from '@/api/research/rwork/veJkyMeetApi';

export default {
  components: {},
  data() {
    const data = {
      meetPo: {},
      userList: [],
      veJkyMeetUserTable: {
        api: veJkyMeetApi
      }
    };
    return data;
  },
  mounted() {},
  methods: {
    updateStatus(id, status) {
      let ssids = [id];
      if (id == 'all') {
        const ids = this.$refs.veJkyMeetUserTable.getSelectRowIds();
        if (!ids || ids.length == 0) {
          this.$message.error('请选择一项');
          return;
        }
        ssids = ids;
      }
      const sub = {
        ids: ssids,
        status: status
      };
      veJkyMeetApi.updateMeetUser(sub).then(res => {
        this.$notification.success({
          message: '考勤成功',
          description: `成功考勤[${ssids.length}]条数据`
        });
        this.$refs.veJkyMeetUserTable.reload();
      });
    },
    /**
     * @msg: 表格获取请求数据 必须return 一个对象
     */
    getParams() {
      const params = { meetId: this.meetPo.id };
      return params;
    },
    /**
     * @msg: 初始化新增
     */
    doShow(meetPo) {
      this.meetPo = meetPo;
      this.$refs.veJkyMeetUserTable.reload();
    },
    /**
     * @msg: 编辑页取消
     */
    handelCancel() {
      this.$emit('onCancel');
    }
  }
};
</script>
<style lang="less" scoped>

</style>
