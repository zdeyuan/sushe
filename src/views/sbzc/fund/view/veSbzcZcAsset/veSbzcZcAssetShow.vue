<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="设备资产详情" :isShowBtnSure="false" @cancel="handelCancel">
      <a-form-model ref="veSbzcZcAssetDataForm" labelAlign="right">
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="资产编号">
              {{ veSbzcZcAssetVo.code }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="资产名称">
              {{ veSbzcZcAssetVo.name }}
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="资产批次">
              {{ veSbzcZcAssetVo.zcpc }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="规格型号">
              {{ veSbzcZcAssetVo.model }}
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="状态">
              <edu-dict-text code="zcStatus" :value="veSbzcZcAssetVo.status"></edu-dict-text>
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="单位">
              {{ veSbzcZcAssetVo.unit }}
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="价格">
              {{ veSbzcZcAssetVo.price }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="数量">
              {{ veSbzcZcAssetVo.count }}
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="金额">
              {{ veSbzcZcAssetVo.totalPrice }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="所属部门">
              {{ veSbzcZcAssetVo.deptOwn }}
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="验收部门">
              {{ veSbzcZcAssetVo.deptCheck }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="使用部门">
              {{ veSbzcZcAssetVo.deptUse }}
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="使用人员">
              {{ veSbzcZcAssetVo.userName }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="购买日期">
              {{ veSbzcZcAssetVo.buyDate }}
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="发票编号">
              {{ veSbzcZcAssetVo.fpNo }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="凭证号码">
              {{ veSbzcZcAssetVo.pzNo }}
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="资产分类">
              {{ veSbzcZcAssetVo.cateId }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="存放地点">
              {{ veSbzcZcAssetVo.location }}
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-form-model-item label="备注">
          {{ veSbzcZcAssetVo.remark }}
        </a-form-model-item>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="使用方向">
              {{ veSbzcZcAssetVo.usedFor }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="供应商">
              {{ veSbzcZcAssetVo.vendor }}
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="责任人">
              {{ veSbzcZcAssetVo.responseUserName }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="启用日期">
              {{ veSbzcZcAssetVo.enableDate }}
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veSbzcZcAssetApi from '@/views/sbzc/fund/api/veSbzcZcAssetApi';

export default {
  components: {},
  data() {
    const data = {
      veSbzcZcAssetVo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veSbzcZcAssetVo = Object.assign({}, row);
      //    veSbzcZcAssetApi.get(row.id).then((res) => {
      //      this.veSbzcZcAssetVo = res.result
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
