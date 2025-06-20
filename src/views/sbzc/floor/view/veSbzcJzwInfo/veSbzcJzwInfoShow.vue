<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="楼宇基本信息详情" :isShowBtnSure="false" @cancel="handelCancel">
      <a-form-model ref="veSbzcJzwInfoDataForm" labelAlign="right">
        <a-form-model-item label="楼宇编号" prop="code">
          {{ veSbzcJzwInfoVo.code }}
        </a-form-model-item>
        <a-form-model-item label="楼宇名称" prop="name">
          {{ veSbzcJzwInfoVo.name }}
        </a-form-model-item>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="楼宇类别" prop="buildCateId">
              {{ veSbzcJzwInfoVo.cateName }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="校区号" prop="xqh">
              <xiaoQuList disabled v-model="veSbzcJzwInfoVo.xqh" width="300px"></xiaoQuList>
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-form-model-item label="楼宇地址" prop="address">
          {{ veSbzcJzwInfoVo.address }}
        </a-form-model-item>

        <a-row>
          <a-col :span="12">
            <a-form-model-item label="总共层数" prop="floorNum">
              {{ veSbzcJzwInfoVo.floorNum }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="可用层数" prop="usableFloor">
              {{ veSbzcJzwInfoVo.usableFloor }}
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="12">
            <a-form-model-item label="总建筑面积" prop="zjzmj"> {{ veSbzcJzwInfoVo.zjzmj }}平方米 </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="总使用面积" prop="zsymj"> {{ veSbzcJzwInfoVo.zsymj }}平方米 </a-form-model-item>
          </a-col>
        </a-row>

        <a-form-model-item label="占地面积" prop="jzwzdmj" required> {{ veSbzcJzwInfoVo.jzwzdmj }}平方米 </a-form-model-item>

        <a-form-model-item label="权属证号" prop="qsCode">
          {{ veSbzcJzwInfoVo.qsCode }}
        </a-form-model-item>

        <a-row>
          <a-col :span="12">
            <a-form-model-item label="建成年月" prop="jcDate">
              {{ veSbzcJzwInfoVo.jcDate }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="设计使用年限" prop="useYear"> {{ veSbzcJzwInfoVo.useYear }}年 </a-form-model-item>
          </a-col>
        </a-row>

        <a-form-model-item label="备注" prop="remark">
          {{ veSbzcJzwInfoVo.remark }}
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veSbzcJzwInfoApi from '@/views/sbzc/floor/api/veSbzcJzwInfoApi';
import xiaoQuList from '@/components/xiaoQuList';
export default {
  components: { xiaoQuList },
  data() {
    const data = {
      veSbzcJzwInfoVo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veSbzcJzwInfoVo = Object.assign({}, row);
      //    veSbzcJzwInfoApi.get(row.id).then((res) => {
      //      this.veSbzcJzwInfoVo = res.result
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
