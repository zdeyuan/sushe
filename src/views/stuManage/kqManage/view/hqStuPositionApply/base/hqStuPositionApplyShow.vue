<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-04-13 22:51:20
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-04-18 11:55:27
-->
<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="学生职位申请详情" :isShowBtnSure="false" @cancel="handelCancel">
      <a-form-model ref="hqStuPositionApplyDataForm" labelAlign="right">
        <a-form-model-item label="学生">
          {{ hqStuPositionApplyVo.xm }}
        </a-form-model-item>
        <a-form-model-item label="职位">
          {{ hqStuPositionApplyVo.positionName }}
        </a-form-model-item>
		<a-form-model-item label="申请时间">
		  {{ hqStuPositionApplyVo.applyTime }}
		</a-form-model-item>
        <a-form-model-item label="申请说明">
          {{ hqStuPositionApplyVo.content }}
        </a-form-model-item>
		<a-form-model-item label="审核状态"> 
		  {{ hqStuPositionApplyVo.status==1?'审核通过':hqStuPositionApplyVo.status==0?'待审核':'不通过 '}}
		</a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import hqStuPositionApplyApi from '../../../api/hqStuPositionApplyApi';

export default {
  components: {},
  data() {
    const data = {
      hqStuPositionApplyVo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.hqStuPositionApplyVo = Object.assign({}, row);
      //    hqStuPositionApplyApi.get(row.id).then((res) => {
      //      this.hqStuPositionApplyVo = res.result
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
