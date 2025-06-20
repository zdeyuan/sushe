<template>
  <div class="edit_form">
        <!-- 编辑页 -->
        <edu-form
          title="学生评价配置表详情"
          :isShowBtnSure="false"
          @cancel="handelCancel"
        >
          <a-form-model
            ref="veStuEvaluationConfigDataForm"
            labelAlign="right"
          >
                             <a-form-model-item label="配置项名称" >
                        {{veStuEvaluationConfigVo.name}}
                </a-form-model-item>
                            <a-form-model-item label="配置项代码" >
                        {{veStuEvaluationConfigVo.code}}
                </a-form-model-item>
                            <a-form-model-item label="排序" >
                        {{veStuEvaluationConfigVo.listSort}}
                </a-form-model-item>
                            <a-form-model-item label="状态（0：禁用，1：启用）" >
                        {{veStuEvaluationConfigVo.status}}
                </a-form-model-item>
                      </a-form-model>
        </edu-form>
  </div>
</template>

<script>
import veStuEvaluationConfigApi from "@/views/stuManage/jis/api/veStuEvaluationConfigApi";

export default {
  components: { },
  data() {
    const data = {
      veStuEvaluationConfigVo: {},
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veStuEvaluationConfigVo =Object.assign({}, row)
  //    veStuEvaluationConfigApi.get(row.id).then((res) => {
    //      this.veStuEvaluationConfigVo = res.result
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