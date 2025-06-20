<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-16 23:14:07
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-02-18 23:11:32
-->
<template>
  <div class="edit_form">
    <edu-form title="研究指导" width="50%" @cancel="handelCancel" :isShowBtnSure="false">
      <div class="title">{{ veJkyGuideVo.title }}</div>
      <div class="createTime"
        ><span class="usererr">发布人:{{ veJkyGuideVo.createName }}</span> 发布时间:{{ veJkyGuideVo.createTime }}</div
      >
      <div class="content" v-html="veJkyGuideVo.textId"></div>

      <div> <uploadFiles ref="uploadFiles" edit serviceType="guide"/></div>
    </edu-form>
  </div>
</template>

<script>
import veJkyGuideApi from '@/api/research/rwork/veJkyGuideApi';
import uploadFiles from '@/components/kqManageComponent/uploadFiles';
export default {
  components: { uploadFiles },
  data() {
    const data = {
      veJkyGuideVo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      veJkyGuideApi.get(row.id).then(res => {
        this.veJkyGuideVo = res.result;
        this.$refs.uploadFiles.setValue(res.result.id);
      });
      this.viewType = 'update';
      this.$nextTick(() => {
        this.$refs.veJkyGuideDataForm.clearValidate();
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
  padding: 8px;
}
.content {
  font-size: 14px;
  padding: 15px;
}
.usererr {
  display: inline-block;
  margin-right: 15px;
}
</style>
