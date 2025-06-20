<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-03-05 14:40:41
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-03-05 14:47:12
-->
<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="医疗信息详情" :isShowBtnSure="false" @cancel="handelCancel">
      <a-form-model ref="veHqYiliaoDataForm" labelAlign="right">
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="患者姓名" class="ytop" prop="patient">
              {{ veHqYiliaoVo.patient }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="医疗时间" class="ytop" prop="ylTime">
              {{ veHqYiliaoVo.ylTime }}
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-form-model-item label="医疗原因" prop="ylyy">
          {{ veHqYiliaoVo.ylyy }}
        </a-form-model-item>
        <a-form-model-item label="医疗人员" prop="hqUserId">
          {{ veHqYiliaoVo.userName }}
        </a-form-model-item>
        <a-form-model-item label="是否校外治疗" prop="sfxw">
          <edu-dict-text code="shifou" :value="veHqYiliaoVo.sfxw"></edu-dict-text>
        </a-form-model-item>
        <a-form-model-item label="医疗地址" prop="address">
          {{ veHqYiliaoVo.address }}
        </a-form-model-item>
        <a-form-model-item label="备注" prop="remark">
          {{ veHqYiliaoVo.remark }}
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veHqYiliaoApi from '@/views/logistics/base/api/veHqYiliaoApi';

export default {
  components: {},
  data() {
    const data = {
      veHqYiliaoVo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      this.veHqYiliaoVo = Object.assign({}, row);
      this.viewType = 'update';
      this.$nextTick(() => {
        this.$refs.veHqYiliaoDataForm.clearValidate();
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
