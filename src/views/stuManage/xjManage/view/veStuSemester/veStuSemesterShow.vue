<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="学期注册详情" :isShowBtnSure="false" @cancel="handelCancel">
      <a-form-model ref="veStuSemesterDataForm" labelAlign="right">
        <a-form-model-item label="学期id">
          {{ veStuSemesterVo.semesterId }}
        </a-form-model-item>
        <a-form-model-item label="学生id">
          {{ veStuSemesterVo.stuId }}
        </a-form-model-item>
        <a-form-model-item label="注册状态;2未注册1已注册">
          {{ veStuSemesterVo.status }}
        </a-form-model-item>
        <a-form-model-item label="注册时间">
          {{ veStuSemesterVo.createTime }}
        </a-form-model-item>
        <a-form-model-item label="注册人">
          {{ veStuSemesterVo.createUseId }}
        </a-form-model-item>
        <a-form-model-item label="撤销时间">
          {{ veStuSemesterVo.cancleTime }}
        </a-form-model-item>
        <a-form-model-item label="撤销人">
          {{ veStuSemesterVo.cancleUserId }}
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veStuSemesterApi from '@/views/stuManage/xjManage/api/veStuSemesterApi';

export default {
  components: {},
  data() {
    const data = {
      veStuSemesterVo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veStuSemesterVo = Object.assign({}, row);
      //    veStuSemesterApi.get(row.id).then((res) => {
      //      this.veStuSemesterVo = res.result
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
