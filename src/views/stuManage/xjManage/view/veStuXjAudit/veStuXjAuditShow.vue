<template>
  <div class="edit_form">
        <!-- 编辑页 -->
        <edu-form
          title="学生学籍审核详情"
          :isShowBtnSure="false"
          @cancel="handelCancel"
        >
          <a-form-model
            ref="veStuXjAuditDataForm"
            labelAlign="right"
          >
               <a-form-model-item label="学生" >
                        {{veStuXjAuditVo.stuName}}
                </a-form-model-item>
                            <a-form-model-item label="学生学籍信息" >
                        {{veStuXjAuditVo.info}}
                </a-form-model-item>
                            <a-form-model-item label="审核状态" >
                        {{veStuXjAuditVo.auditStatus}}
                </a-form-model-item>
                      </a-form-model>
        </edu-form>
  </div>
</template>

<script>
import veStuXjAuditApi from "@/views/stuManage/xjManage/api/veStuXjAuditApi";

export default {
  components: { },
  data() {
    const data = {
      veStuXjAuditVo: {},
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veStuXjAuditVo =Object.assign({}, row)
  //    veStuXjAuditApi.get(row.id).then((res) => {
    //      this.veStuXjAuditVo = res.result
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