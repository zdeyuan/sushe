<template>
  <div class="edit_form">
        <!-- 编辑页 -->
        <edu-form
          title="社团活动详情"
          :isShowBtnSure="false"
          @cancel="handelCancel"
        >
          <a-form-model
            ref="veStuAssocActivityDataForm"
            labelAlign="right"
          >
                             <a-form-model-item label="社团id" >
                        {{veStuAssocActivityVo.assocId}}
                </a-form-model-item>
                            <a-form-model-item label="活动类型id" >
                        {{veStuAssocActivityVo.typeId}}
                </a-form-model-item>
                            <a-form-model-item label="活动主题" >
                        {{veStuAssocActivityVo.theme}}
                </a-form-model-item>
                            <a-form-model-item label="活动开始时间" >
                        {{veStuAssocActivityVo.startTime}}
                </a-form-model-item>
                            <a-form-model-item label="活动结束时间" >
                        {{veStuAssocActivityVo.endTime}}
                </a-form-model-item>
                            <a-form-model-item label="活动地点" >
                        {{veStuAssocActivityVo.place}}
                </a-form-model-item>
                            <a-form-model-item label="活动费用" >
                        {{veStuAssocActivityVo.price}}
                </a-form-model-item>
                            <a-form-model-item label="活动介绍" >
                        {{veStuAssocActivityVo.intro}}
                </a-form-model-item>
                            <a-form-model-item label="添加学生id" >
                        {{veStuAssocActivityVo.addStuId}}
                </a-form-model-item>
                            <a-form-model-item label="" >
                        {{veStuAssocActivityVo.addStuName}}
                </a-form-model-item>
                            <a-form-model-item label="添加时间" >
                        {{veStuAssocActivityVo.addTime}}
                </a-form-model-item>
                            <a-form-model-item label="活动查看次数" >
                        {{veStuAssocActivityVo.viewCount}}
                </a-form-model-item>
                      </a-form-model>
        </edu-form>
  </div>
</template>

<script>
import veStuAssocActivityApi from "@/views/stuManage/shet/api/veStuAssocActivityApi";

export default {
  components: { },
  data() {
    const data = {
      veStuAssocActivityVo: {},
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veStuAssocActivityVo =Object.assign({}, row)
  //    veStuAssocActivityApi.get(row.id).then((res) => {
    //      this.veStuAssocActivityVo = res.result
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