<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-18 17:25:50
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-02-18 22:16:13
-->
<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="会议通知详情" :isShowBtnSure="false" @cancel="handelCancel">
      <a-form-model ref="veJkyMeetRemindDataForm" labelAlign="right" :labelCol="{ span: 4 }" :wrapperCol="{ span: 16 }">
        <a-form-model-item label="会议" prop="meetId">
          {{ veJkyMeetRemindVo.meetName }}
        </a-form-model-item>
        <a-form-model-item label="通知人员" prop="title">
          {{ veJkyMeetRemindVo.userNames }}
        </a-form-model-item>
        <a-form-model-item label="通知标题" prop="title">
          {{ veJkyMeetRemindVo.title }}
        </a-form-model-item>
        <a-form-model-item label="内容">
          {{ veJkyMeetRemindVo.content }}
        </a-form-model-item>

        <a-form-model-item label="创建时间" prop="createTime">
          {{ veJkyMeetRemindVo.createTime }}
        </a-form-model-item>
        <a-form-model-item label="创建人" prop="createTime">
          {{ veJkyMeetRemindVo.createName }}
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veJkyMeetRemindApi from '@/api/research/rwork/veJkyMeetRemindApi';

export default {
  components: {},
  data() {
    const data = {
      veJkyMeetRemindVo: {},
      veJkyMeetRemindRules: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      this.veJkyMeetRemindVo = Object.assign({}, row);
      this.$nextTick(() => {});
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
