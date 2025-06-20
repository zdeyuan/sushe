<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-04-18 17:42:55
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-04-20 21:28:43
-->
<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="德育资源详情" :isShowBtnSure="false" @cancel="handelCancel">
      <a-form-model ref="veStuMoralResourceDataForm" labelAlign="right">
        <a-form-model-item label="德育资源标题">
          {{ veStuMoralResourceVo.title }}
        </a-form-model-item>
        <a-form-model-item label="德育资源内容">
          <div class="dhtml">
            <div v-html="veStuMoralResourceVo.content"></div>
          </div>
        </a-form-model-item>
        <a-form-model-item label="状态">
          <edu-dict-text code="statusFb" :value="veStuMoralResourceVo.status"></edu-dict-text>
        </a-form-model-item>
        <a-form-model-item label="发布时间">
          {{ veStuMoralResourceVo.pushTime }}
        </a-form-model-item>
        <a-form-model-item label="发布人">
          {{ veStuMoralResourceVo.pushUserName }}
        </a-form-model-item>
        <uploadFiles ref="uploadFiles" edit serviceType="veStuMoralResource" />
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veStuMoralResourceApi from '../../../api/veStuMoralResourceApi';
import uploadFiles from '@/components/uploadFiles';
export default {
  components: { uploadFiles },
  data() {
    const data = {
      veStuMoralResourceVo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veStuMoralResourceVo = Object.assign({}, row);
      this.$refs.uploadFiles.setValue(row.id);
      //    veStuMoralResourceApi.get(row.id).then((res) => {
      //      this.veStuMoralResourceVo = res.result
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
<style lang="less" scoped></style>
