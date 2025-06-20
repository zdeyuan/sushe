<template>
  <div class="edit_form">
        <!-- 编辑页 -->
        <edu-form
          title="操行评分详情"
          :isShowBtnSure="false"
          @cancel="handelCancel"
        >
          <a-form-model
            ref="veStuEvaluationCaoxingDataForm"
            labelAlign="right"
          >
                             <a-form-model-item label="" >
                        {{veStuEvaluationCaoxingVo.semesterId}}
                </a-form-model-item>
                            <a-form-model-item label="" >
                        {{veStuEvaluationCaoxingVo.stuId}}
                </a-form-model-item>
                            <a-form-model-item label="" >
                        {{veStuEvaluationCaoxingVo.score}}
                </a-form-model-item>
                      </a-form-model>
        </edu-form>
  </div>
</template>

<script>
import veStuEvaluationCaoxingApi from "@/views/stuManage/jis/api/veStuEvaluationCaoxingApi";

export default {
  components: { },
  data() {
    const data = {
      veStuEvaluationCaoxingVo: {},
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veStuEvaluationCaoxingVo =Object.assign({}, row)
  //    veStuEvaluationCaoxingApi.get(row.id).then((res) => {
    //      this.veStuEvaluationCaoxingVo = res.result
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