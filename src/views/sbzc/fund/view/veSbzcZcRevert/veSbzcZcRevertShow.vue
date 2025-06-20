<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="设备资产归还详情" :isShowBtnSure="false" @cancel="handelCancel">
      <a-form-model ref="veSbzcZcRevertDataForm" labelAlign="right">
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="资产编号">
              {{ veSbzcZcRevertVo.assetCode }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="资产名称">
              {{ veSbzcZcRevertVo.assetName }}
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-form-model-item label="所属部门">
          {{ veSbzcZcRevertVo.deptOwn }}
        </a-form-model-item>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="归还人姓名">
              {{ veSbzcZcRevertVo.revertUserName }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="批准人姓名">
              {{ veSbzcZcRevertVo.checkUserName }}
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-form-model-item label="归还时间">
          {{ veSbzcZcRevertVo.revertTime }}
        </a-form-model-item>
        <a-form-model-item label="备注">
          {{ veSbzcZcRevertVo.remark }}
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veSbzcZcRevertApi from '@/views/sbzc/fund/api/veSbzcZcRevertApi';

export default {
  components: {},
  data() {
    const data = {
      veSbzcZcRevertVo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veSbzcZcRevertVo = Object.assign({}, row);
      //    veSbzcZcRevertApi.get(row.id).then((res) => {
      //      this.veSbzcZcRevertVo = res.result
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
