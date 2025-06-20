<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form size="big" :isShowBtnSure="false" class="mini-form-item inline-form" title="项目预算详情" width="70%" top="55px" @cancel="handelCancel">
      <a-form-model ref="veJkyFundDataForm" :rules="veJkyFundRules" :model="veJkyFundVo" labelAlign="right">
        <div class="detail_title">
          项目基本信息
        </div>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="项目" prop="projectId">
              {{ veJkyFundVo.projectName }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="项目编号" prop="projectId">
              {{ veJkyFundVo.projectSerial }}
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="12">
            <a-form-model-item label="预算金额" prop="totalCost">
              {{ veJkyFundVo.totalCost }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="审批人" prop="checkUid">
              {{ veJkyFundVo.adminName }}
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="12">
            <a-form-model-item label="申请时间" prop="applyTime">
              {{ veJkyFundVo.applyTime }}
            </a-form-model-item>
          </a-col>

          <a-col :span="12">
            <a-form-model-item label="审核状态" prop="applyTime">
              <edu-dict-text code="fundAudit" :value="veJkyFundVo.status"></edu-dict-text>
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-form-model-item label="说明" prop="mark">
          {{ veJkyFundVo.mark }}
        </a-form-model-item>
      </a-form-model>
      <div class="detail_title">
        项目预算明细
      </div>
      <div class="detail-div">
        <table class="detail-table" style="margin-left:10%">
          <tr>
            <th>经费类型</th>
            <th>费用摘要</th>
            <th>费用金额</th>
          </tr>
          <tbody>
            <tr v-for="(item, index) in detailList" :key="index">
              <td width="200px" valign="top">
                {{ getTypeName(item.typeId) }}
              </td>
              <td valign="top">
                {{ item.content }}
              </td>
              <td valign="top" width="200"> {{ item.baseCost }}元 </td>
            </tr>
          </tbody>
        </table>
      </div>
    </edu-form>
  </div>
</template>

<script>
import veJkyFundApi from '@/api/research/rfunds/veJkyFundApi';
import veJkyFundTypeApi from '@/api/research/rfunds/veJkyFundTypeApi';

import jkyProjectSelect from '@/components/kqManageComponent/jkyProjectSelect';
import jkyAdminSelect from '@/components/kqManageComponent/jkyAdminSelect';

export default {
  components: { jkyProjectSelect, jkyAdminSelect },
  data() {
    const data = {
      veJkyFundVo: {},
      dialogStatus: 'create',
      veJkyFundRules: {},
      typeNodes: [],
      detailList: []
    };
    return data;
  },
  mounted() {
    this.initData();
  },
  methods: {
    getTypeName(value) {
      const type = this.$utils.getInArr(this.typeNodes, 'id', value);
      if (!type) return '-';
      return type.name;
    },
    doAdd() {
      this.detailList.push({});
    },
    initData() {
      const sub = {
        conditions: [{ operator: 'eq', column: 'status', value: 1 }]
      };
      veJkyFundTypeApi.all(sub).then(res => {
        this.typeNodes = res.result;
      });
    },
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      veJkyFundApi.get(row.id).then(res => {
        const data = res.result;
        this.veJkyFundVo = data;
        data.details.forEach(element => {
          element.typeId = parseInt(element.typeId);
        });
        this.detailList = data.details;
      });
      this.viewType = 'update';
      this.$nextTick(() => {
        this.$refs.veJkyFundDataForm.clearValidate();
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
<style lang="less" scoped>

</style>
