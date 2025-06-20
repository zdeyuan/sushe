<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-16 23:14:07
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-02-16 23:40:40
-->
<template>
  <div class="edit_form">
    <edu-form title="经费审批说明详情" width="50%" @cancel="handelCancel" :isShowBtnSure="false">
      <div class="title">{{ veJkyFundCheckIntroduceVo.title }}</div>
      <div class="createTime">发布时间:{{ veJkyFundCheckIntroduceVo.createTime }}</div>
      <div class="content" v-html="veJkyFundCheckIntroduceVo.textId"></div>

      <div> <uploadFiles ref="uploadFiles" edit serviceType="fundCheckIntroduce"/></div>
    </edu-form>
  </div>
</template>

<script>
import veJkyFundCheckIntroduceApi from '@/api/research/rfunds/veJkyFundCheckIntroduceApi';
import uploadFiles from '@/components/kqManageComponent/uploadFiles';
export default {
  components: { uploadFiles },
  data() {
    const data = {
      veJkyFundCheckIntroduceVo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      veJkyFundCheckIntroduceApi.get(row.id).then(res => {
        this.veJkyFundCheckIntroduceVo = res.result;
        this.$refs.uploadFiles.setValue(res.result.id);
      });
      this.viewType = 'update';
      this.$nextTick(() => {
        this.$refs.veJkyFundCheckIntroduceDataForm.clearValidate();
      });
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
.title {
  text-align: center;
  font-size: 18px;
  color: #000;
  padding: 15px;
}
.createTime {
  text-align: center;
  font-size: 12px;
  color: #aaa;
  padding: 15px;
}
.content {
  font-size: 14px;
  padding: 15px;
}
</style>
