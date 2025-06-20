<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-04-22 23:07:07
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-04-24 21:37:07
-->
<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="学生预约表详情" :isShowBtnSure="false" @cancel="handelCancel">
      <a-form-model ref="veStuReservationDataForm" labelAlign="right">
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="社团">
              {{ veStuReservationVo.shetName }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="场地名称">
              {{ veStuReservationVo.cdName }}
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="12">
            <a-form-model-item label="限制人数">
              {{ veStuReservationVo.limitNum }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="申请时间">
              {{ veStuReservationVo.statusTime }}
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="开始时间">
              {{ veStuReservationVo.statusTime }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="结束时间">
              {{ veStuReservationVo.endTime }}
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-form-model-item label="预约说明">
          {{ veStuReservationVo.yyRemark }}
        </a-form-model-item>

        <a-form-model-item label="审核人">
          {{ veStuReservationVo.authPersonName }}
        </a-form-model-item>
        <a-form-model-item label="审核状态">
          <edu-dict-text code="shetAuditStatus" :value="veStuReservationVo.authStatus"></edu-dict-text>
        </a-form-model-item>
        <a-form-model-item label="不通过原因" v-if="veStuReservationVo.auditReason">
          {{ veStuReservationVo.auditReason }}
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veStuReservationApi from '@/views/stuManage/shet/api/veStuReservationApi';

export default {
  components: {},
  data() {
    const data = {
      veStuReservationVo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veStuReservationVo = Object.assign({}, row);
      //    veStuReservationApi.get(row.id).then((res) => {
      //      this.veStuReservationVo = res.result
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
