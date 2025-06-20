<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="人员信息详情" :isShowBtnSure="false" @cancel="handelCancel">
      <a-form-model ref="veHqUserDataForm" labelAlign="right">
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="工号" prop="number" class="ytop">
              {{ veHqUserVo.number }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="姓名" prop="name" class="ytop">
              {{ veHqUserVo.number }}
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <a-form-model-item label="性别" prop="sex" class="ntop">
              <edu-dict-text code="sex" :value="veHqUserVo.sex"></edu-dict-text>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="身份证号" prop="sfzh">
              {{ veHqUserVo.sfzh }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="出生年月" prop="csny">
              {{ veHqUserVo.csny }}
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="联系电话" prop="phone">
              {{ veHqUserVo.phone }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="人员类型" prop="userType">
              <edu-dict-text code="hqUserType" :value="veHqUserVo.userType"></edu-dict-text>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="上岗时间" prop="sgTime">
              {{ veHqUserVo.sgTime }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="离岗时间" prop="lgTime">
              {{ veHqUserVo.lgTime }}
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <a-form-model-item label="人员状态" class="ntop" prop="rzzt">
              <edu-dict-text code="hqUserStatus" :value="veHqUserVo.rzzt"></edu-dict-text>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-form-model-item label="家庭住址" prop="address">
          {{ veHqUserVo.address }}
        </a-form-model-item>
        <a-form-model-item label="人员备注" prop="remark">
          {{ veHqUserVo.remark }}
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veHqUserApi from '@/views/logistics/base/api/veHqUserApi';

export default {
  components: {},
  data() {
    const data = {
      veHqUserVo: {},
      veHqUserRules: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veHqUserApi.get(row.id).then(res => {
        this.veHqUserVo = res.result;
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
