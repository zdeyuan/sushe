<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-04-18 17:42:55
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-04-20 21:40:32
-->
<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="文化计划详情" :isShowBtnSure="false" @cancel="handelCancel">
      <a-form-model ref="veStuLiteraryProgramDataForm" labelAlign="right">
        <a-form-model-item label="计划标题">
          {{ veStuLiteraryProgramVo.title }}
        </a-form-model-item>
        <a-form-model-item label="内容">
          <div class="dhtml">
            <div v-html="veStuLiteraryProgramVo.content"></div>
          </div>
        </a-form-model-item>
        <a-form-model-item label="是否发布">
          <edu-dict-text code="statusFb" :value="veStuLiteraryProgramVo.status"></edu-dict-text>
        </a-form-model-item>
        <a-form-model-item label="发布时间">
          {{ veStuLiteraryProgramVo.status == 1 ? veStuLiteraryProgramVo.pushTime : '---' }}
        </a-form-model-item>
        <a-form-model-item label="发布人">
          {{ veStuLiteraryProgramVo.status == 1 ? veStuLiteraryProgramVo.pushUserName : '---' }}
        </a-form-model-item>
        <a-form-model-item label="是否所有人员">
          <edu-dict-text code="shifou" :value="veStuLiteraryProgramVo.isAll"></edu-dict-text>
        </a-form-model-item>
        <a-form-model-item label="接收教师" v-if="veStuLiteraryProgramVo.isAll == 0">
          {{ veStuLiteraryProgramVo.userNames }}
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veStuLiteraryProgramApi from '../../../api/veStuLiteraryProgramApi';

export default {
  components: {},
  data() {
    const data = {
      veStuLiteraryProgramVo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veStuLiteraryProgramVo = Object.assign({}, row);
      //    veStuLiteraryProgramApi.get(row.id).then((res) => {
      //      this.veStuLiteraryProgramVo = res.result
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
