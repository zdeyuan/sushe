<template>
  <div class="edit_form">
        <!-- 编辑页 -->
        <edu-form
          title="毕业审核信息详情"
          :isShowBtnSure="false"
          @cancel="handelCancel"
        >
          <a-form-model
            ref="veStuGraduationAuditInfoDataForm"
            labelAlign="right"
          >
                             <a-form-model-item label="学生Id" >
                        {{veStuGraduationAuditInfoVo.stuId}}
                </a-form-model-item>
                            <a-form-model-item label="审核类型(BZR=>班主任，CJ=>成绩（学分），CW=>财务，XSC=>学生处)" >
                        {{veStuGraduationAuditInfoVo.auditType}}
                </a-form-model-item>
                            <a-form-model-item label="审核状态(0不通过，1通过，-1待审核）" >
                        {{veStuGraduationAuditInfoVo.auditStatus}}
                </a-form-model-item>
                            <a-form-model-item label="备注/班主任评语" >
                        {{veStuGraduationAuditInfoVo.remark}}
                </a-form-model-item>
                            <a-form-model-item label="创建人ID" >
                        {{veStuGraduationAuditInfoVo.createuserid}}
                </a-form-model-item>
                            <a-form-model-item label="终端ID" >
                        {{veStuGraduationAuditInfoVo.terminalid}}
                </a-form-model-item>
                      </a-form-model>
        </edu-form>
  </div>
</template>

<script>
import veStuGraduationAuditInfoApi from "@/views/stuManage/biye/api/veStuGraduationAuditInfoApi";

export default {
  components: { },
  data() {
    const data = {
      veStuGraduationAuditInfoVo: {},
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veStuGraduationAuditInfoVo =Object.assign({}, row)
  //    veStuGraduationAuditInfoApi.get(row.id).then((res) => {
    //      this.veStuGraduationAuditInfoVo = res.result
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
<style lang="less" scoped>

</style>