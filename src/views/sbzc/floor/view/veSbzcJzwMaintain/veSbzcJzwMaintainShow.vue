<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="修理记录详情" :isShowBtnSure="false" @cancel="handelCancel">
      <a-form-model ref="veSbzcJzwMaintainDataForm" labelAlign="right">
        <a-form-model-item label="建筑物id">
          {{ veSbzcJzwMaintainVo.jzwId }}
        </a-form-model-item>
        <a-form-model-item label="楼层id">
          {{ veSbzcJzwMaintainVo.floorId }}
        </a-form-model-item>
        <a-form-model-item label="房间id">
          {{ veSbzcJzwMaintainVo.roomId }}
        </a-form-model-item>
        <a-form-model-item label="修缮开始日期">
          {{ veSbzcJzwMaintainVo.startDate }}
        </a-form-model-item>
        <a-form-model-item label="修缮结束日期">
          {{ veSbzcJzwMaintainVo.endDate }}
        </a-form-model-item>
        <a-form-model-item label="修缮内容">
          {{ veSbzcJzwMaintainVo.content }}
        </a-form-model-item>
        <a-form-model-item label="修缮经费 元">
          {{ veSbzcJzwMaintainVo.money }}
        </a-form-model-item>
        <a-form-model-item label="修缮单位">
          {{ veSbzcJzwMaintainVo.org }}
        </a-form-model-item>
        <a-form-model-item label="经费来源码JFLY">
          {{ veSbzcJzwMaintainVo.jfSource }}
        </a-form-model-item>
        <a-form-model-item label="经办人号">
          {{ veSbzcJzwMaintainVo.jbUser }}
        </a-form-model-item>
        <a-form-model-item label="经办人号">
          {{ veSbzcJzwMaintainVo.jbUserName }}
        </a-form-model-item>
        <a-form-model-item label="修缮说明">
          {{ veSbzcJzwMaintainVo.remark }}
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veSbzcJzwMaintainApi from '@/views/sbzc/floor/api/veSbzcJzwMaintainApi';

export default {
  components: {},
  data() {
    const data = {
      veSbzcJzwMaintainVo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veSbzcJzwMaintainVo = Object.assign({}, row);
      //    veSbzcJzwMaintainApi.get(row.id).then((res) => {
      //      this.veSbzcJzwMaintainVo = res.result
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
