<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="设备资产维修详情" :isShowBtnSure="false" @cancel="handelCancel">
      <a-form-model ref="veSbzcZcMaintainDataForm" labelAlign="right">
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="资产名称">
              {{ veSbzcZcMaintainVo.assetName }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="资产编号">
              {{ veSbzcZcMaintainVo.assetCode }}
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="所属部门">
              {{ veSbzcZcMaintainVo.deptOwn }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="维修部门">
              {{ veSbzcZcMaintainVo.deptMaintain }}
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="维修人">
              {{ veSbzcZcMaintainVo.maintainUserName }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="批准人">
              {{ veSbzcZcMaintainVo.checkUserName }}
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-form-model-item label="维修时间">
          {{ veSbzcZcMaintainVo.maintainDate }}
        </a-form-model-item>
        <a-form-model-item label="备注">
          {{ veSbzcZcMaintainVo.remark }}
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veSbzcZcMaintainApi from '@/views/sbzc/fund/api/veSbzcZcMaintainApi';

export default {
  components: {},
  data() {
    const data = {
      veSbzcZcMaintainVo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veSbzcZcMaintainVo = Object.assign({}, row);
      //    veSbzcZcMaintainApi.get(row.id).then((res) => {
      //      this.veSbzcZcMaintainVo = res.result
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
