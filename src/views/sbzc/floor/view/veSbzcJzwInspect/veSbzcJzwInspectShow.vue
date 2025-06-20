<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-03-20 12:44:10
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-03-20 21:57:37
-->
<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="检查记录详情" :isShowBtnSure="false" @cancel="handelCancel">
      <a-form-model ref="veSbzcJzwInspectDataForm" labelAlign="right">
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="建筑物" class="ytop" prop="jzwId">
              {{ veSbzcJzwInspectVo.jzwName }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="楼层编号" class="ytop" prop="floorId">
              {{ veSbzcJzwInspectVo.floorCode }}
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="房间号" prop="roomId">
              {{ veSbzcJzwInspectVo.roomCode }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="检查类型" prop="inspectTypeId">
              {{ veSbzcJzwInspectVo.cateName }}
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="检查时间" prop="inspectDate">
              {{ veSbzcJzwInspectVo.inspectDate }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="检查人" prop="inspectUser">
              {{ veSbzcJzwInspectVo.inspectUserName }}
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-form-model-item label="检查情况描述" prop="description">
          {{ veSbzcJzwInspectVo.description }}
        </a-form-model-item>
        <a-form-model-item label="备注" prop="remark">
          {{ veSbzcJzwInspectVo.remark }}
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veSbzcJzwInspectApi from '@/views/sbzc/floor/api/veSbzcJzwInspectApi';

export default {
  components: {},
  data() {
    const data = {
      veSbzcJzwInspectVo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veSbzcJzwInspectVo = Object.assign({}, row);
      //    veSbzcJzwInspectApi.get(row.id).then((res) => {
      //      this.veSbzcJzwInspectVo = res.result
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
