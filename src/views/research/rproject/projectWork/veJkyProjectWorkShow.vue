<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-20 14:15:43
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-02-20 19:49:52
-->
<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="工作详情" @cancel="handelCancel" :isShowBtnSure="false">
      <a-form-model ref="veJkyProjectWorkDataForm" labelAlign="right" :labelCol="{ span: 4 }" :wrapperCol="{ span: 16 }">
        <a-form-model-item label="项目编号" prop="projectId">
          {{ veJkyProjectWorkVo.projectSerial }}
        </a-form-model-item>
        <a-form-model-item label="项目名称" prop="projectId">
          {{ veJkyProjectWorkVo.projectName }}
        </a-form-model-item>
        <a-form-model-item label="工作名称" prop="title">
          {{ veJkyProjectWorkVo.title }}
        </a-form-model-item>
        <a-form-model-item label="工作进度" prop="title"> {{ veJkyProjectWorkVo.progress }}% </a-form-model-item>
        <a-form-model-item label="工作成员" prop="userIds">
          {{ veJkyProjectWorkVo.userNames }}
        </a-form-model-item>
        <a-form-model-item label="工作开始时间" prop="startTime">
          {{ veJkyProjectWorkVo.startTime }}
        </a-form-model-item>
        <a-form-model-item label="工作结束时间" prop="endTime">
          {{ veJkyProjectWorkVo.endTime }}
        </a-form-model-item>
        <a-form-model-item label="发布人" prop="remark">
          {{ veJkyProjectWorkVo.createName }}
        </a-form-model-item>
        <a-form-model-item label="发布时间" prop="remark">
          {{ veJkyProjectWorkVo.createTime }}
        </a-form-model-item>
      </a-form-model>
      <uploadFiles ref="uploadFiles" edit serviceType="projectWork" />
    </edu-form>
  </div>
</template>

<script>
import veJkyProjectWorkApi from '@/api/research/rproject/veJkyProjectWorkApi';
import uploadFiles from '@/components/kqManageComponent/uploadFiles';

export default {
  components: { uploadFiles },
  data() {
    const data = {
      veJkyProjectWorkVo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veJkyProjectWorkVo = Object.assign({}, row);
      this.$refs.uploadFiles.setValue(row.id);
      /*    veJkyProjectWorkApi.get(row.id).then(res => {
        this.veJkyProjectWorkVo = res.result;
        this.$refs.uploadFiles.setValue(res.result.id);
      }); */
      this.$nextTick(() => {
        this.$refs.veJkyProjectWorkDataForm.clearValidate();
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
