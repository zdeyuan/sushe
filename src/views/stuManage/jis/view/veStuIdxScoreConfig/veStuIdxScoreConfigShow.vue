<template>
  <div class="edit_form">
        <!-- 编辑页 -->
        <edu-form
          title="指标加减分设置表详情"
          :isShowBtnSure="false"
          @cancel="handelCancel"
        >
          <a-form-model
            ref="veStuIdxScoreConfigDataForm"
            labelAlign="right"
          >
                             <a-form-model-item label="指标ID" >
                        {{veStuIdxScoreConfigVo.idxId}}
                </a-form-model-item>
                            <a-form-model-item label="指标名称" >
                        {{veStuIdxScoreConfigVo.name}}
                </a-form-model-item>
                            <a-form-model-item label="指标类型名称" >
                        {{veStuIdxScoreConfigVo.attrName}}
                </a-form-model-item>
                            <a-form-model-item label="指标类型" >
                        {{veStuIdxScoreConfigVo.attribute}}
                </a-form-model-item>
                            <a-form-model-item label="指标加分" >
                        {{veStuIdxScoreConfigVo.addScore}}
                </a-form-model-item>
                            <a-form-model-item label="指标减分" >
                        {{veStuIdxScoreConfigVo.minusScore}}
                </a-form-model-item>
                            <a-form-model-item label="加分单位类型" >
                        {{veStuIdxScoreConfigVo.addType}}
                </a-form-model-item>
                            <a-form-model-item label="减分单位类型" >
                        {{veStuIdxScoreConfigVo.minType}}
                </a-form-model-item>
                            <a-form-model-item label="分值单位" >
                        {{veStuIdxScoreConfigVo.addUnit}}
                </a-form-model-item>
                            <a-form-model-item label="减分单位" >
                        {{veStuIdxScoreConfigVo.minUnit}}
                </a-form-model-item>
                            <a-form-model-item label="排序" >
                        {{veStuIdxScoreConfigVo.listSort}}
                </a-form-model-item>
                      </a-form-model>
        </edu-form>
  </div>
</template>

<script>
import veStuIdxScoreConfigApi from "@/views/stuManage/jis/api/veStuIdxScoreConfigApi";

export default {
  components: { },
  data() {
    const data = {
      veStuIdxScoreConfigVo: {},
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veStuIdxScoreConfigVo =Object.assign({}, row)
  //    veStuIdxScoreConfigApi.get(row.id).then((res) => {
    //      this.veStuIdxScoreConfigVo = res.result
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