<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-03-05 20:25:07
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-03-05 20:30:13
-->
<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="餐厅名称" :isShowBtnSure="false" @cancel="handelCancel">
      <a-form-model ref="veHqCantingDataForm" labelAlign="right">
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="餐厅名称" class="ytop" prop="name">
              {{ veHqCantingVo.name }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="餐厅位置" class="ytop" prop="ctwz">
              {{ veHqCantingVo.ctwz }}
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="餐厅楼层" prop="ctlc">
              {{ veHqCantingVo.ctlc }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="开放窗口数" prop="kfcks">
              {{ veHqCantingVo.kfcks }}
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="容纳人数" prop="rnrs">
              {{ veHqCantingVo.rnrs }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="建设时间" prop="jsTime">
              {{ veHqCantingVo.jsTime }}
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-form-model-item label="负责人" prop="fzrId">
          {{ veHqCantingVo.fzrName }}
        </a-form-model-item>

        <a-form-model-item label="餐厅状态" prop="ctzt">
          <edu-dict-text code="status" :value="veHqCantingVo.status"></edu-dict-text>
        </a-form-model-item>
        <a-form-model-item label="备注说明" prop="remark">
          {{ veHqCantingVo.remark }}
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veHqCantingApi from '@/views/logistics/ct/api/veHqCantingApi';

export default {
  data() {
    const data = {
      veHqCantingVo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veHqCantingApi.get(row.id).then(res => {
        this.veHqCantingVo = res.result;
      });
      this.viewType = 'update';
      this.$nextTick(() => {
        this.$refs.userSelectBox.setObj([{ id: row.fzrId, name: row.fzrName }]);
        this.$refs.veHqCantingDataForm.clearValidate();
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
