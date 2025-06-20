<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-20 14:15:37
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-02-20 19:46:21
-->
<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="项目计划详情" @cancel="handelCancel" :isShowBtnSure="false">
      <a-form-model ref="veJkyProjectPlanDataForm" labelAlign="right" width="40%" :labelCol="{ span: 4 }" :wrapperCol="{ span: 16 }">
        <a-form-model-item label="项目编号" prop="projectId">
          {{ veJkyProjectPlanVo.projectSerial }}
        </a-form-model-item>
        <a-form-model-item label="项目名称" prop="projectId">
          {{ veJkyProjectPlanVo.projectName }}
        </a-form-model-item>
        <a-form-model-item label="项目计划名称" prop="title">
          {{ veJkyProjectPlanVo.title }}
        </a-form-model-item>
        <a-form-model-item label="内容" prop="remark">
          {{ veJkyProjectPlanVo.remark }}
        </a-form-model-item>
        <a-form-model-item label="发布人" prop="remark">
          {{ veJkyProjectPlanVo.createName }}
        </a-form-model-item>
        <a-form-model-item label="发布时间" prop="remark">
          {{ veJkyProjectPlanVo.createTime }}
        </a-form-model-item>
      </a-form-model>
      <uploadFiles ref="uploadFiles" serviceType="projectPlan" edit />
    </edu-form>
  </div>
</template>

<script>
import veJkyProjectPlanApi from '@/api/research/rproject/veJkyProjectPlanApi';
import uploadFiles from '@/components/kqManageComponent/uploadFiles';
export default {
  components: { uploadFiles },
  data() {
    const data = {
      veJkyProjectPlanVo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veJkyProjectPlanVo = Object.assign({}, row);
      this.$refs.uploadFiles.setValue(row.id);
      /*   veJkyProjectPlanApi.get(row.id).then(res => {
        this.veJkyProjectPlanVo = res.result;
        this.$refs.uploadFiles.setValue(res.result.id);
      }); */
      this.$nextTick(() => {
        this.$refs.veJkyProjectPlanDataForm.clearValidate();
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
