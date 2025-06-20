<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="资产采购详情" :isShowBtnSure="false" @cancel="handelCancel">
      <a-form-model ref="veSbzcZcPurchaseDataForm" labelAlign="right">
        <a-form-model-item label="资产id">
          {{ veSbzcZcPurchaseVo.assetId }}
        </a-form-model-item>
        <a-form-model-item label="资产编号">
          {{ veSbzcZcPurchaseVo.assetCode }}
        </a-form-model-item>
        <a-form-model-item label="资产名称">
          {{ veSbzcZcPurchaseVo.assetName }}
        </a-form-model-item>
        <a-form-model-item label="采购数量">
          {{ veSbzcZcPurchaseVo.count }}
        </a-form-model-item>
        <a-form-model-item label="所属部门">
          {{ veSbzcZcPurchaseVo.deptOwn }}
        </a-form-model-item>
        <a-form-model-item label="批准人">
          {{ veSbzcZcPurchaseVo.checkUserId }}
        </a-form-model-item>
        <a-form-model-item label="批准人姓名">
          {{ veSbzcZcPurchaseVo.checkUserName }}
        </a-form-model-item>
        <a-form-model-item label="创建时间">
          {{ veSbzcZcPurchaseVo.createTime }}
        </a-form-model-item>
        <a-form-model-item label="备注">
          {{ veSbzcZcPurchaseVo.remark }}
        </a-form-model-item>
        <a-form-model-item label="创建人id">
          {{ veSbzcZcPurchaseVo.createUserId }}
        </a-form-model-item>
        <a-form-model-item label="创建人姓名">
          {{ veSbzcZcPurchaseVo.createUserName }}
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veSbzcZcPurchaseApi from '@/views/sbzc/fund/api/veSbzcZcPurchaseApi';

export default {
  components: {},
  data() {
    const data = {
      veSbzcZcPurchaseVo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veSbzcZcPurchaseVo = Object.assign({}, row);
      //    veSbzcZcPurchaseApi.get(row.id).then((res) => {
      //      this.veSbzcZcPurchaseVo = res.result
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
