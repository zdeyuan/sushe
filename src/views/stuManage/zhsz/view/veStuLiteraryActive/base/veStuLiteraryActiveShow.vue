<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="文化活动详情" :isShowBtnSure="false" @cancel="handelCancel">
      <a-form-model ref="veStuLiteraryActiveDataForm" labelAlign="right">
        <a-form-model-item label="活动类型">
          {{ veStuLiteraryActiveVo.type == 1 ? '校级' : '班级' }}
        </a-form-model-item>
        <a-form-model-item label="活动标题">
          {{ veStuLiteraryActiveVo.title }}
        </a-form-model-item>
        <a-form-model-item label="内容">
          <div class="dhtml">
            <div v-html="veStuLiteraryActiveVo.content"></div>
          </div>
        </a-form-model-item>
        <a-form-model-item label="主办单位" prop="company">
          {{ veStuLiteraryActiveVo.company }}
        </a-form-model-item>

        <a-form-model-item label="活动级别" prop="grade">
          <edu-dict-text code="whhdjb" :value="veStuLiteraryActiveVo.grade"></edu-dict-text>
        </a-form-model-item>

        <a-form-model-item label="发布状态">
          <edu-dict-text code="statusFb" :value="veStuLiteraryActiveVo.status"></edu-dict-text>
        </a-form-model-item>
        <a-form-model-item label="发布时间">
          {{ veStuLiteraryActiveVo.pushTime }}
        </a-form-model-item>
        <a-form-model-item label="开始时间">
          {{ veStuLiteraryActiveVo.startTime }}
        </a-form-model-item>
        <a-form-model-item label="结束时间">
          {{ veStuLiteraryActiveVo.endTime }}
        </a-form-model-item>
        <a-form-model-item label="发布人">
          {{ veStuLiteraryActiveVo.pushUserName }}
        </a-form-model-item>
        <a-form-model-item :label="'是否' + veStuLiteraryActiveVo.type == 1 ? '全校' : '全班'">
          <edu-dict-text code="shifou" :value="veStuLiteraryActiveVo.isAll"></edu-dict-text>
        </a-form-model-item>
        <a-form-model-item label="参与人" v-if="veStuLiteraryActiveVo.userNames">
          {{ veStuLiteraryActiveVo.userNames }}
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veStuLiteraryActiveApi from '../../../api/veStuLiteraryActiveApi';

export default {
  components: {},
  data() {
    const data = {
      veStuLiteraryActiveVo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veStuLiteraryActiveVo = Object.assign({}, row);
      //    veStuLiteraryActiveApi.get(row.id).then((res) => {
      //      this.veStuLiteraryActiveVo = res.result
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
