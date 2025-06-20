<template>
  <div class="edit_form">
        <!-- 编辑页 -->
        <edu-form
          title="体质健康记录详情"
          :isShowBtnSure="false"
          @cancel="handelCancel"
        >
          <a-form-model
            ref="veStuHealthReportDataForm"
            labelAlign="right"
          >
                             <a-form-model-item label="学生Id" >
                        {{veStuHealthReportVo.stuId}}
                </a-form-model-item>
                            <a-form-model-item label="开始时间" >
                        {{veStuHealthReportVo.startTime}}
                </a-form-model-item>
                            <a-form-model-item label="结束时间" >
                        {{veStuHealthReportVo.endTime}}
                </a-form-model-item>
                            <a-form-model-item label="健康体质得分" >
                        {{veStuHealthReportVo.score}}
                </a-form-model-item>
                      </a-form-model>
        </edu-form>
  </div>
</template>

<script>
import veStuHealthReportApi from "../../api/veStuHealthReportApi";

export default {
  components: { },
  data() {
    const data = {
      veStuHealthReportVo: {},
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veStuHealthReportVo =Object.assign({}, row)
  //    veStuHealthReportApi.get(row.id).then((res) => {
    //      this.veStuHealthReportVo = res.result
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