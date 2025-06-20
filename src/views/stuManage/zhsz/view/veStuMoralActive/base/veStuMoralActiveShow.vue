<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="德育活动详情" :isShowBtnSure="false" @cancel="handelCancel">
      <a-form-model ref="veStuMoralActiveDataForm" labelAlign="right">
        <a-form-model-item label="活动类型">
          {{ veStuMoralActiveVo.type == 1 ? '校级' : '班级' }}
        </a-form-model-item>
        <a-form-model-item label="活动标题">
          {{ veStuMoralActiveVo.title }}
        </a-form-model-item>
        <a-form-model-item label="内容">
          <div class="dhtml">
            <div v-html="veStuMoralActiveVo.content"></div>
          </div>
        </a-form-model-item>
        <a-form-model-item label="发布状态">
          <edu-dict-text code="statusFb" :value="veStuMoralActiveVo.status"></edu-dict-text>
        </a-form-model-item>
        <a-form-model-item label="发布时间">
          {{ veStuMoralActiveVo.pushTime }}
        </a-form-model-item>
        <a-form-model-item label="开始时间">
          {{ veStuMoralActiveVo.startTime }}
        </a-form-model-item>
        <a-form-model-item label="结束时间">
          {{ veStuMoralActiveVo.endTime }}
        </a-form-model-item>
        <a-form-model-item label="发布人">
          {{ veStuMoralActiveVo.pushUserName }}
        </a-form-model-item>
        <a-form-model-item :label="`${veStuMoralActiveVo.type == 1 ? '全校' : '全班'}`">
          <edu-dict-text code="shifou" :value="veStuMoralActiveVo.isAll"></edu-dict-text>
        </a-form-model-item>
        <a-form-model-item label="参与人" v-if="veStuMoralActiveVo.userNames">
          {{ veStuMoralActiveVo.userNames }}
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veStuMoralActiveApi from '../../../api/veStuMoralActiveApi';

export default {
  components: {},
  data() {
    const data = {
      veStuMoralActiveVo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veStuMoralActiveVo = Object.assign({}, row);
      //    veStuMoralActiveApi.get(row.id).then((res) => {
      //      this.veStuMoralActiveVo = res.result
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
