<template>
  <div class="edit_form">
        <!-- 编辑页 -->
        <edu-form
          title="毕业审核设置表详情"
          :isShowBtnSure="false"
          @cancel="handelCancel"
        >
          <a-form-model
            ref="veStuGraduationAuditConfigDataForm"
            labelAlign="right"
          >
                             <a-form-model-item label="是否需要班主任审核" >
                        {{veStuGraduationAuditConfigVo.bzr}}
                </a-form-model-item>
                            <a-form-model-item label="是否需要成绩审核" >
                        {{veStuGraduationAuditConfigVo.cj}}
                </a-form-model-item>
                            <a-form-model-item label="是否需要财务审核" >
                        {{veStuGraduationAuditConfigVo.cw}}
                </a-form-model-item>
                            <a-form-model-item label="是否需要学生处审核" >
                        {{veStuGraduationAuditConfigVo.xsc}}
                </a-form-model-item>
                      </a-form-model>
        </edu-form>
  </div>
</template>

<script>
import veStuGraduationAuditConfigApi from "@/views/stuManage/biye/api/veStuGraduationAuditConfigApi";

export default {
  components: { },
  data() {
    const data = {
      veStuGraduationAuditConfigVo: {},
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veStuGraduationAuditConfigVo =Object.assign({}, row)
  //    veStuGraduationAuditConfigApi.get(row.id).then((res) => {
    //      this.veStuGraduationAuditConfigVo = res.result
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