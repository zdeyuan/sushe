<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-03-08 16:54:07
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-03-13 10:49:38
-->
<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="场地借用详情" :isShowBtnSure="false" @cancel="handelCancel">
      <a-form-model ref="veSbzcCdApplyDataForm" labelAlign="right">
        <a-row>
          <a-col :span="12">
            <a-form-model-item class="ytop" label="场地名称">
              {{ veSbzcCdApplyVo.cdName }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item class="ytop" label="所属部门">
              {{ veSbzcCdApplyVo.applyDeptName }}
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="接收人">
              {{ veSbzcCdApplyVo.applyUserName }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="批准人">
              {{ veSbzcCdApplyVo.checkUserName }}
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="申请时间">
              {{ veSbzcCdApplyVo.applyTime }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="预计归还时间">
              {{ veSbzcCdApplyVo.expecteReturnTime }}
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-form-model-item label="备注">
          {{ veSbzcCdApplyVo.remark }}
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veSbzcCdApplyApi from '@/views/sbzc/place/api/veSbzcCdApplyApi';

export default {
  components: {},
  data() {
    const data = {
      veSbzcCdApplyVo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veSbzcCdApplyVo = Object.assign({}, row);
      //    veSbzcCdApplyApi.get(row.id).then((res) => {
      //      this.veSbzcCdApplyVo = res.result
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
