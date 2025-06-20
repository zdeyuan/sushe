<template>
  <div class="edit_form">
        <!-- 编辑页 -->
        <edu-form
          title="毕业证结业证流水号表详情"
          :isShowBtnSure="false"
          @cancel="handelCancel"
        >
          <a-form-model
            ref="veStuGraduationXuhaoDataForm"
            labelAlign="right"
          >
                             <a-form-model-item label="byz =>毕业证编号，jyz=>结业证编号" >
                        {{veStuGraduationXuhaoVo.category}}
                </a-form-model-item>
                            <a-form-model-item label="结束学业年份" >
                        {{veStuGraduationXuhaoVo.year}}
                </a-form-model-item>
                            <a-form-model-item label="专业ID" >
                        {{veStuGraduationXuhaoVo.specId}}
                </a-form-model-item>
                            <a-form-model-item label="最大序号" >
                        {{veStuGraduationXuhaoVo.maxNumber}}
                </a-form-model-item>
                      </a-form-model>
        </edu-form>
  </div>
</template>

<script>
import veStuGraduationXuhaoApi from "@/views/stuManage/biye/api/veStuGraduationXuhaoApi";

export default {
  components: { },
  data() {
    const data = {
      veStuGraduationXuhaoVo: {},
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veStuGraduationXuhaoVo =Object.assign({}, row)
  //    veStuGraduationXuhaoApi.get(row.id).then((res) => {
    //      this.veStuGraduationXuhaoVo = res.result
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