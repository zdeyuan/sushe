<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-03-08 16:54:07
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-03-13 11:01:36
-->
<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="场地归还详情" :isShowBtnSure="false" @cancel="handelCancel">
      <a-form-model ref="veSbzcCdRevertDataForm" labelAlign="right">
        <a-row>
          <a-col :span="12">
            <a-form-model-item class="ytop" label="场地名称">
              {{ veSbzcCdRevertVo.cdName }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item class="ytop" label="所属部门">
              {{ veSbzcCdRevertVo.applyDeptName }}
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="归还人">
              {{ veSbzcCdRevertVo.revertUserName }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="批准人">
              {{ veSbzcCdRevertVo.checkUserName }}
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-form-model-item label="归还时间">
          {{ veSbzcCdRevertVo.revertTime }}
        </a-form-model-item>
        <a-form-model-item label="备注">
          {{ veSbzcCdRevertVo.remark }}
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veSbzcCdRevertApi from '@/views/sbzc/place/api/veSbzcCdRevertApi';

export default {
  components: {},
  data() {
    const data = {
      veSbzcCdRevertVo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veSbzcCdRevertVo = Object.assign({}, row);
      //    veSbzcCdRevertApi.get(row.id).then((res) => {
      //      this.veSbzcCdRevertVo = res.result
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
