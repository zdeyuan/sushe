<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="教科研工作上报详情" :isShowBtnSure="false" @cancel="handelCancel">
      <a-form-model ref="veJkyReportDataForm" :rules="veJkyReportRules" :model="veJkyReportVo" labelAlign="right">
        <template v-if="veJkyReportVo.type == 1">
          <a-form-model-item label="论文题目" prop="name">
            {{ veJkyReportVo.name }}
          </a-form-model-item>
          <a-form-model-item label="发布平台" prop="pubPt">
            {{ veJkyReportVo.pubPt }}
          </a-form-model-item>
          <a-form-model-item label="平台级别" prop="level">
            {{ veJkyReportVo.level }}
          </a-form-model-item>
          <a-row>
            <a-col :span="12">
              <a-form-model-item label="期刊此号" prop="code">
                {{ veJkyReportVo.code }}
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="发布时间" prop="pubTime">
                {{ veJkyReportVo.pubTime }}
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-model-item label="是否独立撰文" prop="selfType">
                <edu-dict-text code="shifou" :value="veJkyReportVo.selfType"></edu-dict-text>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="是否第一作者" prop="isFrist">
                <edu-dict-text code="shifou" :value="veJkyReportVo.isFrist"></edu-dict-text>
              </a-form-model-item>
            </a-col>
          </a-row>
        </template>
        <template v-if="veJkyReportVo.type == 2">
          <a-form-model-item label="课题名称" prop="name">
            {{ veJkyReportVo.name }}
          </a-form-model-item>
          <a-form-model-item label="课题级别" prop="level">
            {{ veJkyReportVo.level }}
          </a-form-model-item>
          <a-form-model-item label="主持人" prop="hostUser">
            {{ veJkyReportVo.hostUser }}
          </a-form-model-item>
          <a-form-model-item label="课题参与人姓名" prop="joinUser">
            {{ veJkyReportVo.joinUser }}
          </a-form-model-item>

          <a-row>
            <a-col :span="12">
              <a-form-model-item label="是否立项" prop="isProject">
                <edu-dict-text code="shifou" :value="veJkyReportVo.isProject"></edu-dict-text>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="立项时间" prop="projectTime">
                {{ veJkyReportVo.projectTime }}
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-model-item label="是否结题" prop="isOver">
                <edu-dict-text code="shifou" :value="veJkyReportVo.isOver"></edu-dict-text>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="结题时间" prop="overTime">
                {{ veJkyReportVo.overTime }}
              </a-form-model-item>
            </a-col>
          </a-row>

          <a-form-model-item label="组织单位" prop="org">
            {{ veJkyReportVo.org }}
          </a-form-model-item>
        </template>

        <template v-if="veJkyReportVo.type == 3">
          <a-form-model-item label="标题" prop="name">
            {{ veJkyReportVo.name }}
          </a-form-model-item>
          <a-form-model-item label="描述" prop="mark">
            {{ veJkyReportVo.mark }}
          </a-form-model-item>
        </template>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veJkyReportApi from '@/api/research/rpaper/veJkyReportApi';

export default {
  components: {},
  data() {
    const data = {
      veJkyReportVo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veJkyReportVo = Object.assign({}, row);
      //    veJkyReportApi.get(row.id).then((res) => {
      //      this.veJkyReportVo = res.result
      // });
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
<style lang="less" scoped></style>
