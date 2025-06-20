<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="文体获奖项目详情" :isShowBtnSure="false" @cancel="handelCancel">
      <a-form-model ref="veStuLiteraryAwardItemDataForm" labelAlign="right">
        <a-form-model-item label="奖励名称">
          {{ veStuLiteraryAwardItemVo.name }}
        </a-form-model-item>
        <a-form-model-item label="奖项类型（0：个人，1：集体）">
          {{ veStuLiteraryAwardItemVo.type }}
        </a-form-model-item>
        <a-form-model-item label="状态（0：禁用，1：启用）">
          {{ veStuLiteraryAwardItemVo.status }}
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veStuLiteraryAwardItemApi from '../../api/veStuLiteraryAwardItemApi';

export default {
  components: {},
  data() {
    const data = {
      veStuLiteraryAwardItemVo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veStuLiteraryAwardItemVo = Object.assign({}, row);
      //    veStuLiteraryAwardItemApi.get(row.id).then((res) => {
      //      this.veStuLiteraryAwardItemVo = res.result
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
