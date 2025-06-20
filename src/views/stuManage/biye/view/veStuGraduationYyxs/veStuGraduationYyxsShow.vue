<template>
  <div class="edit_form">
        <!-- 编辑页 -->
        <edu-form
          title="优秀毕业生信息详情"
          :isShowBtnSure="false"
          @cancel="handelCancel"
        >
          <a-form-model
            ref="veStuGraduationYyxsDataForm"
            labelAlign="right"
          >
                             <a-form-model-item label="学生Id" >
                        {{veStuGraduationYyxsVo.stuId}}
                </a-form-model-item>
                            <a-form-model-item label="备注" >
                        {{veStuGraduationYyxsVo.remark}}
                </a-form-model-item>
                      </a-form-model>
        </edu-form>
  </div>
</template>

<script>
import veStuGraduationYyxsApi from "@/views/stuManage/biye/api/veStuGraduationYyxsApi";

export default {
  components: { },
  data() {
    const data = {
      veStuGraduationYyxsVo: {},
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veStuGraduationYyxsVo =Object.assign({}, row)
  //    veStuGraduationYyxsApi.get(row.id).then((res) => {
    //      this.veStuGraduationYyxsVo = res.result
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