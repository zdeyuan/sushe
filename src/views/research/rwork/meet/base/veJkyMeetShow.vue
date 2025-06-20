<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-18 15:34:21
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-02-27 18:48:49
-->
<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="会议详情" :isShowBtnSure="false" @cancel="handelCancel">
      <a-form-model ref="veJkyMeetDataForm" :rules="veJkyMeetRules" :model="veJkyMeetVo" class="mini-form-item inline-form2" labelAlign="right">
        <div class="detail_title">会议信息</div>
        <a-form-model-item label="会议主题" class="need-top" prop="title">
          {{ veJkyMeetVo.title }}
        </a-form-model-item>
        <a-form-model-item label="会议参与教研人员" prop="userIds">
          {{ veJkyMeetVo.userNames }}
        </a-form-model-item>
        <a-form-model-item label="会议参与其他人员" prop="otherUser">
          {{ veJkyMeetVo.otherUser }}
        </a-form-model-item>
        <a-form-model-item label="会议内容" prop="content">
          {{ veJkyMeetVo.content }}
        </a-form-model-item>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="会议场地" prop="placeId">
              {{ veJkyMeetVo.placeName }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="联系人" prop="contactMan">
              {{ veJkyMeetVo.contactMan }}
            </a-form-model-item>
          </a-col> </a-row
        ><a-row>
          <a-col :span="12">
            <a-form-model-item label="联系电话" prop="mobile">
              {{ veJkyMeetVo.mobile }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="联系邮箱" prop="email">
              {{ veJkyMeetVo.email }}
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-form-model-item label="会议时间" prop="startTime"> {{ veJkyMeetVo.startTime }} - {{ veJkyMeetVo.endTime }} </a-form-model-item>
      </a-form-model>
      <template v-if="dialogStatus == 'shen'">
        <div class="card_content">
          <div class="decision" style="padding:15px 0" align="right">
            <a-button type="primary" style="margin-right:15px" @click="audit(1)">审核通过 </a-button>
            <a-button type="danger" @click="audit(2)">
              不通过
            </a-button>
          </div>
        </div>
      </template>
    </edu-form>
  </div>
</template>

<script>
import veJkyMeetApi from '@/api/research/rwork/veJkyMeetApi';

export default {
  props: {
    placeNodes: {
      type: Array
    }
  },
  data() {
    const data = {
      veJkyMeetVo: {},
      dialogStatus: 'show',
      veJkyMeetRules: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row, dialogStatus) {
      this.dialogStatus = dialogStatus;
      veJkyMeetApi.get(row.id).then(res => {
        this.veJkyMeetVo = res.result;
      });
    },
    /**
     * @msg: 编辑页取消
     */
    handelCancel() {
      this.$emit('onCancel');
    },
    /**
     * @msg: 调用Api创建数据
     */
    audit(status) {
      veJkyMeetApi.audit(this.veJkyMeetVo.id, status).then(res => {
        this.$notification.success({
          message: '审核' + status == 1 ? '通过' : '不通过',
          description: '审核了一条数据'
        });
        this.$emit('onOk');
      });
    }
  }
};
</script>
<style lang="less" scoped></style>
