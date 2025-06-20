<template>
  <div class="edit_form">
        <!-- 编辑页 -->
        <edu-form
          title="详情"
          :isShowBtnSure="false"
          @cancel="handelCancel"
        >
          <a-form-model
            ref="veStuFileDataForm"
            labelAlign="right"
          >
                             <a-form-model-item label="扩展名" >
                        {{veStuFileVo.ext}}
                </a-form-model-item>
                            <a-form-model-item label="名称" >
                        {{veStuFileVo.name}}
                </a-form-model-item>
                            <a-form-model-item label="文件名" >
                        {{veStuFileVo.fileName}}
                </a-form-model-item>
                            <a-form-model-item label="路径" >
                        {{veStuFileVo.path}}
                </a-form-model-item>
                            <a-form-model-item label="保存路径 0  本地 1 阿里云" >
                        {{veStuFileVo.saveType}}
                </a-form-model-item>
                            <a-form-model-item label="业务ID" >
                        {{veStuFileVo.serviceId}}
                </a-form-model-item>
                            <a-form-model-item label="业务类型" >
                        {{veStuFileVo.serviceType}}
                </a-form-model-item>
                      </a-form-model>
        </edu-form>
  </div>
</template>

<script>
import veStuFileApi from "@/views/stuManage/xjManage/api/veStuFileApi";

export default {
  components: { },
  data() {
    const data = {
      veStuFileVo: {},
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veStuFileVo =Object.assign({}, row)
  //    veStuFileApi.get(row.id).then((res) => {
    //      this.veStuFileVo = res.result
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