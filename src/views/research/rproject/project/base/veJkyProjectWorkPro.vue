<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-16 22:29:29
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-02-20 21:40:51
-->
<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form
      :title="projectVo.name + '-工作进度管理'"
      class="mini-form-item inline-form"
      size="big"
      @ok="handelOk"
      :isShowBtnSure="workList.length > 0"
      sureText="修改工作进度"
      @cancel="handelCancel"
      width="65%"
    >
      <div class="no-data" v-if="workList.length == 0">
        暂无工作
      </div>
      <div class="work_list">
        <div v-for="(item, index) in workList" :key="item.id" class="work_box">
          <div class="detail_title">工作{{ index + 1 }} : {{ item.title }}</div>
          <a-row>
            <a-col :span="24">
              <div class="work-info">
                <label>工作人员</label>
                <span>{{ item.userNames }}</span>
              </div>
            </a-col>
            <a-col :span="12">
              <div class="work-info">
                <label>开始时间</label>
                <span>{{ item.startTime }}</span>
              </div>
            </a-col>
            <a-col :span="12">
              <div class="work-info">
                <label>结束时间</label>
                <span>{{ item.endTime }}</span>
              </div>
            </a-col>

            <a-col :span="24">
              <div class="work-info">
                <label>工作经度</label>
                <div class="progress_div"> <a-slider :marks="marks" v-model="item.progress" :min="0" :max="100"/></div>
                <div class="tip_msg">修改为100%将完成项目</div>
              </div>
            </a-col>
          </a-row>
        </div>
      </div>
    </edu-form>
  </div>
</template>

<script>
import veJkyProjectWorkApi from '@/api/research/rproject/veJkyProjectWorkApi';

export default {
  components: {},
  props: {},
  data() {
    const data = {
      veJkyProjectWorkQuery: {},
      showType: 'table',
      marks: {
        0: '0%',
        50: '50%',
        100: '100%'
      }
    };
    data.veJkyProjectWorkTable = {
      api: veJkyProjectWorkApi
    };
    data.projectVo = {};
    data.workList = [];
    return data;
  },
  mounted() {},
  methods: {
    handleFilter() {
      const sub = {
        size: 1000,
        current: 1,
        conditions: [{ operator: 'eq', column: 'd.project_id', value: this.projectVo.id }],
        sorts: [{ column: 'd.id', asc: false }]
      };
      veJkyProjectWorkApi.page(sub).then(res => {
        this.workList = res.result.records;
      });
    },
    doShow(projectVo) {
      this.projectVo = projectVo;
      this.handleFilter();
    },
    handelOk() {
      const subs = this.workList.map(item => {
        return { id: item.id, progress: item.progress };
      });
      veJkyProjectWorkApi.updateProgress(subs).then(res => {
        this.$notification.success({
          message: '数据修改成功',
          description: '修改进度成功'
        });
        this.$emit('onOk');
      });
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
.work_list {
  .work_box {
    .work-info {
      padding: 8px 0;
      label {
        display: inline-block;
        width: 200px;
        text-align: right;
        padding-right: 15px;
        color: #888;
      }
      span {
        color: #000;
      }
    }
  }
}
.progress_div {
  padding: 15px 15%;
}
.tip_msg {
  text-align: center;
  color: red;
  font-size: 12px;
}
</style>
