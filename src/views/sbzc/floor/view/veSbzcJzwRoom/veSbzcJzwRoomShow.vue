<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-03-20 10:42:30
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-03-20 12:31:35
-->
<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="房间信息详情" :isShowBtnSure="false" @cancel="handelCancel">
      <a-form-model ref="veSbzcJzwRoomDataForm" labelAlign="right">
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="楼宇编号" class="ytop" prop="jzwId">
              {{ veSbzcJzwRoomVo.jzwCode }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="楼宇名称" class="ytop" prop="jzwId">
              {{ veSbzcJzwRoomVo.jzwName }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="楼层编号" prop="floorId"> {{ veSbzcJzwRoomVo.floorCode }}楼 </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="房间编号" prop="code">
              {{ veSbzcJzwRoomVo.code }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="房间名称" prop="name">
              {{ veSbzcJzwRoomVo.name }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="房间类别" prop="roomCateId">
              {{ veSbzcJzwRoomVo.cateName }}
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="房间建筑面积" prop="fjjzmj"> {{ veSbzcJzwRoomVo.fjjzmj }}平方米 </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="房间使用面积" prop="fjsymj"> {{ veSbzcJzwRoomVo.fjsymj }}平方米 </a-form-model-item>
          </a-col>
        </a-row>

        <a-form-model-item label="备注" prop="remark">
          {{ veSbzcJzwRoomVo.remark }}
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veSbzcJzwRoomApi from '@/views/sbzc/floor/api/veSbzcJzwRoomApi';

export default {
  components: {},
  data() {
    const data = {
      veSbzcJzwRoomVo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veSbzcJzwRoomVo = Object.assign({}, row);
      //    veSbzcJzwRoomApi.get(row.id).then((res) => {
      //      this.veSbzcJzwRoomVo = res.result
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
