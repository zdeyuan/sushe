<template>
  <div class="edit_form">
        <!-- 编辑页 -->
        <edu-form
          title="设备资产分类 参照 JY/T 1001-2012 高等学校固定资产分类及编码详情"
          :isShowBtnSure="false"
          @cancel="handelCancel"
        >
          <a-form-model
            ref="veSbzcZcCategoryDataForm"
            labelAlign="right"
          >
                             <a-form-model-item label="分类代码" >
                        {{veSbzcZcCategoryVo.code}}
                </a-form-model-item>
                            <a-form-model-item label="分类名称" >
                        {{veSbzcZcCategoryVo.name}}
                </a-form-model-item>
                            <a-form-model-item label="排序" >
                        {{veSbzcZcCategoryVo.listSort}}
                </a-form-model-item>
                            <a-form-model-item label="父ID" >
                        {{veSbzcZcCategoryVo.pid}}
                </a-form-model-item>
                            <a-form-model-item label="路径" >
                        {{veSbzcZcCategoryVo.path}}
                </a-form-model-item>
                      </a-form-model>
        </edu-form>
  </div>
</template>

<script>
import veSbzcZcCategoryApi from "@/views/sbzc/fund/api/veSbzcZcCategoryApi";

export default {
  components: { },
  data() {
    const data = {
      veSbzcZcCategoryVo: {},
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veSbzcZcCategoryVo =Object.assign({}, row)
  //    veSbzcZcCategoryApi.get(row.id).then((res) => {
    //      this.veSbzcZcCategoryVo = res.result
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