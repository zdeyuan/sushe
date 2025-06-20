<template>
  <div class="edit_form">
        <!-- 编辑页 -->
        <edu-form
          title="学生评价表详情"
          :isShowBtnSure="false"
          @cancel="handelCancel"
        >
          <a-form-model
            ref="veStuIntroductionDataForm"
            labelAlign="right"
          >
                             <a-form-model-item label="学生Id" >
                        {{veStuIntroductionVo.stuId}}
                </a-form-model-item>
                            <a-form-model-item label="自我介绍" >
                        {{veStuIntroductionVo.introduction}}
                </a-form-model-item>
                      </a-form-model>
        </edu-form>
  </div>
</template>

<script>
import veStuIntroductionApi from "@/views/stuManage/jis/api/veStuIntroductionApi";

export default {
  components: { },
  data() {
    const data = {
      veStuIntroductionVo: {},
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veStuIntroductionVo =Object.assign({}, row)
  //    veStuIntroductionApi.get(row.id).then((res) => {
    //      this.veStuIntroductionVo = res.result
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