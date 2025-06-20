<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-16 23:14:07
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-02-18 23:16:16
-->
<template>
  <div class="edit_form">
    <edu-form title="资源引入" width="50%" @cancel="handelCancel" :isShowBtnSure="false">
      <div class="title">{{ veJkyResourceVo.title }}</div>
      <div class="createTime"
        ><span class="usererr">发布人:{{ veJkyResourceVo.createName }}</span> 发布时间:{{ veJkyResourceVo.createTime }}</div
      >
      <div class="content" v-html="veJkyResourceVo.textId"></div>

      <div> <uploadFiles ref="uploadFiles" edit serviceType="resource"/></div>
    </edu-form>
  </div>
</template>

<script>
import veJkyResourceApi from '@/api/research/rwork/veJkyResourceApi';
import uploadFiles from '@/components/kqManageComponent/uploadFiles';
export default {
  components: { uploadFiles },
  data() {
    const data = {
      veJkyResourceVo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      veJkyResourceApi.get(row.id).then(res => {
        this.veJkyResourceVo = res.result;
        this.$refs.uploadFiles.setValue(res.result.id);
      });
      this.viewType = 'update';
      this.$nextTick(() => {
        this.$refs.veJkyResourceDataForm.clearValidate();
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
