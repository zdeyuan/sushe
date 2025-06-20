<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-03-06 20:41:09
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-03-28 19:27:14
-->
<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form :title="viewName + '详情'" :isShowBtnSure="false" @cancel="handelCancel">
      <a-form-model ref="veHqChurukuDataForm" labelAlign="right">
        <a-row>
          <a-col :span="12">
            <a-form-model-item :label="viewType == '6' ? '调出仓库名称' : '仓库名称'" class="ytop" prop="ckId">
              {{ veHqChurukuVo.ckName }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="物品名称" class="ytop" prop="number">
              {{ veHqChurukuVo.wpName }}
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-form-model-item label="二维码" v-if="viewType == '2' || viewType == '3'" prop="remark">
          <div id="qrCode" ref="qrCodeDiv"></div>
        </a-form-model-item>

        <a-form-model-item v-if="viewType == '6'" label="调入仓库名称" prop="number">
          {{ veHqChurukuVo.glName }}
        </a-form-model-item>

        <a-form-model-item :label="viewName + '数量'" prop="number">
          {{ veHqChurukuVo.number }}
        </a-form-model-item>
        <a-form-model-item :label="viewName + '时间'" prop="crTime">
          {{ veHqChurukuVo.crTime }}
        </a-form-model-item>
        <a-form-model-item :label="viewName + '申请人'" prop="applyUser">
          {{ veHqChurukuVo.applyUserName }}
        </a-form-model-item>
        <a-form-model-item label="经手人" prop="jsUser">
          {{ veHqChurukuVo.jbUserName }}
        </a-form-model-item>
        <a-form-model-item label="批准人" prop="pjUser">
          {{ veHqChurukuVo.pjUserName }}
        </a-form-model-item>
        <a-form-model-item label="备注" prop="remark">
          {{ veHqChurukuVo.remark }}
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veHqChurukuApi from '@/views/logistics/good/api/veHqChurukuApi';
import QRCode from 'qrcodejs2';

export default {
  props: {
    viewType: {
      type: String
    },
    viewName: {
      type: String
    }
  },
  components: {},
  data() {
    const data = {
      veHqChurukuVo: {},
      rukuName: '数量'
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      this.veHqChurukuVo = Object.assign({}, row);

      const url = `${process.env.VUE_APP_API_BASE_URL}/logistics/#/detail?id=${row.id}`;
      new QRCode(this.$refs.qrCodeDiv, {
        text: url,
        width: 200,
        height: 200,
        colorDark: '#333333', //二维码颜色
        colorLight: '#ffffff', //二维码背景色
        correctLevel: QRCode.CorrectLevel.L //容错率，L/M/H
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
