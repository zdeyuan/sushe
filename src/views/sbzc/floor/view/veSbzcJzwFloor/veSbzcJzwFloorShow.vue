<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-03-20 10:42:30
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-03-20 11:49:58
-->
<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="楼层详情" :isShowBtnSure="false" @cancel="handelCancel">
      <a-form-model ref="veSbzcJzwFloorDataForm" labelAlign="right">
        <a-row>
          <a-col :span="24">
            <a-form-model-item class="ytop" label="楼宇编号">
              {{ veSbzcJzwFloorVo.jzwCode }}
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item class="ytop" label="楼宇名称">
              {{ veSbzcJzwFloorVo.jzwName }}
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="楼层编号">
              {{ veSbzcJzwFloorVo.code }}
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="房间数量">
              {{ veSbzcJzwFloorVo.roomCount }}
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veSbzcJzwFloorApi from '@/views/sbzc/floor/api/veSbzcJzwFloorApi';

export default {
  components: {},
  data() {
    const data = {
      veSbzcJzwFloorVo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veSbzcJzwFloorVo = Object.assign({}, row);
      //    veSbzcJzwFloorApi.get(row.id).then((res) => {
      //      this.veSbzcJzwFloorVo = res.result
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
