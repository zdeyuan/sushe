<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-18 17:04:42
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-02-18 17:23:16
-->
<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="会议纪要详情" :isShowBtnSure="false" @cancel="handelCancel">
      <a-form-model ref="veJkyMeetSummaryDataForm" :rules="veJkyMeetSummaryRules" :model="veJkyMeetSummaryVo" labelAlign="right" class="inline-form">
        <a-form-model-item label="会议" prop="title">
          {{ meetPo.title }}
        </a-form-model-item>
        <a-form-model-item label="纪要标题" prop="title">
          {{ veJkyMeetSummaryVo.title }}
        </a-form-model-item>
        <a-form-model-item label="纪要内容" prop="content">
          {{ veJkyMeetSummaryVo.content }}
        </a-form-model-item>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="纪要内容" prop="content">
              {{ veJkyMeetSummaryVo.createName }}
            </a-form-model-item>
          </a-col>

          <a-col :span="12">
            <a-form-model-item label="创建时间" prop="content">
              {{ veJkyMeetSummaryVo.createTime }}
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
      <uploadFiles ref="uploadFiles" edit serviceType="summary" />
    </edu-form>
  </div>
</template>

<script>
import veJkyMeetSummaryApi from '@/api/research/rwork/veJkyMeetSummaryApi';
import uploadFiles from '@/components/kqManageComponent/uploadFiles';
export default {
  components: { uploadFiles },
  data() {
    const data = {
      veJkyMeetSummaryVo: this.resetveJkyMeetSummaryVo(),
      dialogStatus: 'create',
      veJkyMeetSummaryRules: {},
      meetPo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveJkyMeetSummaryVo() {
      return {
        meetId: '', // 会议id
        content: '', // 纪要内容
        createUid: '', // 创建用户
        fileId: '', // 纪要附件id
        title: '' // 主题
      };
    },
    /**
     * @msg: 初始化修改
     */
    doShow(meetPo, row) {
      this.meetPo = meetPo;
      veJkyMeetSummaryApi.get(row.id).then(res => {
        this.veJkyMeetSummaryVo = res.result;
        this.$refs.uploadFiles.setValue(res.result.id);
      });
      this.viewType = 'update';
      this.$nextTick(() => {
        this.$refs.veJkyMeetSummaryDataForm.clearValidate();
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
<style lang="less" scoped></style>
