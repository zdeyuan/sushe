<template>
  <div class="edit_form">
        <!-- 编辑页 -->
        <edu-form
          title="学生社团关联详情"
          :isShowBtnSure="false"
          @cancel="handelCancel"
        >
          <a-form-model
            ref="veStuAssocRelationDataForm"
            labelAlign="right"
          >
                             <a-form-model-item label="学号" >
                        {{veStuAssocRelationVo.code}}
                </a-form-model-item>
                            <a-form-model-item label="学生id" >
                        {{veStuAssocRelationVo.stuId}}
                </a-form-model-item>
                            <a-form-model-item label="type" >
                        {{veStuAssocRelationVo.type}}
                </a-form-model-item>
                            <a-form-model-item label="1：普通成员，2：组长，3：主席" >
                        {{veStuAssocRelationVo.role}}
                </a-form-model-item>
                      </a-form-model>
        </edu-form>
  </div>
</template>

<script>
import veStuAssocRelationApi from "@/views/stuManage/shet/api/veStuAssocRelationApi";

export default {
  components: { },
  data() {
    const data = {
      veStuAssocRelationVo: {},
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veStuAssocRelationVo =Object.assign({}, row)
  //    veStuAssocRelationApi.get(row.id).then((res) => {
    //      this.veStuAssocRelationVo = res.result
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