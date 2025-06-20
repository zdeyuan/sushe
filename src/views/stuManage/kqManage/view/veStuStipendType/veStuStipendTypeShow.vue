<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="助学金类型详情" :isShowBtnSure="false" @cancel="handelCancel">
      <a-form-model ref="veStuStipendTypeDataForm" labelAlign="right">
        <a-form-model-item label="名称">
          {{ veStuStipendTypeVo.title }}
        </a-form-model-item>
        <a-form-model-item label="代码，同一终端唯一">
          {{ veStuStipendTypeVo.code }}
        </a-form-model-item>
        <a-form-model-item label="状态;1启用2禁用">
          {{ veStuStipendTypeVo.status }}
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veStuStipendTypeApi from '../../api/veStuStipendTypeApi';

export default {
  components: {},
  data() {
    const data = {
      veStuStipendTypeVo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veStuStipendTypeVo = Object.assign({}, row);
      //    veStuStipendTypeApi.get(row.id).then((res) => {
      //      this.veStuStipendTypeVo = res.result
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
