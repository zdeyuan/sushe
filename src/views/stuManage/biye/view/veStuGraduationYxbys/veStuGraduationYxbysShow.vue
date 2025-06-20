<template>
  <div class="edit_form">
        <!-- 编辑页 -->
        <edu-form
          title="优秀毕业生信息详情"
          :isShowBtnSure="false"
          @cancel="handelCancel"
        >
          <a-form-model
            ref="veStuGraduationYxbysDataForm"
            labelAlign="right"
          >
                             <a-form-model-item label="" >
                        {{veStuGraduationYxbysVo.graduatId}}
                </a-form-model-item>
                            <a-form-model-item label="备注" >
                        {{veStuGraduationYxbysVo.remark}}
                </a-form-model-item>
                      </a-form-model>
        </edu-form>
  </div>
</template>

<script>
import veStuGraduationYxbysApi from "@/views/stuManage/biye/api/veStuGraduationYxbysApi";

export default {
  components: { },
  data() {
    const data = {
      veStuGraduationYxbysVo: {},
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veStuGraduationYxbysVo =Object.assign({}, row)
  //    veStuGraduationYxbysApi.get(row.id).then((res) => {
    //      this.veStuGraduationYxbysVo = res.result
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