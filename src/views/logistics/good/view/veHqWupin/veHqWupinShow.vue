<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="物品详情" :isShowBtnSure="false" @cancel="handelCancel">
      <a-form-model ref="veHqWupinDataForm" labelAlign="right">
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="物品编号" class="ytop" prop="code">
              {{ veHqWupinVo.code }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="物品名称" class="ytop" prop="name">
              {{ veHqWupinVo.name }}
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="物品分类" prop="wpflId">
              {{ veHqWupinVo.wpflName }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="品牌" prop="wppp">
              {{ veHqWupinVo.wppp }}
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-form-model-item label="物品图片">
          <uploadFiles ref="uploadFiles" edit fileType="image" isImg serviceType="veHqWupin">
            <a-table-column dataIndex="ext" title="图片">
              <template slot-scope="ext, row">
                <img :src="$http.baseServer + '/' + $http.service.hq + 'veHqFile/download?id=' + row.id" style="height:50px" />
              </template>
            </a-table-column>
          </uploadFiles>
        </a-form-model-item>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="物品单价" prop="wpdj">
              {{ veHqWupinVo.wpdj }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="购置时间" prop="gzTime">
              {{ veHqWupinVo.gzTime }}
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-form-model-item label="计划使用年限" prop="jhsynx"> {{ veHqWupinVo.jhsynx }}年 </a-form-model-item>
        <a-form-model-item label="物品状态" prop="status">
          <edu-dict-text code="status" :value="veHqWupinVo.status"></edu-dict-text>
        </a-form-model-item>
        <a-form-model-item label="是否租借" prop="sfzj">
          <edu-dict-text code="shifou" :value="veHqWupinVo.sfzj"></edu-dict-text>
        </a-form-model-item>
        <a-form-model-item label="物品描述" prop="remark">
          {{ veHqWupinVo.remark }}
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veHqWupinApi from '@/views/logistics/good/api/veHqWupinApi';
import uploadFiles from '@/components/kqManageComponent/uploadFiles';
export default {
  props: {
    bgwuList: {
      type: Array,
      default: []
    }
  },
  components: { uploadFiles },
  data() {
    const data = {
      veHqWupinVo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      this.veHqWupinVo = Object.assign({}, row);
      this.$nextTick(() => {
        this.$refs.uploadFiles.setValue(row.id);
        this.$refs.veHqWupinDataForm.clearValidate();
      });
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
