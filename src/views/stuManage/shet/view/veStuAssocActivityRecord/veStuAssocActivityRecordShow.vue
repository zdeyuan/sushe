<template>
  <div class="edit_form">
        <!-- 编辑页 -->
        <edu-form
          title="社团活动记录详情"
          :isShowBtnSure="false"
          @cancel="handelCancel"
        >
          <a-form-model
            ref="veStuAssocActivityRecordDataForm"
            labelAlign="right"
          >
                             <a-form-model-item label="社团id" >
                        {{veStuAssocActivityRecordVo.assocId}}
                </a-form-model-item>
                            <a-form-model-item label="活动id" >
                        {{veStuAssocActivityRecordVo.activityId}}
                </a-form-model-item>
                            <a-form-model-item label="活动内容" >
                        {{veStuAssocActivityRecordVo.content}}
                </a-form-model-item>
                            <a-form-model-item label="活动内容文件(视频内容等)" >
                        {{veStuAssocActivityRecordVo.fileId}}
                </a-form-model-item>
                            <a-form-model-item label="审核状态 0=待审核 1=通过 2=不通过" >
                        {{veStuAssocActivityRecordVo.auditStatus}}
                </a-form-model-item>
                            <a-form-model-item label="审核时间" >
                        {{veStuAssocActivityRecordVo.auditTime}}
                </a-form-model-item>
                            <a-form-model-item label="添加时间" >
                        {{veStuAssocActivityRecordVo.addTime}}
                </a-form-model-item>
                            <a-form-model-item label="添加的学生的id" >
                        {{veStuAssocActivityRecordVo.addStuId}}
                </a-form-model-item>
                            <a-form-model-item label="添加的学生的id" >
                        {{veStuAssocActivityRecordVo.addStuName}}
                </a-form-model-item>
                      </a-form-model>
        </edu-form>
  </div>
</template>

<script>
import veStuAssocActivityRecordApi from "@/views/stuManage/shet/api/veStuAssocActivityRecordApi";

export default {
  components: { },
  data() {
    const data = {
      veStuAssocActivityRecordVo: {},
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veStuAssocActivityRecordVo =Object.assign({}, row)
  //    veStuAssocActivityRecordApi.get(row.id).then((res) => {
    //      this.veStuAssocActivityRecordVo = res.result
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